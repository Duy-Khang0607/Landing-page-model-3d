import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RobotScene } from './robot-scene';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = (
  robot: RobotScene,
  heroArch: HTMLElement,
  visibilityArch: HTMLElement,
) => {
  const hero = document.getElementById('hero');
  const features = document.getElementById('features');
  const about = document.getElementById('about');
  const stage = document.getElementById('robotStage');
  const hint = document.getElementById('robotHint');

  const robotGroup = robot.getRobotGroup();
  const camera = robot.getCamera();
  const baseZ = robot.getBaseCameraZ();
  const defaultCamY = robot.getDefaultCameraY();
  if (!robotGroup || !camera || !hero || !stage) return;

  let lastClip = '';
  let isHeroInteractive = true;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  const setClip = (name: string) => {
    if (lastClip === name) return;
    lastClip = name;
    if (name === 'idle') robot.startShowcase();
    else robot.playClip(name, { loop: true });
  };

  const resetTransforms = () => {
    robotGroup.position.set(0, 0, 0);
    robotGroup.rotation.set(0, 0, 0);
    camera.position.y = defaultCamY;
    camera.position.z = baseZ;
  };

  const setHeroMode = () => {
    stage.classList.remove('robot-stage--fixed');
    stage.style.width = '';
    stage.style.height = '';
    stage.style.transform = '';
    about?.classList.remove('is-robot-active');
    robot.onResize();
  };

  const snapStageTo = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    stage.classList.add('robot-stage--fixed');
    stage.style.width = `${rect.width}px`;
    stage.style.height = `${rect.height}px`;
    stage.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
    robot.onResize();
  };

  const enterHero = () => {
    gsap.killTweensOf(stage);
    setHeroMode();
    gsap.set(stage, { opacity: 1 });
    resetTransforms();
    robot.resetView();
    robot.resetPointer();
    robot.setParallax(true);
    robot.enableControls();
    lastClip = '';
    robot.startShowcase();
    isHeroInteractive = true;
    if (hint) hint.style.opacity = '1';
  };

  const leaveHero = () => {
    if (!isHeroInteractive) return;
    isHeroInteractive = false;
    robot.setParallax(false);
    robot.resetPointer();
    robot.stopShowcase();
    robot.disableControls();
    if (hint) hint.style.opacity = '0';
  };

  const updatePortal = (portalT: number) => {
    const heroRect = heroArch.getBoundingClientRect();
    const visRect = visibilityArch.getBoundingClientRect();

    stage.classList.add('robot-stage--fixed');
    const left = lerp(heroRect.left, visRect.left, portalT);
    const top = lerp(heroRect.top, visRect.top, portalT);
    const w = lerp(heroRect.width, visRect.width, portalT);
    const h = lerp(heroRect.height, visRect.height, portalT);

    stage.style.width = `${w}px`;
    stage.style.height = `${h}px`;
    stage.style.transform = `translate(${left}px, ${top}px)`;
    about?.classList.toggle('is-robot-active', portalT > 0.7);
    robot.onResize();
  };

  const applyScroll = (progress: number) => {
    if (progress < 0.1) {
      if (!isHeroInteractive) enterHero();
      return;
    }

    if (isHeroInteractive) leaveHero();

    const t = clamp01((progress - 0.1) / 0.9);
    const move = smoothstep(t);

    if (t < 0.18) setClip('wave');
    else if (t < 0.42) setClip('fall');
    else if (t < 0.68) setClip('wave');
    else setClip('sitting');

    robotGroup.position.y = lerp(0, -0.12, move);
    robotGroup.rotation.y = lerp(0, 0.45, move);
    camera.position.y = lerp(defaultCamY, defaultCamY + 0.12, move);
    camera.position.z = lerp(baseZ, baseZ + 0.65, move);

    const portalT = clamp01((t - 0.12) / 0.72);

    if (portalT > 0) {
      updatePortal(portalT);
      const midFade = Math.sin(portalT * Math.PI);
      stage.style.opacity = String(lerp(1, 0.3, midFade * 0.7));
      if (portalT > 0.92) {
        stage.style.opacity = '1';
        about?.classList.add('is-robot-active');
      }
    } else {
      const earlyFade = clamp01((t - 0.02) / 0.1);
      stage.style.opacity = String(lerp(1, 0.25, earlyFade));
    }
  };

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    endTrigger: about,
    end: 'center center',
    scrub: 0.45,
    onUpdate: (self) => applyScroll(self.progress),
    onEnterBack: enterHero,
  });

  ScrollTrigger.create({
    trigger: about,
    start: 'bottom 85%',
    onEnter: () => {
      gsap.to(stage, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    },
    onLeaveBack: () => {
      gsap.killTweensOf(stage);
      gsap.set(stage, { opacity: 1 });
      snapStageTo(visibilityArch);
      setClip('sitting');
      about?.classList.add('is-robot-active');
    },
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    if (!stage.classList.contains('robot-stage--fixed')) return;
    const st = ScrollTrigger.getAll().find(
      (t) => t.trigger === hero && (t as ScrollTrigger & { endTrigger?: Element }).endTrigger === about,
    );
    if (!st) {
      snapStageTo(visibilityArch);
      return;
    }
    const t = clamp01((st.progress - 0.1) / 0.9);
    const portalT = clamp01((t - 0.12) / 0.72);
    if (portalT > 0 && portalT < 0.92) updatePortal(portalT);
    else snapStageTo(visibilityArch);
  });

  gsap.from('.feature-card', {
    scrollTrigger: { trigger: features, start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
  });

  gsap.from('.service-card', {
    scrollTrigger: { trigger: document.getElementById('services'), start: 'top 80%' },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
};
