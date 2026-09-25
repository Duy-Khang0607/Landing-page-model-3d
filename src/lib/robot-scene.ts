import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const SHOWCASE_SEQUENCE = [
  { type: 'static' as const, duration: 2.2 },
  { type: 'clip' as const, name: 'Free_Fall' },
  { type: 'clip' as const, name: 'Look_Wave' },
  { type: 'clip' as const, name: 'Sitting' },
];

const CLIP_MAP: Record<string, string | null> = {
  idle: 'Sitting',
  sitting: 'Sitting',
  wave: 'Look_Wave',
  fall: 'Free_Fall',
  static: null,
};

const MODEL_PATH = '/assets/models/robot.glb';

type PlayClipOptions = {
  loop?: boolean;
  fade?: number;
  immediate?: boolean;
  timeScale?: number;
};

type RobotSceneOptions = {
  onLoad?: () => void;
  onError?: () => void;
};

export const createRobotScene = (canvas: HTMLCanvasElement, options: RobotSceneOptions = {}) => {
  const { onLoad, onError } = options;
  const state = {
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    controls: null as OrbitControls | null,
    robotGroup: null as THREE.Group | null,
    lookPivot: null as THREE.Group | null,
    model: null as THREE.Group | null,
    mixer: null as THREE.AnimationMixer | null,
    actions: {} as Record<string, THREE.AnimationAction>,
    currentAction: null as THREE.AnimationAction | null,
    clock: new THREE.Clock(),
    isRunning: false,
    rafId: null as number | null,
    isLoaded: false,
    isVisible: true,
    baseCameraZ: 0,
    defaultCameraY: 0,
    parallaxEnabled: false,
    pointer: { x: 0, y: 0 },
    lookCurrent: { x: 0, y: 0 },
    showcaseActive: false,
    showcaseIndex: 0,
    showcaseTimer: null as ReturnType<typeof setTimeout> | null,
  };

  const getCanvasSize = () => {
    const parent = canvas.parentElement;
    const w = parent?.clientWidth || 420;
    const h = parent?.clientHeight || Math.round(w * 4 / 3);
    return { width: w, height: h };
  };

  const clearShowcaseTimer = () => {
    if (state.showcaseTimer) {
      clearTimeout(state.showcaseTimer);
      state.showcaseTimer = null;
    }
  };

  const setStaticPose = () => {
    if (state.currentAction) {
      state.currentAction.fadeOut(0.25);
      state.currentAction = null;
    }
    state.mixer?.stopAllAction();
    state.model?.traverse((node) => {
      if ((node as THREE.SkinnedMesh).isSkinnedMesh) {
        (node as THREE.SkinnedMesh).skeleton.pose();
      }
    });
  };

  const playClipDirect = (
    clipName: string,
    { loop = false, fade = 0.35, immediate = false, timeScale = 1 }: PlayClipOptions = {},
  ) => {
    const next = state.actions[clipName];
    if (!next) return false;

    next.reset();
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
    next.clampWhenFinished = !loop;
    next.timeScale = timeScale;

    if (state.currentAction && !immediate) {
      next.crossFadeFrom(state.currentAction, fade, true).play();
    } else {
      next.play();
    }
    state.currentAction = next;
    return true;
  };

  const runShowcaseStep = (index = 0) => {
    if (!state.showcaseActive || !state.mixer) return;

    clearShowcaseTimer();
    state.showcaseIndex = index % SHOWCASE_SEQUENCE.length;
    const step = SHOWCASE_SEQUENCE[state.showcaseIndex];

    if (step.type === 'static') {
      setStaticPose();
      state.showcaseTimer = setTimeout(
        () => runShowcaseStep(state.showcaseIndex + 1),
        step.duration * 1000,
      );
      return;
    }

    playClipDirect(step.name, { loop: false });
  };

  const onClipFinished = (event: { action: THREE.AnimationAction }) => {
    if (!state.showcaseActive) return;
    const step = SHOWCASE_SEQUENCE[state.showcaseIndex];
    if (step?.type !== 'clip' || event.action.getClip().name !== step.name) return;
    runShowcaseStep(state.showcaseIndex + 1);
  };

  const startShowcase = () => {
    if (!state.mixer) return;
    state.showcaseActive = true;
    resetLookPivot();
    runShowcaseStep(0);
  };

  const stopShowcase = () => {
    state.showcaseActive = false;
    clearShowcaseTimer();
  };

  const resetLookPivot = () => {
    if (!state.lookPivot) return;
    state.lookCurrent.x = 0;
    state.lookCurrent.y = 0;
    state.pointer.x = 0;
    state.pointer.y = 0;
    state.lookPivot.rotation.set(0, 0, 0);
  };

  const init = () => {
    const { width, height } = getCanvasSize();

    state.scene = new THREE.Scene();
    state.robotGroup = new THREE.Group();
    state.lookPivot = new THREE.Group();
    state.robotGroup.add(state.lookPivot);
    state.scene.add(state.robotGroup);

    state.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    state.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    state.renderer.setSize(width, height, false);
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    state.renderer.outputColorSpace = THREE.SRGBColorSpace;

    state.scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 6, 5);
    state.scene.add(key);
    const fill = new THREE.DirectionalLight(0xc8daf8, 0.9);
    fill.position.set(-4, 2, -3);
    state.scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(0, 3, -5);
    state.scene.add(rim);

    state.controls = new OrbitControls(state.camera, canvas);
    state.controls.enableDamping = false;
    state.controls.enablePan = false;
    state.controls.enableZoom = true;
    state.controls.zoomSpeed = 0.85;
    state.controls.rotateSpeed = 0.9;
    state.controls.enabled = true;

    start();
    loadModel();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
  };

  const fitCameraToModel = () => {
    if (!state.model || !state.camera || !state.controls) return;
    const box = new THREE.Box3().setFromObject(state.model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    state.model.position.sub(center);
    state.model.position.y += size.y * 0.02;

    const fovRad = (state.camera.fov * Math.PI) / 180;
    const distY = (size.y / 2) / Math.tan(fovRad / 2);
    const distX = (size.x / 2) / (Math.tan(fovRad / 2) * state.camera.aspect);
    const distance = Math.max(distY, distX) * 1.22;

    state.baseCameraZ = distance;
    state.defaultCameraY = size.y * 0.06;
    state.camera.position.set(0, state.defaultCameraY, distance);
    state.camera.lookAt(0, 0, 0);

    state.controls.target.set(0, 0, 0);
    state.controls.minDistance = distance * 0.7;
    state.controls.maxDistance = distance * 2;
    state.controls.maxPolarAngle = Math.PI * 0.82;
    state.controls.minPolarAngle = Math.PI * 0.18;
    state.controls.update();
  };

  const setupModel = (gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }) => {
    state.model = gltf.scene;
    state.lookPivot!.add(state.model);
    fitCameraToModel();

    state.mixer = new THREE.AnimationMixer(state.model);
    state.mixer.addEventListener('finished', onClipFinished);
    gltf.animations.forEach((clip) => {
      state.actions[clip.name] = state.mixer!.clipAction(clip);
    });

    startShowcase();
    state.isLoaded = true;
    canvas.style.opacity = '1';
    onLoad?.();
    onResize();
  };

  const loadModel = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(MODEL_PATH, setupModel, undefined, () => onError?.());
  };

  const playClip = (name: string, opts: PlayClipOptions = {}) => {
    const { loop = true, fade = 0.4, immediate = false, timeScale } = opts;

    if (name === 'static') {
      stopShowcase();
      setStaticPose();
      return;
    }
    if (name === 'idle') {
      startShowcase();
      return;
    }

    const clipName = CLIP_MAP[name] || name;
    if (!clipName) return;

    stopShowcase();
    playClipDirect(clipName, { loop, fade, immediate, timeScale: timeScale ?? 1 });
  };

  const setParallax = (enabled: boolean) => {
    state.parallaxEnabled = enabled;
    if (!enabled) resetLookPivot();
  };

  const onPointerMove = (clientX: number, clientY: number, bounds: DOMRect) => {
    if (!state.parallaxEnabled || !bounds.width) return;
    state.pointer.x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
    state.pointer.y = ((clientY - bounds.top) / bounds.height) * 2 - 1;
  };

  const resetPointer = () => {
    state.pointer.x = 0;
    state.pointer.y = 0;
  };

  const enableControls = () => {
    if (state.controls) state.controls.enabled = true;
  };
  const disableControls = () => {
    if (state.controls) state.controls.enabled = false;
  };

  const resetView = () => {
    if (!state.controls || !state.camera) return;
    state.camera.position.set(0, state.defaultCameraY, state.baseCameraZ);
    state.controls.target.set(0, 0, 0);
    state.controls.update();
  };

  const updateParallax = () => {
    if (!state.parallaxEnabled || !state.lookPivot) return;
    const lerp = 0.1;
    const targetX = state.pointer.y * 0.18;
    const targetY = state.pointer.x * 0.28;
    state.lookCurrent.x += (targetX - state.lookCurrent.x) * lerp;
    state.lookCurrent.y += (targetY - state.lookCurrent.y) * lerp;
    state.lookPivot.rotation.x = state.lookCurrent.x;
    state.lookPivot.rotation.y = state.lookCurrent.y;
  };

  const animate = () => {
    state.rafId = requestAnimationFrame(animate);
    if (!state.isRunning || !state.isVisible || !state.renderer || !state.scene || !state.camera) return;

    const delta = Math.min(state.clock.getDelta(), 0.033);
    state.mixer?.update(delta);
    updateParallax();
    state.controls?.update();
    state.renderer.render(state.scene, state.camera);
  };

  const start = () => {
    if (state.isRunning) return;
    state.isRunning = true;
    animate();
  };

  const pause = () => {
    state.isRunning = false;
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  };

  const resume = () => {
    if (!state.isLoaded) return;
    state.isRunning = true;
    if (!state.rafId) animate();
  };

  const setVisible = (visible: boolean) => {
    state.isVisible = visible;
    if (visible) resume();
    else pause();
  };

  const onResize = () => {
    if (!state.camera || !state.renderer) return;
    const { width, height } = getCanvasSize();
    if (width === 0 || height === 0) return;
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(width, height, false);
  };

  const onVisibilityChange = () => {
    if (document.hidden) pause();
    else if (state.isVisible) resume();
  };

  init();

  return {
    playClip,
    startShowcase,
    stopShowcase,
    setParallax,
    onPointerMove,
    resetPointer,
    enableControls,
    disableControls,
    resetView,
    getRobotGroup: () => state.robotGroup,
    getCamera: () => state.camera,
    getBaseCameraZ: () => state.baseCameraZ,
    getDefaultCameraY: () => state.defaultCameraY,
    setVisible,
    onResize,
  };
};

export type RobotScene = ReturnType<typeof createRobotScene>;
