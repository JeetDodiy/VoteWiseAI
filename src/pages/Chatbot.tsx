import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1,
      sender: 'bot', 
      text: 'Hi! I am the VoteWise Assistant ✨. Election laws can be confusing, so I am here to explain them simply. Ask me anything, or type "Am I ready?" to take a quick quiz!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botReply = "That's a great question! In simple terms, as long as you have your name on the electoral roll and carry an approved ID (like your Aadhar or Voter ID), you are good to vote. No complicated paperwork required at the booth!";
      
      if (input.toLowerCase().includes("ready")) {
        botReply = "Awesome! Let's check your readiness. Do you know which polling booth you are assigned to? (You can check this on the Election Commission website).";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      <div className="w-full max-w-2xl h-[70vh] min-h-[500px] glass-panel flex flex-col relative overflow-hidden shadow-2xl border border-white/10 rounded-3xl">
        
        {/* Header */}
        <div className="bg-navy-900/90 backdrop-blur-md p-4 px-6 border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center text-saffron-500 relative">
              <Bot size={24} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy-900 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">VoteWise AI <Sparkles size={16} className="text-saffron-500"/></h2>
              <span className="text-sm text-emerald-400 font-medium">Online & Ready to Help</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gradient-to-b from-transparent to-navy-900/50">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-lg ${
                  msg.sender === 'user' ? 'bg-blue-500' : 'bg-saffron-500/20 text-saffron-500'
                }`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className={`p-4 rounded-2xl leading-relaxed shadow-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-saffron-500/20 text-saffron-500 shadow-lg">
                  <Bot size={16} />
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none shadow-lg flex items-center gap-1.5 w-20">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-navy-900/90 backdrop-blur-md border-t border-white/5">
          <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-saffron-500/50 focus-within:ring-1 focus-within:ring-saffron-500/50 transition-all">
            <textarea 
              rows={1}
              className="flex-1 bg-transparent text-white p-3 outline-none resize-none max-h-32 min-h-[48px] placeholder:text-slate-500"
              placeholder="Ask a question about election laws..." 
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              className={`p-3 rounded-xl flex items-center justify-center transition-all shrink-0 mb-1 mr-1 ${
                input.trim() 
                  ? 'bg-saffron-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:bg-saffron-400 hover:scale-105' 
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              }`}
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send size={20} className={input.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
            </button>
          </div>
          <p className="text-center text-xs text-slate-500 mt-3 font-medium">
            VoteWise AI can make mistakes. Please verify important rules on the official ECI website.
          </p>
        </div>
      </div>
    </div>
  );
}
