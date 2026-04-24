"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Target, Activity, Droplets, Moon, Utensils, Dumbbell, ArrowRight, Zap, Trophy, Heart } from 'lucide-react';
import { GoalType, ActivityLevel, UserData } from '@/lib/recommendations';

interface JourneyProps {
  onComplete: (data: UserData) => void;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
};

export default function Journey({ onComplete }: JourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [data, setData] = useState<UserData>({
    height: 170,
    weight: 70,
    targetWeight: 65,
    goal: 'lose-fat',
    activityLevel: 'moderate',
    sleepQuality: 'good',
    waterIntake: 'moderate',
    workoutExp: 'beginner',
    foodPreference: 'anything'
  });

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural')) && 
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      
      if (premiumVoice) utterance.voice = premiumVoice;
      
      utterance.pitch = 1.1; 
      utterance.rate = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (index !== activeStep) {
            setActiveStep(index);
            speak(steps[index].question);
          }
        }
      });
    }, { threshold: 0.6 });

    const sections = containerRef.current?.querySelectorAll('section');
    sections?.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, [activeStep]);

  const scrollToSection = (index: number) => {
    const sections = containerRef.current?.querySelectorAll('section');
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      id: 'height',
      title: "Physiology",
      question: "What's your current height?",
      component: (
        <div className="flex flex-col items-center gap-12 relative w-full max-w-2xl">
          <div className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 h-96 w-16 bg-white/5 rounded-2xl overflow-hidden border border-white/10 hidden md:block">
            <motion.div 
              animate={{ y: -(data.height - 100) * 2 }}
              className="absolute top-1/2 w-full flex flex-col items-center gap-4"
            >
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className={`w-8 h-1 ${i % 5 === 0 ? 'bg-brand-primary w-12' : 'bg-white/10'}`} />
              ))}
            </motion.div>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-primary shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10" />
          </div>

          <div className="flex items-end gap-4 relative z-10">
            <input 
              type="number" 
              value={data.height || ''}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setData({...data, height: parseInt(e.target.value) || 0})}
              className="text-8xl md:text-[12rem] font-black bg-transparent border-b-[12px] border-brand-primary/10 focus:border-brand-primary outline-none w-48 md:w-80 text-center transition-all tracking-tighter"
            />
            <span className="text-3xl font-black text-brand-primary mb-8 uppercase tracking-tighter">cm</span>
          </div>
        </div>
      )
    },
    {
      id: 'weight',
      title: "Current State",
      question: "Identify your current weight.",
      component: (
        <div className="flex flex-col items-center gap-12 relative w-full max-w-2xl">
          <div className="flex items-end gap-4">
            <input 
              type="number" 
              value={data.weight || ''}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setData({...data, weight: parseInt(e.target.value) || 0})}
              className="text-8xl md:text-[12rem] font-black bg-transparent border-b-[12px] border-brand-primary/10 focus:border-brand-primary outline-none w-48 md:w-80 text-center transition-all tracking-tighter"
            />
            <span className="text-3xl font-black text-brand-primary mb-8 uppercase tracking-tighter">kg</span>
          </div>
          <div className="flex gap-4">
            {[60, 70, 80, 90].map(w => (
              <button key={w} onClick={() => setData({...data, weight: w})} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-mono uppercase tracking-widest">{w}kg</button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'target',
      title: "Ambition",
      question: "Define your target weight.",
      component: (
        <div className="flex flex-col items-center gap-12 relative w-full max-w-2xl">
          <div className="flex items-end gap-4">
            <input 
              type="number" 
              value={data.targetWeight || ''}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setData({...data, targetWeight: parseInt(e.target.value) || 0})}
              className="text-8xl md:text-[12rem] font-black bg-transparent border-b-[12px] border-brand-accent/10 focus:border-brand-accent outline-none w-48 md:w-80 text-center transition-all tracking-tighter text-brand-accent"
            />
            <span className="text-3xl font-black text-brand-accent mb-8 uppercase tracking-tighter">kg</span>
          </div>
          <div className="text-brand-accent/60 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
            <Trophy className="w-4 h-4" /> Goal: <AnimatedNumber value={Math.abs(data.weight - data.targetWeight)} />kg {data.targetWeight < data.weight ? 'reduction' : 'gain'}
          </div>
        </div>
      )
    },
    {
      id: 'goal',
      title: "Core Path",
      question: "Select your primary objective.",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {[
            { id: 'lose-fat', label: 'Fat Loss', desc: 'Shed weight while maintaining tone', icon: <Zap className="w-6 h-6" /> },
            { id: 'build-muscle', label: 'Lean Bulk', desc: 'Add clean muscle and strength', icon: <Dumbbell className="w-6 h-6" /> },
            { id: 'improve-fitness', label: 'Longevity', desc: 'Enhance vitality and daily energy', icon: <Heart className="w-6 h-6" /> },
            { id: 'gain-weight', label: 'Mass Gain', desc: 'Maximum growth and power', icon: <Activity className="w-6 h-6" /> }
          ].map(g => (
            <button 
              key={g.id}
              onClick={() => setData({...data, goal: g.id as GoalType})}
              className={`p-8 rounded-[2rem] border-2 flex flex-col items-start gap-4 transition-all group ${data.goal === g.id ? 'bg-brand-primary border-brand-primary text-bg-deep glow-primary' : 'bg-white/5 border-white/10 text-white hover:border-white/30'}`}
            >
              <div className={`p-4 rounded-2xl ${data.goal === g.id ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                {g.icon}
              </div>
              <div className="text-left">
                <span className="text-2xl font-black block leading-none mb-1">{g.label}</span>
                <span className={`text-sm ${data.goal === g.id ? 'text-black/60' : 'text-text-muted'}`}>{g.desc}</span>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'lifestyle',
      title: "Optimization",
      question: "Final lifestyle calibration.",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="space-y-4">
            <label className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] flex items-center gap-2"><Activity className="w-3 h-3" /> Metabolic Activity</label>
            <select 
              value={data.activityLevel}
              onChange={(e) => setData({...data, activityLevel: e.target.value as ActivityLevel})}
              className="w-full bg-[#161616] text-white border-2 border-white/10 p-6 rounded-3xl outline-none focus:border-brand-primary transition-all text-xl font-bold appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="sedentary" className="bg-[#161616] text-white">Sedentary (Office)</option>
              <option value="light" className="bg-[#161616] text-white">Lightly Active</option>
              <option value="moderate" className="bg-[#161616] text-white">Moderate Training</option>
              <option value="active" className="bg-[#161616] text-white">High Intensity</option>
              <option value="very-active" className="bg-[#161616] text-white">Professional Athlete</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] flex items-center gap-2"><Moon className="w-3 h-3" /> Recovery Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {['Poor', 'Good', 'Elite'].map(s => (
                <button 
                  key={s}
                  onClick={() => setData({...data, sleepQuality: s.toLowerCase()})}
                  className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all ${data.sleepQuality === s.toLowerCase() ? 'bg-brand-primary border-brand-primary text-bg-deep' : 'bg-white/5 border-white/10 text-white hover:bg-white/20'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <label className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] flex items-center gap-2"><Utensils className="w-3 h-3" /> Fuel Preference</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'anything', label: 'Balanced', icon: '🍗' },
                { id: 'vegetarian', label: 'Plant-Based', icon: '🥗' },
                { id: 'vegan', label: 'Vegan', icon: '🌱' },
                { id: 'keto', label: 'Low Carb', icon: '🥑' }
              ].map(f => (
                <button 
                  key={f.id}
                  onClick={() => setData({...data, foodPreference: f.id})}
                  className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${data.foodPreference === f.id ? 'bg-brand-accent border-brand-accent text-bg-deep glow-primary' : 'bg-white/5 border-white/10 text-white hover:border-white/20'}`}
                >
                  <span className="text-4xl">{f.icon}</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-bg-deep">
      {/* Dynamic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {steps.map((step, index) => (
        <section 
          key={step.id}
          data-index={index}
          className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 snap-start overflow-hidden border-b border-white/5"
        >
          {/* Subtle Parallax Background Number */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter">
            {index + 1}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-brand-primary/30" />
              <span className="text-brand-primary font-mono text-xs uppercase tracking-[0.5em]">{step.title}</span>
              <span className="h-[1px] w-12 bg-brand-primary/30" />
            </div>
            
            <h2 className="text-5xl md:text-[7rem] font-black mb-16 text-center tracking-tighter leading-[0.9] max-w-5xl">
              {step.question}
            </h2>
            
            <div className="w-full flex justify-center mb-24">
              {step.component}
            </div>

            {index < steps.length - 1 ? (
              <motion.button
                whileHover={{ y: 5 }}
                onClick={() => scrollToSection(index + 1)}
                className="group flex flex-col items-center gap-4 text-text-muted hover:text-white transition-all duration-500"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-mono opacity-50 group-hover:opacity-100 transition-opacity">Proceed</span>
                <ChevronDown className="w-8 h-8 opacity-30 group-hover:opacity-100 animate-bounce" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onComplete(data)}
                className="btn-premium px-16 py-8 bg-brand-primary text-bg-deep font-black rounded-[2rem] text-3xl flex items-center gap-4 glow-primary"
              >
                GENERATE PROTOCOL <Zap className="w-8 h-8 fill-current" />
              </motion.button>
            )}
          </motion.div>
        </section>
      ))}

      {/* Floating Vertical Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50 hidden md:flex">
        {steps.map((_, i) => (
          <button 
            key={i} 
            onClick={() => scrollToSection(i)}
            className={`group relative flex items-center justify-center`}
          >
            <div className={`w-1 h-12 rounded-full transition-all duration-500 ${activeStep === i ? 'bg-brand-primary h-16' : 'bg-white/10 h-8 group-hover:bg-white/30'}`} />
            {activeStep === i && (
              <motion.span 
                layoutId="nav-label"
                className="absolute left-8 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-primary whitespace-nowrap"
              >
                0{i + 1}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
