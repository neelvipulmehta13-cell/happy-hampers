import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/hampers';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('f-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Customization', 'Ordering', 'Delivery', 'Bulk & Corporate'];

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-[#FFF5F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base max-w-2xl mx-auto">
            Everything you need to know about custom hampers, handwritten message cards, delivery timelines, and bulk ordering.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#4E3F3A]/50" />
          <input
            type="text"
            placeholder="Search questions e.g. delivery, custom note, corporate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-[#EADFCF] shadow-xs text-sm font-medium text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
          />
        </div>

        {/* Category Filter Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#4E3F3A] text-white shadow-xs'
                  : 'bg-white hover:bg-[#EADFCF]/50 text-[#4E3F3A] border border-[#EADFCF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#EADFCF]">
              <HelpCircle className="w-8 h-8 text-[#D9B66F] mx-auto mb-2" />
              <p className="font-serif font-bold text-[#4E3F3A]">No matching questions found</p>
              <p className="text-xs text-[#4E3F3A]/60">Try searching for different keywords.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#EADFCF] shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-[#4E3F3A]">
                      {faq.question}
                    </span>
                    <div
                      className={`p-1.5 rounded-full bg-[#FFF9F6] border border-[#EADFCF] text-[#4E3F3A] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#F6C9D0]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4E3F3A]/80 border-t border-[#EADFCF]/40 leading-relaxed bg-[#FFF9F6]/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
