import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, Vote, Sparkles, ShieldCheck } from 'lucide-react';

const steps = [
  {
    id: 0,
    emoji: '🗳️',
    icon: ShieldCheck,
    title: 'Welcome to VoteWise AI',
    desc: 'Your personal guide to becoming a confident, empowered voter. We make democracy simple, interactive, and fun.',
    highlight: 'For first-time voters',
    color: 'from-saffron-500/20 to-transparent',
    accent: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  {
    id: 1,
    emoji: '📚',
    icon: BookOpen,
    title: 'Learn the Process',
    desc: 'Understand how to register, what documents to carry, where your booth is, and how to research candidates — all in one place.',
    highlight: '4 step-by-step modules',
    color: 'from-blue-500/20 to-transparent',
    accent: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  {
    id: 2,
    emoji: '⚡',
    icon: Vote,
    title: 'Practice Voting',
    desc: 'Use our realistic EVM simulator so you feel completely confident when you walk into the polling booth on Election Day.',
    highlight: 'Real EVM experience',
    color: 'from-emerald-500/20 to-transparent',
    accent: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  {
    id: 3,
    emoji: '🤖',
    icon: Sparkles,
    title: 'Ask AI Anything',
    desc: 'Have a question about election law, voting rights, or candidates? Our AI assistant answers in plain, simple language — 24/7.',
    highlight: 'Powered by Gemini AI',
    color: 'from-purple-500/20 to-transparent',
    accent: 'text-purple-400',
    dot: 'bg-purple-400',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setStep(step + 1);
    } else {
      navigate('/learn');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
          <span>Getting Started</span>
          <span>{step + 1} / {steps.length}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-saffron-500 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="glass-panel p-8 md:p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
            {/* Background gradient glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${current.color} pointer-events-none`} />

            {/* Icon circle */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <span className="text-5xl">{current.emoji}</span>
            </div>

            {/* Badge */}
            <span className={`relative z-10 text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/10 ${current.accent}`}>
              {current.highlight}
            </span>

            {/* Text */}
            <div className="relative z-10 flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                {current.title}
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Step dots */}
            <div className="relative z-10 flex items-center gap-2 mt-2">
              {steps.map((_s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step ? `w-6 ${current.dot}` : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="relative z-10 w-full btn-primary py-4 text-lg justify-center"
            >
              {isLast ? '🚀 Start Learning' : 'Next'}
              <ChevronRight size={20} />
            </motion.button>

            {/* Skip */}
            {!isLast && (
              <button
                onClick={() => navigate('/learn')}
                className="relative z-10 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Skip intro →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
