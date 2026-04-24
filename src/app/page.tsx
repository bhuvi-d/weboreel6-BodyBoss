"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import Results from '@/components/Results';
import AudioPlayer from '@/components/AudioPlayer';
import SmoothScroll from '@/components/SmoothScroll';
import { UserData } from '@/lib/recommendations';

type Phase = 'hero' | 'journey' | 'results';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('hero');
  const [userData, setUserData] = useState<UserData | null>(null);

  const startJourney = () => setPhase('journey');
  
  const completeJourney = (data: UserData) => {
    setUserData(data);
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replay = () => {
    setPhase('hero');
    setUserData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-bg-deep text-text-main selection:bg-brand-primary/30">
        <AudioPlayer />
        
        <AnimatePresence mode="wait">
          {phase === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <Hero onStart={startJourney} />
            </motion.div>
          )}
          
          {phase === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              <Journey onComplete={completeJourney} />
            </motion.div>
          )}
          
          {phase === 'results' && userData && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Results data={userData} onReplay={replay} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global SEO / Accessibility H1 (Hidden if not in hero) */}
        {phase !== 'hero' && (
          <h1 className="sr-only">BodyBoss - Your Personal Transformation Journey</h1>
        )}
      </main>
    </SmoothScroll>
  );
}
