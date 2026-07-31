import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    const text = encodeURIComponent(
      msg.trim()
        ? msg
        : 'Hello The Happy Hampers! I need help choosing a gift hamper.'
    );
    window.open(`https://wa.me/918999492692?text=${text}`, '_blank');
    setIsOpen(false);
    setMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#EADFCF] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EADFCF]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#4E3F3A]">
                    Happy Hampers Assistant
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online now
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#4E3F3A]/40 hover:text-[#4E3F3A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-[#EADFCF] text-xs text-[#4E3F3A] space-y-1">
              <p className="font-medium">Namaste! 🙏 How can we help you today?</p>
              <p className="text-[11px] text-[#4E3F3A]/70">
                Ask about wedding trunks, custom hampers, or corporate bulk discounts!
              </p>
            </div>

            <div className="space-y-2">
              <textarea
                rows={2}
                placeholder="Type your message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EADFCF] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
              />

              <button
                onClick={handleSend}
                className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:bg-emerald-700 transition-colors relative group"
        aria-label="Contact on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[9px] font-bold text-[#4E3F3A]">
          1
        </span>
      </motion.button>
    </div>
  );
};
