import { useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { Features } from './components/Features';
import { Visibility } from './components/Visibility';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { useRobot } from './hooks/useRobot';

const App = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroArchRef = useRef<HTMLDivElement>(null);
  const visibilityArchRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useRobot(heroRef, heroArchRef, visibilityArchRef, stageRef, canvasRef);

  return (
    <>
      <Header />
      <main>
        <Hero
          heroRef={heroRef}
          heroArchRef={heroArchRef}
          stageRef={stageRef}
          canvasRef={canvasRef}
        />
        <Brands />
        <Features />
        <Visibility visibilityArchRef={visibilityArchRef} />
        <Services />
        <Team />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default App;
