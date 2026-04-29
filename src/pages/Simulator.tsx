import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

export default function Simulator() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  const candidates = [
    { id: 1, name: "Aarav Sharma", party: "Progressive Party", symbol: "🌟" },
    { id: 2, name: "Priya Patel", party: "Development Front", symbol: "⚙️" },
    { id: 3, name: "Rohan Singh", party: "Green Alliance", symbol: "🌱" },
    { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" },
  ];

  const handleVote = () => {
    if (selectedId !== null) {
      // Simulate Beep sound mentally
      setTimeout(() => setVoted(true), 500);
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">Voting Simulator</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Experience exactly what it feels like to cast your vote on an EVM. Tactile, realistic, and risk-free.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* EVM MACHINE */}
        <div className="lg:col-span-2">
          {voted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6"
              >
                <Check size={48} />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">Vote Cast Successfully!</h2>
              <p className="text-slate-300 mb-8 max-w-md">
                Your practice vote has been recorded. You will hear a long BEEP sound when this happens in real life.
              </p>
              
              {/* VVPAT Slip Mockup */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#f8fafc] text-navy-900 p-6 border-2 border-dashed border-slate-300 w-full max-w-xs mb-8 font-mono shadow-inner relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy-900 text-xs px-2 text-slate-400">VVPAT SLIP (7 Secs)</div>
                <div className="text-center font-bold text-lg mb-2 border-b border-slate-300 pb-2">
                  {candidates.find(c => c.id === selectedId)?.name}
                </div>
                <div className="text-center text-4xl mt-4">
                  {candidates.find(c => c.id === selectedId)?.symbol}
                </div>
              </motion.div>

              <button className="btn-secondary" onClick={() => {setVoted(false); setSelectedId(null)}}>
                Reset Simulator
              </button>
            </motion.div>
          ) : (
            <div className="bg-[#1e293b] border-[16px] border-[#0f172a] rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-[#0f172a] p-4 flex items-center gap-3 border-b border-slate-800">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_#10B981] animate-pulse"></div>
                <span className="text-emerald-500 font-bold tracking-widest">READY</span>
              </div>
              
              <div className="bg-slate-300 flex flex-col">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center p-4 border-b-2 border-slate-400 gap-4 text-navy-900">
                    <div className="font-bold text-xl w-8">{candidate.id}</div>
                    
                    <div className="flex-1 flex flex-col">
                      <span className="font-bold text-lg leading-none mb-1">{candidate.name}</span>
                      <span className="text-sm text-slate-600 font-medium">{candidate.party}</span>
                    </div>
                    
                    <div className="text-4xl w-16 text-center">{candidate.symbol}</div>
                    
                    <div className="flex items-center gap-4 bg-[#0f172a] p-3 rounded-xl ml-2">
                      <motion.button 
                        whileTap={{ scale: 0.9, y: 2, boxShadow: "0 0 0 #1d4ed8" }}
                        className={`w-10 h-8 rounded shadow-[0_4px_0_#1d4ed8] transition-colors ${
                          selectedId === candidate.id ? 'bg-blue-600' : 'bg-blue-500'
                        }`}
                        onClick={() => setSelectedId(candidate.id)}
                        aria-label={`Vote for ${candidate.name}`}
                      />
                      <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        selectedId === candidate.id 
                          ? 'bg-rose-500 shadow-[0_0_12px_#ef4444]' 
                          : 'bg-rose-900'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#0f172a] p-6 flex justify-center border-t border-slate-800">
                <motion.button 
                  whileTap={selectedId !== null ? { scale: 0.95 } : {}}
                  className={`py-4 px-12 text-xl font-black tracking-widest rounded-xl transition-all ${
                    selectedId !== null 
                      ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                  disabled={selectedId === null}
                  onClick={handleVote}
                >
                  CAST VOTE
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* INFO PANEL */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-saffron-500">
              <Info /> How to use EVM
            </h3>
            <ul className="space-y-6 text-slate-300">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 shrink-0 flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-bold text-white mb-1">Press the Blue Button</p>
                  <p className="text-sm">Find your candidate and press the blue button next to their symbol.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 shrink-0 flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-bold text-white mb-1">Check Red Light</p>
                  <p className="text-sm">The red light next to your chosen candidate will glow instantly.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-bold text-white mb-1">Verify VVPAT</p>
                  <p className="text-sm">Look at the VVPAT machine. A paper slip with your candidate's symbol will be visible for 7 seconds behind a glass window.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
