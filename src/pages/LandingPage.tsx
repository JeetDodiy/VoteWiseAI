import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Target, CheckCircle2, XCircle } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  
  // Am I Eligible Scanner State
  const [quizStep, setQuizStep] = useState(0);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const quizQuestions = [
    "Are you an Indian citizen?",
    "Are you 18 years of age or older?",
    "Do you have a valid proof of address (e.g., Aadhar, utility bill)?"
  ];

  const handleAnswer = (yes: boolean) => {
    if (!yes) {
      setIsEligible(false);
      return;
    }
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setIsEligible(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setIsEligible(null);
  };

  return (
    <div className="flex flex-col gap-20">
      
      {/* "Am I Eligible?" Scanner Hook */}
      <section className="w-full max-w-3xl mx-auto mt-4">
        <div className="glass-panel p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-saffron-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="text-saffron-500" /> 
              Am I Eligible to Vote?
            </h2>

            <AnimatePresence mode="wait">
              {isEligible === null ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col md:flex-row items-center justify-between gap-6 bg-navy-800/50 p-6 rounded-xl border border-white/5"
                >
                  <p className="text-lg font-medium">
                    <span className="text-saffron-400 mr-2">Q{quizStep + 1}:</span>
                    {quizQuestions[quizStep]}
                  </p>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => handleAnswer(true)}
                      className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors font-bold"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => handleAnswer(false)}
                      className="flex-1 md:flex-none px-6 py-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg hover:bg-rose-500 hover:text-white transition-colors font-bold"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              ) : isEligible ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl flex items-start gap-4"
                >
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-2">You are ready to vote!</h3>
                    <p className="text-slate-300 mb-4">You meet all the basic requirements. Your next step is to ensure you are registered on the electoral roll.</p>
                    <div className="flex gap-4">
                      <button onClick={() => navigate('/learn')} className="btn-primary py-2 px-4 text-sm">Start Learning</button>
                      <button onClick={resetQuiz} className="text-sm text-slate-400 hover:text-white transition-colors">Retake Quiz</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="fail"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-xl flex items-start gap-4"
                >
                  <XCircle className="text-rose-500 shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="text-xl font-bold text-rose-400 mb-2">Not quite eligible yet.</h3>
                    <p className="text-slate-300 mb-4">You must be an Indian citizen, 18+ years old, and have valid address proof to vote.</p>
                    <button onClick={resetQuiz} className="text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 px-4 py-2 rounded-lg">Retake Quiz</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div 
          className="flex flex-col items-start gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-saffron-500/10 border border-saffron-500/20 text-saffron-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
            <Sparkles size={16} />
            <span>The #1 App for First-Time Voters</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Your Vote,<br />
            Your Voice,<br />
            <span className="text-gradient">Your Future.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
            Demystifying democracy through simulation, gamification, and AI-powered personalized learning. Your confident vote starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="btn-primary text-lg px-8 py-4" onClick={() => navigate('/onboarding')}>
              Get Started <ArrowRight size={20} />
            </button>
            <button className="btn-secondary text-lg px-8 py-4" onClick={() => navigate('/simulate')}>
              Try Simulator
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Abstract Voting Visual */}
          <div className="w-full max-w-[400px] h-[500px] p-6 flex flex-col border border-white/10 bg-gradient-to-br from-white/10 to-transparent rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="flex-1 bg-navy-900/80 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 relative z-10 shadow-inner">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 shrink-0 flex items-center justify-center">
                   <ShieldCheck size={24} className="text-saffron-400" />
                 </div>
                 <div className="flex-1 flex flex-col gap-2">
                   <div className="h-3 bg-white/20 rounded-full w-full"></div>
                   <div className="h-3 bg-white/10 rounded-full w-2/3"></div>
                 </div>
               </div>
               
               <div className="flex flex-col gap-4 mt-4">
                 {[1, 2, 3].map((item) => (
                   <div key={item} className={`flex items-center gap-4 p-4 rounded-xl border ${item === 2 ? 'bg-saffron-500/10 border-saffron-500/30' : 'bg-white/5 border-white/5'}`}>
                     <div className={`w-6 h-6 rounded-full border-2 ${item === 2 ? 'border-saffron-500 bg-saffron-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-white/20'}`}></div>
                     <div className="h-3 bg-white/10 rounded-full w-full"></div>
                   </div>
                 ))}
               </div>
               
               <div className="mt-auto h-14 bg-blue-600 rounded-xl flex items-center justify-center font-bold tracking-widest text-white shadow-lg">
                 VOTE
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-saffron-500/10 flex items-center justify-center text-saffron-500 mb-6 group-hover:scale-110 transition-transform">
            <Target size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Gamified Learning</h3>
          <p className="text-slate-400 leading-relaxed">Earn XP, level up, and collect badges as you master the complex election process easily.</p>
        </div>
        <div className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Realistic Simulator</h3>
          <p className="text-slate-400 leading-relaxed">Practice voting on a mock interface so you know exactly what to do on Election Day.</p>
        </div>
        <div className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
            <Sparkles size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
          <p className="text-slate-400 leading-relaxed">Have doubts about the laws? Our AI chatbot is ready to answer questions in plain language.</p>
        </div>
      </section>
    </div>
  );
}
