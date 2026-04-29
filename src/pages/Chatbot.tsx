import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

// ── Smart Rule-Based Voter Education Engine ──────────────────────────────────
const KB: { keys: string[]; answer: string }[] = [
  {
    keys: ['register', 'registration', 'form 6', 'enroll', 'sign up', 'voter id'],
    answer:
      '📝 **How to Register to Vote**\n\nYou can register in two ways:\n\n• **Online:** Visit voters.eci.gov.in → Fill Form 6 → Upload photo, age proof & address proof → Submit\n• **Offline:** Visit your nearest Electoral Registration Office (ERO) and submit a filled Form 6 with documents\n\nYour name will appear on the electoral roll within 30 days. You can track your application status on the Voter Portal.\n\n🌟 Every registered voter makes democracy stronger!',
  },
  {
    keys: ['eligible', 'eligibility', 'qualify', 'can i vote', 'am i'],
    answer:
      '✅ **Voter Eligibility in India**\n\nYou are eligible to vote if you:\n\n• Are a citizen of India\n• Are 18 years or older on January 1st of the qualifying year\n• Are ordinarily resident in the constituency\n• Are not disqualified under the Representation of the People Act\n\nIf you meet all the above, you have the RIGHT to vote — and the power to change your future! 🗳️',
  },
  {
    keys: ['document', 'id', 'carry', 'bring', 'proof', 'aadhar', 'epic', 'pan'],
    answer:
      '🪪 **Documents to Carry on Election Day**\n\nBring ANY ONE of these approved IDs:\n\n• EPIC (Voter ID Card) — most preferred\n• Aadhaar Card\n• PAN Card\n• Driving License\n• Passport\n• MNREGA Job Card\n• Bank / Post Office Passbook with photo\n\n⚠️ **Important:** Mobile phones are NOT allowed inside the polling booth. Carry a physical ID only.\n\nYou\'ve got this! ✨',
  },
  {
    keys: ['booth', 'polling', 'station', 'where', 'locate', 'find'],
    answer:
      '📍 **How to Find Your Polling Booth**\n\n• **Online:** Go to voters.eci.gov.in → "Search in Electoral Roll" → Enter your details\n• **App:** Download the "Voter Helpline" app → Tap "Find My Booth" for a live map\n• **Helpline:** Call 1950 for voice-based booth search\n\nBooths are open from **7:00 AM to 6:00 PM** on election day. Visit during 10 AM–12 PM or 2 PM–4 PM to avoid long queues.\n\n🗺️ Save the address in Google Maps the night before!',
  },
  {
    keys: ['evm', 'machine', 'electronic', 'voting machine', 'how to vote', 'press'],
    answer:
      '🖥️ **How the EVM (Electronic Voting Machine) Works**\n\n1. Enter the voting booth — it\'s completely private\n2. Look at the ballot unit with candidate names & symbols\n3. Press the **blue button** next to your chosen candidate\n4. A long beep confirms your vote is recorded\n5. Check the **VVPAT window** — a paper slip shows your choice for 7 seconds\n\nThe EVM is battery-operated, tamper-proof, and independently tested. Your vote is 100% secure! 🔒',
  },
  {
    keys: ['vvpat', 'paper', 'slip', 'verify', 'audit'],
    answer:
      '🧾 **What is VVPAT?**\n\nVVPAT stands for **Voter Verifiable Paper Audit Trail**. It\'s a printer attached to every EVM that:\n\n• Prints a paper slip showing your candidate\'s name & symbol\n• The slip is visible through a glass window for **7 seconds**\n• The slip is then automatically cut and stored in a sealed box\n• It cannot be removed from the booth\n\nVVPAT is your proof that the EVM recorded your vote correctly. India has over 17 lakh VVPAT machines! 🇮🇳',
  },
  {
    keys: ['candidate', 'research', 'manifesto', 'party', 'who to vote'],
    answer:
      '🔍 **How to Research Candidates**\n\n• **myneta.info** — View every candidate\'s criminal record, assets & education (mandatory affidavit)\n• **prsindia.org** — Check attendance & Parliament questions of sitting MPs/MLAs\n• **Party Websites** — Read official manifestos and local promises\n• **Local News** — Search past 5 years of news about your candidate\n\n⚠️ Beware of misinformation on social media. Always verify before sharing.\n\nAn informed vote is the most powerful vote! 💪',
  },
  {
    keys: ['eci', 'election commission', 'commission of india'],
    answer:
      '🏛️ **Election Commission of India (ECI)**\n\nThe ECI is an autonomous constitutional authority responsible for administering elections in India. It:\n\n• Announces election dates and the Model Code of Conduct\n• Supervises free & fair elections across the country\n• Manages the EPIC (Voter ID) system\n• Resolves election disputes\n\nChief Election Commissioner leads the commission. The ECI has conducted 17 Lok Sabha elections since 1951!\n\n🌐 Official website: eci.gov.in',
  },
  {
    keys: ['ready', 'prepared', 'checklist'],
    answer:
      '✅ **Your Election Day Checklist**\n\n□ Check your name on the electoral roll (voters.eci.gov.in)\n□ Note your booth address & save it on Maps\n□ Carry ONE approved photo ID (Voter ID / Aadhaar / PAN etc.)\n□ Leave your mobile phone outside the booth\n□ Join the correct queue (separate lines often for men & women)\n□ Get your finger marked with indelible ink\n□ Press the EVM button for your candidate\n□ Verify your vote on the VVPAT screen\n\nYou are ready! Go make your voice heard! 🗳️🇮🇳',
  },
  {
    keys: ['secret', 'private', 'confidential', 'anonymous', 'who can see'],
    answer:
      '🔒 **Is My Vote Secret?**\n\nYes! Your vote is completely confidential. Here\'s why:\n\n• The inner booth has no cameras\n• No one — not even polling officers — can see who you voted for\n• The EVM records only the total count, not who voted for whom\n• Pressuring someone to reveal their vote is illegal (Section 171C IPC)\n\nVote freely and fearlessly. Your choice is yours alone! 💙',
  },
  {
    keys: ['hi', 'hello', 'hey', 'namaste', 'start'],
    answer:
      '👋 **Hello! Welcome to VoteWise AI!**\n\nI\'m your personal voter education assistant. I can help you with:\n\n• 📝 How to register to vote\n• 📍 Finding your polling booth\n• 🖥️ How EVMs and VVPAT work\n• 🔍 Researching candidates\n• 🪪 Documents to carry on election day\n• ✅ Checking your eligibility\n\nWhat would you like to know? Just ask! 😊',
  },
];

