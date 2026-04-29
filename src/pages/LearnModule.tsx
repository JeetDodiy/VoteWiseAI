import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, MapPin, CheckSquare, Search, FileText,
  ChevronDown, ChevronUp, X, ArrowRight, Clock,
  Star, AlertCircle, Lightbulb, CheckCircle2
} from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  textColor: string;
  lightBg: string;
  readTime: string;
  module: {
    intro: string;
    sections: {
      heading: string;
      icon: React.ElementType;
      content: string;
      points?: string[];
    }[];
    tip: string;
    warning?: string;
  };
}

export default function LearnModule() {
  const [openDoc, setOpenDoc] = useState(false);
  const [activeModule, setActiveModule] = useState<TimelineItem | null>(null);

  const timeline: TimelineItem[] = [
    {
      id: 1,
      title: "Register to Vote",
      desc: "Apply online via the Voter Portal or physically using Form 6.",
      icon: BookOpen,
      color: "bg-blue-500",
      textColor: "text-blue-400",
      lightBg: "bg-blue-500/10",
      readTime: "5 min read",
      module: {
        intro:
          "Voter registration is the foundation of democracy. Every citizen aged 18 or above has the right — and responsibility — to register. Here's exactly how to do it, step by step.",
        sections: [
          {
            heading: "Who is Eligible?",
            icon: CheckCircle2,
            content: "Any Indian citizen who has turned 18 on or before January 1st of the qualifying year is eligible to register as a voter.",
            points: [
              "Must be 18 years or older on the qualifying date",
              "Must be ordinarily resident of the constituency",
              "Not disqualified under the Representation of the People Act",
              "Must be a citizen of India",
            ],
          },
          {
            heading: "Online Registration (Voter Portal)",
            icon: ArrowRight,
            content:
              "The fastest way to register is through the official Election Commission of India Voter Portal at voters.eci.gov.in.",
            points: [
              "Visit voters.eci.gov.in or download the Voter Helpline App",
              "Click 'New Registration (Form 6)'",
              "Fill in your name, DOB, address, and upload a photo",
              "Submit Aadhaar for instant verification (optional but faster)",
              "Track your application status with the reference number",
            ],
          },
          {
            heading: "Offline Registration (Form 6)",
            icon: FileText,
            content:
              "If you prefer the offline route, visit your nearest Electoral Registration Office (ERO) or Booth Level Officer (BLO).",
            points: [
              "Collect Form 6 from the ERO office or download it online",
              "Attach a passport-size photo, proof of age, and proof of address",
              "Submit at your local ERO or BLO office",
              "You'll receive an acknowledgment slip — keep it safe",
            ],
          },
        ],
        tip: "Your name will appear in the electoral roll within 30 days of successful verification. You can verify your status anytime on the Voter Portal using your reference number.",
        warning:
          "Make sure all details exactly match your supporting documents. Mismatches are the #1 reason for rejection.",
      },
    },
    {
      id: 2,
      title: "Find Your Polling Booth",
      desc: "Check your name in the electoral roll and locate your designated station.",
      icon: MapPin,
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
      lightBg: "bg-emerald-500/10",
      readTime: "3 min read",
      module: {
        intro:
          "Your polling booth is your designated voting location. You can only vote at the specific booth assigned to your address. Here's how to find it quickly.",
        sections: [
          {
            heading: "Search on the Voter Portal",
            icon: Search,
            content:
              "The quickest way is the official Voter Portal or Voter Helpline App.",
            points: [
              "Go to voters.eci.gov.in → 'Search in Electoral Roll'",
              "Enter your name, age, and state to find your entry",
              "Your booth name, number, and address will be displayed",
              "Download or screenshot the details for polling day",
            ],
          },
          {
            heading: "Using the Voter Helpline App",
            icon: MapPin,
            content:
              "The ECI Voter Helpline App (available on Android & iOS) makes this even easier — it shows your booth on a live map.",
            points: [
              "Download 'Voter Helpline' app from Play Store / App Store",
              "Log in and tap 'Find My Booth'",
              "The app shows your booth location on a map with directions",
              "Dial 1950 for voice-based booth search",
            ],
          },
          {
            heading: "On Election Day",
            icon: CheckCircle2,
            content: "Plan your visit ahead of time to avoid long queues.",
            points: [
              "Booths open at 7:00 AM and close at 6:00 PM (may vary by state)",
              "Visit during off-peak hours (10 AM–12 PM or 2 PM–4 PM)",
              "Carry your EPIC or approved alternate ID",
              "Your name must appear in the final voter list to cast your vote",
            ],
          },
        ],
        tip: "Save your booth address in Google Maps the night before election day so you can navigate quickly in the morning.",
      },
    },
    {
      id: 3,
      title: "Research Candidates",
      desc: "Learn about the candidates in your constituency and their manifestos.",
      icon: Search,
      color: "bg-purple-500",
      textColor: "text-purple-400",
      lightBg: "bg-purple-500/10",
      readTime: "6 min read",
      module: {
        intro:
          "An informed vote is a powerful vote. Before election day, spend a little time understanding who is on your ballot and what they stand for. Here's your research checklist.",
        sections: [
          {
            heading: "Know Your Candidates",
            icon: Search,
            content:
              "Every candidate who files a nomination must submit an affidavit disclosing their criminal record, assets, liabilities, and educational qualifications. These are public.",
            points: [
              "Visit myneta.info to view all candidate affidavits",
              "Check their criminal background (if any cases are pending)",
              "See their declared assets and income",
              "Verify their educational qualifications",
            ],
          },
          {
            heading: "Read Party Manifestos",
            icon: BookOpen,
            content:
              "A manifesto is a party's promise to voters — their plan of action if elected. Reading it helps you align your vote with your values.",
            points: [
              "Find manifestos on official party websites",
              "Focus on promises for local issues (roads, water, employment)",
              "Compare manifestos of the top 2–3 parties in your area",
              "Look at their track record: did they fulfil past promises?",
            ],
          },
          {
            heading: "Check Voting History (for re-contesting MPs/MLAs)",
            icon: Star,
            content:
              "If a sitting MP or MLA is re-contesting, you can check how often they attended Parliament/Assembly and whether they raised local issues.",
            points: [
              "Visit prsindia.org for detailed MP/MLA attendance records",
              "Check how many questions they raised in Parliament",
              "Look for constituency development fund (MPLAD) utilization",
              "Search local news archives for their past work",
            ],
          },
        ],
        tip: "Don't rely only on social media. Cross-reference information with official sources like ECI, PRS India, and MyNeta before making your decision.",
        warning:
          "Beware of misinformation and paid political ads on social media. Always verify claims before believing or sharing them.",
      },
    },
    {
      id: 4,
      title: "Cast Your Vote",
      desc: "Carry your ID, press the button on the EVM, and verify the VVPAT slip.",
      icon: CheckSquare,
      color: "bg-amber-500",
      textColor: "text-amber-400",
      lightBg: "bg-amber-500/10",
      readTime: "4 min read",
      module: {
        intro:
          "Election day is your moment. The process of casting your vote is simple, quick, and completely confidential. Here's exactly what to expect from the moment you arrive.",
        sections: [
          {
            heading: "At the Polling Booth",
            icon: MapPin,
            content: "The entire voting process at the booth typically takes only 3–5 minutes.",
            points: [
              "Join the queue and wait for your turn",
              "Show your ID to the Presiding Officer at Table 1",
              "Your name will be found in the electoral roll",
              "Your finger will be marked with indelible ink",
              "You'll sign/thumbprint the register and receive a voter slip",
            ],
          },
          {
            heading: "Using the EVM",
            icon: CheckSquare,
            content:
              "The Electronic Voting Machine (EVM) is India's tamper-proof, battery-operated voting device. It is simple to use.",
            points: [
              "Enter the inner booth — no one can see who you vote for",
              "Look at the ballot unit displaying candidates and symbols",
              "Press the blue button next to your chosen candidate",
              "A long beep sound confirms your vote is recorded",
              "The EVM stores votes electronically — no paper ballot needed",
            ],
          },
          {
            heading: "Verify Your Vote via VVPAT",
            icon: Star,
            content:
              "A VVPAT (Voter Verifiable Paper Audit Trail) machine is attached to every EVM. It shows you a paper slip of who you voted for.",
            points: [
              "After pressing the EVM button, look at the VVPAT window",
              "A paper slip with your candidate's name and symbol appears",
              "The slip is visible for 7 seconds, then automatically cut and stored",
              "This is your proof — the vote was counted correctly",
              "You cannot take the VVPAT slip out of the booth",
            ],
          },
        ],
        tip: "The entire voting process is completely secret. No one — not even the polling officers — can see who you voted for. Vote freely and confidently!",
        warning:
          "Carrying a mobile phone or any camera inside the polling booth is strictly prohibited. Violation can result in legal action.",
      },
    },
  ];

  const openModule = (item: TimelineItem) => setActiveModule(item);
  const closeModule = () => setActiveModule(null);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">The Election Journey</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A step-by-step guide to exercising your democratic right. Everything
          you need to know, simplified.
        </p>
      </header>

      {/* Document Checklist Hook */}
      <section className="glass-panel p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <button
          className="w-full flex items-center justify-between group"
          onClick={() => setOpenDoc(!openDoc)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold">State Document Checklist</h2>
              <p className="text-sm text-slate-400">
                What to carry to the polling booth (e.g., Gujarat)
              </p>
            </div>
          </div>
          {openDoc ? (
            <ChevronUp size={24} className="text-slate-400" />
          ) : (
            <ChevronDown size={24} className="text-slate-400" />
          )}
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
                    {['EPIC (Voter ID Card)', 'Aadhar Card', 'PAN Card', 'Driving License'].map(doc => (
                      <li key={doc} className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl">
                  <h3 className="font-bold text-amber-400 mb-2">⚠️ Pro Tip</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Mobile phones are strictly <strong>NOT</strong> allowed
                    inside the polling booth. Leave them at home or with a
                    trusted person outside. You cannot show a digital ID on
                    your phone.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Visual Timeline */}
      <div className="relative pl-6 md:pl-8">
        <div className="absolute top-8 bottom-8 left-13 md:left-[50px] w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 opacity-30"></div>

        <div className="flex flex-col gap-10">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex items-start gap-6 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-14 h-14 shrink-0 rounded-full ${item.color} shadow-[0_0_0_8px_rgba(15,23,42,1)] flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon size={24} className="text-white" />
              </div>

              <div className="glass-panel p-6 md:p-8 flex-1 group-hover:bg-white/10 transition-colors duration-300">
                <div
                  className={`text-xs font-bold ${item.textColor} ${item.lightBg} inline-block px-3 py-1 rounded-full mb-3`}
                >
                  Step {item.id}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openModule(item)}
                    className={`text-sm font-bold flex items-center gap-1.5 px-4 py-2 rounded-full border ${item.textColor} border-current hover:bg-white/10 transition-all duration-200 hover:gap-2.5 active:scale-95`}
                  >
                    Read Module <ArrowRight size={14} />
                  </button>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {item.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Slide-In Module Drawer ── */}
      <AnimatePresence>
        {activeModule && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModule}
            />

            {/* Drawer Panel */}
            <motion.aside
              className="fixed right-0 top-0 h-full w-full max-w-xl z-50 overflow-y-auto"
              style={{
                background: 'linear-gradient(160deg, #0f1729 0%, #131e35 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div
                className={`sticky top-0 z-10 p-6 flex items-start justify-between border-b border-white/8`}
                style={{ background: 'inherit' }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${activeModule.color} flex items-center justify-center shrink-0`}>
                    <activeModule.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${activeModule.textColor} ${activeModule.lightBg} px-2 py-0.5 rounded-full`}>
                      Step {activeModule.id}
                    </span>
                    <h2 className="text-xl font-extrabold mt-1">{activeModule.title}</h2>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <Clock size={11} /> {activeModule.readTime}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModule}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0 mt-1"
                  aria-label="Close module"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-6">
                {/* Intro */}
                <p className="text-slate-300 leading-relaxed text-base border-l-2 border-white/20 pl-4">
                  {activeModule.module.intro}
                </p>

                {/* Sections */}
                {activeModule.module.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="glass-panel p-5"
                  >
                    <h3 className={`font-bold text-base mb-3 flex items-center gap-2 ${activeModule.textColor}`}>
                      <section.icon size={16} />
                      {section.heading}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                      {section.content}
                    </p>
                    {section.points && (
                      <ul className="space-y-2">
                        {section.points.map((pt, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-slate-300 bg-white/5 rounded-lg px-3 py-2"
                          >
                            <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${activeModule.textColor}`} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}

                {/* Warning */}
                {activeModule.module.warning && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                  >
                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm leading-relaxed">
                      <strong className="text-red-400">Warning: </strong>
                      {activeModule.module.warning}
                    </p>
                  </motion.div>
                )}

                {/* Pro Tip */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4"
                >
                  <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm leading-relaxed">
                    <strong className="text-amber-400">Pro Tip: </strong>
                    {activeModule.module.tip}
                  </p>
                </motion.div>

                {/* Close CTA */}
                <button
                  onClick={closeModule}
                  className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-sm transition-all duration-200 active:scale-95 mt-2"
                >
                  ← Back to Journey
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
