import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MapPin, CheckSquare, Search, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function LearnModule() {
  const [openDoc, setOpenDoc] = useState(false);

  const timeline = [
    {
      id: 1,
      title: "Register to Vote",
      desc: "Apply online via the Voter Portal or physically using Form 6.",
      icon: BookOpen,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      lightBg: "bg-blue-500/10"
    },
    {
      id: 2,
      title: "Find Your Polling Booth",
      desc: "Check your name in the electoral roll and locate your designated station.",
      icon: MapPin,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      lightBg: "bg-emerald-500/10"
    },
    {
      id: 3,
      title: "Research Candidates",
      desc: "Learn about the candidates in your constituency and their manifestos.",
      icon: Search,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      lightBg: "bg-purple-500/10"
    },
    {
      id: 4,
      title: "Cast Your Vote",
      desc: "Carry your ID, press the button on the EVM, and verify the VVPAT slip.",
      icon: CheckSquare,
      color: "bg-saffron-500",
      textColor: "text-saffron-500",
      lightBg: "bg-saffron-500/10"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">The Election Journey</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A step-by-step guide to exercising your democratic right. Everything you need to know, simplified.
        </p>
      </header>

      {/* Document Checklist Hook */}
      <section className="glass-panel p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-saffron-500"></div>
        <button 
          className="w-full flex items-center justify-between group"
          onClick={() => setOpenDoc(!openDoc)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-500/10 flex items-center justify-center text-saffron-500 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold">State Document Checklist</h2>
              <p className="text-sm text-slate-400">What to carry to the polling booth (e.g., Gujarat)</p>
            </div>
          </div>
          {openDoc ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
        </button>
        
        <AnimatePresence>
          {openDoc && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckSquare size={18} /> Required (Bring ONE)
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2 bg-navy-800/50 p-3 rounded-lg"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> EPIC (Voter ID Card)</li>
                    <li className="flex items-center gap-2 bg-navy-800/50 p-3 rounded-lg"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Aadhar Card</li>
                    <li className="flex items-center gap-2 bg-navy-800/50 p-3 rounded-lg"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> PAN Card</li>
                    <li className="flex items-center gap-2 bg-navy-800/50 p-3 rounded-lg"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Driving License</li>
                  </ul>
                </div>
                <div className="flex-1 bg-saffron-500/5 border border-saffron-500/20 p-5 rounded-xl">
                  <h3 className="font-bold text-saffron-500 mb-2">Pro Tip</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Mobile phones are strictly <strong>NOT</strong> allowed inside the polling booth. Leave them at home or with a trusted person outside. You cannot show a digital ID on your phone.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Visual Timeline */}
      <div className="relative pl-6 md:pl-8">
        {/* Timeline Line */}
        <div className="absolute top-8 bottom-8 left-13 md:left-[50px] w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-saffron-500 opacity-30"></div>

        <div className="flex flex-col gap-10">
          {timeline.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="relative flex items-start gap-6 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-14 h-14 shrink-0 rounded-full ${item.color} shadow-[0_0_0_8px_rgba(15,23,42,1)] flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                <item.icon size={24} className="text-white" />
              </div>
              
              <div className="glass-panel p-6 md:p-8 flex-1 group-hover:bg-white/10 transition-colors duration-300">
                <div className={`text-xs font-bold ${item.textColor} ${item.lightBg} inline-block px-3 py-1 rounded-full mb-3`}>
                  Step {item.id}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
                <button className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all hover:text-white text-slate-300">
                  Read Module <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
