"use client";

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-deep">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted">The Premium Wellness Standard</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter"
        >
          OWN YOUR <br />
          <span className="gradient-text">EVOLUTION</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-16 leading-relaxed font-light"
        >
          Experience a data-driven transformation journey designed for those who demand excellence. Precision nutrition. Elite movement. Unstoppable habits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <button 
            onClick={onStart}
            className="btn-premium px-12 py-6 bg-brand-primary text-bg-deep font-black rounded-2xl text-2xl uppercase tracking-tighter glow-primary group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Begin Journey <Zap className="w-6 h-6 group-hover:fill-current" />
            </span>
          </button>
          
          <div className="flex items-center gap-6 text-text-muted font-mono text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-primary" /> Privacy First</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-brand-accent" /> Science Based</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-text-muted">Initiate Sequence</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-brand-primary opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