const DEFAULT_REPLY =
  '🤔 Great question! For the most accurate and up-to-date information on this topic, I recommend:\n\n• **ECI Official Site:** eci.gov.in\n• **Voter Portal:** voters.eci.gov.in\n• **Helpline:** Call 1950 (toll-free)\n\nYou can also ask me about: voter registration, booth location, EVMs, VVPAT, required documents, or candidate research! 🗳️';

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KB) {
    if (item.keys.some(k => lower.includes(k))) {
      return item.answer;
    }
  }
  return DEFAULT_REPLY;
}

const SUGGESTED = [
  'How do I register to vote?',
  'What ID do I need at the booth?',
  'How does the EVM work?',
  'Am I eligible to vote?',
  'How do I find my polling booth?',
  'What is VVPAT?',
];

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm VoteWise AI ✨ — your personal guide to Indian elections.\n\nAsk me anything about registering to vote, what to carry on election day, how EVMs work, finding your booth, and more!\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isTyping) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setTimeout(() => {
      const reply = getReply(messageText);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 900 + Math.random() * 500); // feels natural
  };

  const handleReset = () => {
    setMessages([{ id: Date.now(), sender: 'bot', text: '✨ Chat cleared! Ask me anything about voting in India.' }]);
    setShowSuggestions(true);
  };

  const renderText = (text: string) =>
    text.split('\n').map((line, i, arr) => {
      const bold = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
      );
      return <span key={i}>{bold}{i < arr.length - 1 && <br />}</span>;
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      <div className="w-full max-w-2xl h-[75vh] min-h-[520px] glass-panel flex flex-col relative overflow-hidden shadow-2xl border border-white/10 rounded-3xl">

        {/* Header */}
        <div className="bg-navy-900/90 backdrop-blur-md p-4 px-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center text-saffron-500 relative">
              <Bot size={24} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy-900 rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                VoteWise AI <Sparkles size={16} className="text-saffron-500" />
              </h2>
              <span className="text-sm text-emerald-400 font-medium">Online · Ready to Help</span>
            </div>
          </div>
          <button onClick={handleReset} title="Clear chat" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth bg-gradient-to-b from-transparent to-navy-900/30">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-lg ${
                  msg.sender === 'user' ? 'bg-blue-500' : 'bg-saffron-500/20 text-saffron-500'
                }`}>
                  {msg.sender === 'user' ? <User size={15} /> : <Bot size={15} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white/5 border border-white/8 text-slate-200 rounded-tl-none'
                }`}>
                  {renderText(msg.text)}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[88%]">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-saffron-500/20 text-saffron-500 shadow-lg">
                  <Bot size={15} />
                </div>
                <div className="bg-white/5 border border-white/8 p-4 rounded-2xl rounded-tl-none shadow-md flex items-center gap-1.5 w-20">
                  {[0, 150, 300].map(d => (
                    <div key={d} className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggested Questions */}
          <AnimatePresence>
            {showSuggestions && !isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => handleSend(q)}
                    className="text-xs px-3 py-2 rounded-full bg-saffron-500/10 border border-saffron-500/20 text-saffron-300 hover:bg-saffron-500/20 transition-all hover:scale-105 active:scale-95">
                    {q}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-navy-900/90 backdrop-blur-md border-t border-white/5">
          <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-saffron-500/50 focus-within:ring-1 focus-within:ring-saffron-500/30 transition-all">
            <textarea
              ref={textareaRef}
              rows={1}
              className="flex-1 bg-transparent text-white p-3 outline-none resize-none max-h-32 min-h-[48px] placeholder:text-slate-500 text-sm"
              placeholder="Ask anything about voting in India..."
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={`p-3 rounded-xl flex items-center justify-center transition-all shrink-0 mb-1 mr-1 ${
                input.trim() && !isTyping
                  ? 'bg-saffron-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:bg-saffron-400 hover:scale-105 active:scale-95'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send size={18} className={input.trim() ? 'translate-x-0.5 -translate-y-0.5' : ''} />
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2.5">
            VoteWise AI · Voter Education Assistant · Verify important info at{' '}
            <a href="https://eci.gov.in" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-400 underline transition-colors">
              eci.gov.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
