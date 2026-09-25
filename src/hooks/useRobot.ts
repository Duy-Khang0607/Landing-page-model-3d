import { useEffect, useRef } from 'react';
import { createRobotScene, type RobotScene } from '../lib/robot-scene';
import { initScrollAnimations } from '../lib/scroll-animations';

const bootAfterPaint = (fn: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
};

export const useRobot = (
  heroRef: React.RefObject<HTMLElement | null>,
  heroArchRef: React.RefObject<HTMLElement | null>,
  visibilityArchRef: React.RefObject<HTMLElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const robotRef = useRef<RobotScene | null>(null);

  useEffect(() => {
    let booted = false;
    let visibilityObserver: IntersectionObserver | null = null;
    let bootObserver: IntersectionObserver | null = null;

    const bootRobot = () => {
      if (booted) return;
      booted = true;
      bootObserver?.disconnect();

      const canvas = canvasRef.current;
      const heroArch = heroArchRef.current;
      const visibilityArch = visibilityArchRef.current;
      const stage = stageRef.current;
      const hero = heroRef.current;
      if (!canvas || !heroArch || !visibilityArch || !stage) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      heroArch.classList.add('is-loading');
      stage.classList.add('is-loading');

      const robot = createRobotScene(canvas, {
        onLoad: () => {
          heroArch.classList.remove('is-loading');
          stage.classList.remove('is-loading');
          robot.enableControls();
          robot.setParallax(true);
          robot.startShowcase();
          robot.onResize();
        },
        onError: () => {
          heroArch.classList.remove('is-loading');
          stage.classList.remove('is-loading');
          heroArch.classList.add('is-error');
        },
      });

      robotRef.current = robot;

      visibilityObserver = new IntersectionObserver(([entry]) => {
        robot.setVisible(entry.isIntersecting);
      }, { threshold: 0.05, rootMargin: '80px' });
      visibilityObserver.observe(stage);

      const onMove = (e: MouseEvent) => {
        robot.onPointerMove(e.clientX, e.clientY, heroArch.getBoundingClientRect());
      };
      const onLeave = () => robot.resetPointer();

      hero?.addEventListener('mousemove', onMove, { passive: true });
      hero?.addEventListener('mouseleave', onLeave);

      const playBtn = document.getElementById('visibilityPlay');
      const onPlay = () => {
        robot.disableControls();
        robot.setParallax(false);
        robot.playClip('wave', { loop: false });
        setTimeout(() => robot.playClip('sitting'), 3200);
      };
      playBtn?.addEventListener('click', onPlay);

      if (!reducedMotion) {
        let scrollReady = false;
        const initScrollOnce = () => {
          if (scrollReady) return;
          scrollReady = true;
          initScrollAnimations(robot, heroArch, visibilityArch);
        };
        window.addEventListener('scroll', initScrollOnce, { passive: true, once: true });
        if (window.scrollY > 0) initScrollOnce();
      }

      return () => {
        hero?.removeEventListener('mousemove', onMove);
        hero?.removeEventListener('mouseleave', onLeave);
        playBtn?.removeEventListener('click', onPlay);
      };
    };

    const stage = stageRef.current;
    if (!stage) return;

    bootObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      bootAfterPaint(bootRobot);
    }, { rootMargin: '160px', threshold: 0 });

    bootObserver.observe(stage);

    return () => {
      bootObserver?.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [canvasRef, heroArchRef, heroRef, stageRef, visibilityArchRef]);
};
