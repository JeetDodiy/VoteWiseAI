import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Target, Zap, Clock, Calendar, User, Copy, CheckCircle } from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/auth');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const copyUID = () => {
    if (user?.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Voter';
  const stats = [
    { label: "Total XP", value: "2,450", icon: Zap, color: "text-saffron-500", bg: "bg-saffron-500/10" },
    { label: "Practice Votes", value: "3", icon: Award, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Time Spent", value: "2h 15m", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" }
  ];

  const badges = [
    { name: "First Timer", icon: "🌱", earned: true },
    { name: "EVM Master", icon: "🗳️", earned: true },
    { name: "Quiz Whiz", icon: "🧠", earned: false },
    { name: "Voter Ready", icon: "⭐", earned: false }
  ];

  const confidenceScore = 75; // 0 to 100

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-saffron-400 font-semibold text-sm uppercase tracking-widest mb-1">Welcome back 👋</p>
          <h1 className="text-4xl font-extrabold mb-2 text-gradient">Hello, {displayName}!</h1>
          <p className="text-slate-400 text-lg">Track your journey to becoming an empowered voter.</p>
        </div>

        {/* User Info Card */}
        {user && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 glass-panel p-4 rounded-2xl flex flex-col gap-2 min-w-[240px] border border-white/10"
          >
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-12 h-12 rounded-full border-2 border-saffron-500/40" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-saffron-500/20 flex items-center justify-center text-saffron-400 border-2 border-saffron-500/40">
                  <User size={22} />
                </div>
              )}
              <div>
                <p className="font-bold text-white text-sm">{displayName}</p>
                <p className="text-xs text-slate-400 truncate max-w-[160px]">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-navy-900/60 rounded-xl px-3 py-2 border border-white/5">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">User ID</p>
                <p className="text-xs text-slate-300 font-mono truncate max-w-[150px]">{user.uid}</p>
              </div>
              <button
                onClick={copyUID}
                className="text-slate-400 hover:text-saffron-400 transition-colors ml-2"
                title="Copy UID"
              >
                {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[160px]">
        
        {/* Civic Confidence Meter (Spans 2 columns, 2 rows) */}
        <motion.div 
          className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 glass-panel p-8 flex flex-col justify-between relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Target className="text-saffron-500" /> Civic Confidence
              </h2>
              <p className="text-slate-400 mt-2">Your readiness to cast a vote.</p>
            </div>
            <div className="text-5xl font-extrabold text-saffron-500">{confidenceScore}%</div>
          </div>
          
          <div className="relative z-10 mt-8">
            <div className="h-4 bg-navy-800 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-saffron-600 to-saffron-400"
                initial={{ width: 0 }}
                animate={{ width: `${confidenceScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold uppercase tracking-wider">
              <span>Novice</span>
              <span>Learning</span>
              <span>Ready to Vote</span>
            </div>
          </div>
        </motion.div>

        {/* Small Stat Cards */}
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            className="col-span-1 row-span-1 glass-panel p-6 flex items-center gap-4 hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}

        {/* Upcoming Dates (Spans 1 col, 2 rows) */}
        <motion.div 
          className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 glass-panel p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-blue-500" /> Upcoming Dates
          </h2>
          <div className="flex flex-col gap-4 flex-1">
            <div className="bg-navy-800/50 p-4 rounded-xl border-l-4 border-l-rose-500">
              <p className="text-xs text-rose-400 font-bold mb-1">MAY 15, 2026</p>
              <p className="font-medium">Voter Registration Deadline</p>
            </div>
            <div className="bg-navy-800/50 p-4 rounded-xl border-l-4 border-l-saffron-500">
              <p className="text-xs text-saffron-400 font-bold mb-1">JUN 01, 2026</p>
              <p className="font-medium">Phase 1 Voting Begins</p>
            </div>
            <button className="mt-auto text-sm text-blue-400 hover:text-blue-300 font-medium py-2 text-center w-full bg-blue-500/10 rounded-lg transition-colors">
              Sync to Calendar
            </button>
          </div>
        </motion.div>

        {/* Learning Progress (Spans 2 cols, 1 row) */}
        <motion.div 
          className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 glass-panel p-6 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold">Modules Completed</h2>
            <span className="text-emerald-400 font-bold">4/5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= 4 ? 'bg-emerald-500' : 'bg-navy-800 border border-white/5'}`}></div>
            ))}
          </div>
        </motion.div>

        {/* Badges (Spans 2 cols, 1 row) */}
        <motion.div 
          className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 glass-panel p-6 flex items-center justify-between overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-4">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[90px] transition-transform hover:-translate-y-1 ${
                  badge.earned 
                    ? 'bg-saffron-500/10 border border-saffron-500/30' 
                    : 'bg-white/5 opacity-50 grayscale'
                }`}
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-xs font-bold text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
