"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Headphones, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.muted = newMuteState;
      if (!newMuteState) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  };

  const handleInitialInteraction = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          setIsMuted(false);
        })
        .catch(e => {
          console.error("Initial playback failed:", e);
          setIsMuted(true);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        loop
        muted={isMuted}
      >
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
      </audio>
      
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-bg-deep/90 backdrop-blur-2xl flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card p-12 rounded-[3rem] max-w-md w-full text-center border-brand-primary/20"
          >
            <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping" />
              <Headphones className="w-10 h-10 text-brand-primary relative z-10" />
            </div>
            
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Immersive Mode</h3>
            <p className="text-text-muted text-sm mb-10 leading-relaxed font-mono uppercase tracking-widest opacity-60">
              Unlock the BodyBoss auditory protocol for a complete cinematic experience.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInitialInteraction}
              className="btn-premium w-full py-6 bg-brand-primary text-bg-deep rounded-2xl font-black flex items-center justify-center gap-4 text-xl uppercase tracking-tighter glow-primary"
            >
              <Play className="w-6 h-6 fill-current" />
              ENTER IMMERSION
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-[90] p-5 bg-bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group overflow-hidden shadow-2xl"
      >
        {!isMuted && (
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-brand-primary/20 rounded-full"
          />
        )}
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white/40 group-hover:text-white transition-colors relative z-10" />
        ) : (
          <Volume2 className="w-6 h-6 text-brand-primary group-hover:scale-110 transition-transform relative z-10" />
        )}
      </button>
    </>
  );
}
