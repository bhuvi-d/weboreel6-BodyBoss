"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Flame, Droplets, Moon, Dumbbell, Utensils, RefreshCw, Share2, Zap, Trophy, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserData, generateRecommendations } from '@/lib/recommendations';

interface ResultsProps {
  data: UserData;
  onReplay: () => void;
}

export default function Results({ data, onReplay }: ResultsProps) {
  const recommendations = generateRecommendations(data);
  const [mood, setMood] = useState<string | null>(null);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Voice Selection Logic
      const voices = window.speechSynthesis.getVoices();
      // Look for more natural sounding voices
      const premiumVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural')) && 
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      
      if (premiumVoice) utterance.voice = premiumVoice;
      
      utterance.pitch = 1.05; // Slightly deeper than before for authority
      utterance.rate = 0.95;  // Slightly slower for weight and impact
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    // Speak the summary
    speak(`Your strategy is ready. ${recommendations.summary}`);

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#fbbf24']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const moodAdvice: Record<string, string> = {
    tired: "Active recovery. Aim for 20 mins of light stretching and early sleep.",
    motivated: "Elite performance day. Push for an extra set or 10% more intensity.",
    lazy: "Momentum builder. Commit to 10 minutes—action creates motivation.",
    stressed: "Cortisol control. 15 mins of breathwork + Zone 1 cardio (walking).",
    unstoppable: "Strategic flow. Channel this energy into your hardest compound lift."
  };

  return (
    <section className="min-h-screen w-full bg-bg-deep py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8 backdrop-blur-md">
            <Trophy className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-primary">Protocol Generated Successfully</span>
          </div>
          
          <h2 className="text-7xl md:text-[8rem] font-black mb-8 tracking-tighter leading-[0.85]">
            YOUR <span className="gradient-text">BODYBOSS</span> <br />STRATEGY
          </h2>
          
          <p className="text-text-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            {recommendations.summary}
          </p>
        </motion.div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Fitness Pillar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-[3rem] border-brand-primary/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Dumbbell className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl uppercase tracking-tighter">Elite Movement</h3>
            </div>
            <ul className="space-y-6">
              {recommendations.fitness.map((item, i) => (
                <li key={i} className="flex gap-4 text-text-muted text-sm leading-relaxed group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-brand-primary rounded-full shrink-0 group-hover/item:scale-150 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Nutrition Pillar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-10 rounded-[3rem] border-brand-accent/10 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Utensils className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-brand-accent/10 rounded-2xl text-brand-accent">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl uppercase tracking-tighter">Precision Fuel</h3>
            </div>
            <ul className="space-y-6">
              {recommendations.nutrition.map((item, i) => (
                <li key={i} className="flex gap-4 text-text-muted text-sm leading-relaxed group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0 group-hover/item:scale-150 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Habits Pillar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <ShieldCheck className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-white/5 rounded-2xl text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl uppercase tracking-tighter">Vital Habits</h3>
            </div>
            <ul className="space-y-6">
              {recommendations.habits.map((item, i) => (
                <li key={i} className="flex gap-4 text-text-muted text-sm leading-relaxed group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-white/30 rounded-full shrink-0 group-hover/item:scale-150 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mood & Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] flex flex-col justify-between group">
            <div>
              <h3 className="text-3xl font-black mb-10 flex items-center gap-3 tracking-tighter uppercase">
                <Activity className="text-brand-primary" /> Projected Path
              </h3>
              <div className="relative pt-12 pb-8">
                <div className="absolute -top-4 left-0 text-[10px] font-mono text-text-muted uppercase tracking-widest">Entry: {data.weight}kg</div>
                <div className="absolute -top-4 right-0 text-[10px] font-mono text-brand-primary uppercase tracking-widest">Goal: {data.targetWeight}kg</div>
                
                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-accent relative"
                  >
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-sm"
                    />
                  </motion.div>
                </div>
                <div className="mt-6 flex justify-between items-center text-xs font-mono text-text-muted uppercase tracking-widest">
                  <span>Week 0</span>
                  <span className="text-brand-primary font-black">Estimated: 12 Weeks</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-muted italic opacity-60 mt-12 group-hover:opacity-100 transition-opacity">
              &quot;Precision is the difference between movement and progress.&quot;
            </p>
          </div>

          <div className="glass-card p-12 rounded-[3.5rem]">
            <h3 className="text-3xl font-black mb-10 uppercase tracking-tighter">Current Readiness</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {Object.keys(moodAdvice).map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${mood === m ? 'bg-white text-bg-deep scale-105 shadow-2xl' : 'bg-white/5 hover:bg-white/10 text-text-muted'}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {mood ? (
                <motion.div
                  key={mood}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 bg-brand-primary/10 border border-brand-primary/20 rounded-3xl"
                >
                  <p className="text-base leading-relaxed text-brand-primary font-medium">
                    <span className="font-black uppercase text-[10px] block mb-2 tracking-[0.2em]">Coach Protocol</span>
                    {moodAdvice[mood]}
                  </p>
                </motion.div>
              ) : (
                <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl text-center">
                  <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Select your state to unlock guidance</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Motivational Break */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-24 border-y border-white/5 relative mb-24"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
          <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.6em] mb-8 block">Daily Protocol</span>
          <h4 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none">&quot;{recommendations.motivation.toUpperCase()}&quot;</h4>
        </motion.div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-24">
          <button 
            onClick={onReplay}
            className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-text-muted font-black uppercase tracking-tighter text-lg"
          >
            <RefreshCw className="w-5 h-5" /> Adjust Parameters
          </button>
          <button className="btn-premium flex items-center gap-3 px-12 py-6 rounded-2xl bg-brand-primary text-bg-deep font-black uppercase tracking-tighter text-xl glow-primary">
            <Share2 className="w-5 h-5" /> Share Protocol <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
