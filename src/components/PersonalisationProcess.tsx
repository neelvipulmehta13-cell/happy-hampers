import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Layers, Edit3, Gift, Heart, ArrowRight } from 'lucide-react';

interface PersonalisationProcessProps {
  onOpenCustomize: () => void;
}

export const PersonalisationProcess: React.FC<PersonalisationProcessProps> = ({ onOpenCustomize }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose an Occasion',
      desc: 'Select from Birthday, Wedding, Diwali, Baby Shower, Corporate, or custom milestones.',
      icon: <Calendar className="w-6 h-6 text-[#4E3F3A]" />,
      badgeBg: 'bg-[#F6C9D0]'
    },
    {
      num: '02',
      title: 'Select Products',
      desc: 'Pick your base trunk and fill it with brassware, candles, tea blends, chocolates & treats.',
      icon: <Layers className="w-6 h-6 text-[#4E3F3A]" />,
      badgeBg: 'bg-[#FAD8C5]'
    },
    {
      num: '03',
      title: 'Add Personal Note',
      desc: 'Type your message. Our in-house calligraphers write it by hand on gold-embossed cardstock.',
      icon: <Edit3 className="w-6 h-6 text-[#4E3F3A]" />,
      badgeBg: 'bg-[#C8D8C4]'
    },
    {
      num: '04',
      title: 'Handmade Packing',
      desc: 'Artisans hand-wrap your hamper with dried flowers, satin ribbons, and protective luxury seals.',
      icon: <Gift className="w-6 h-6 text-[#4E3F3A]" />,
      badgeBg: 'bg-[#EADFCF]'
    },
    {
      num: '05',
      title: 'Delivered with Love',
      desc: 'Pan-India express delivery right to your doorstep or directly to your loved one with surprise packing.',
      icon: <Heart className="w-6 h-6 text-red-500 fill-red-500" />,
      badgeBg: 'bg-[#D9B66F]'
    },
  ];

  return (
    <section className="py-20 bg-[#FFF5F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Step-by-Step Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            The Personalisation Process
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            How we bring your heartfelt gifting vision to life in 5 simple, seamless steps.
          </p>
        </div>

        {/* Desktop & Mobile Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-[#EADFCF] -translate-y-8 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative z-10 bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Circle */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-12 h-12 rounded-2xl ${step.badgeBg} flex items-center justify-center font-bold text-sm shadow-inner`}>
                    {step.num}
                  </span>
                  <div className="p-2 rounded-full bg-[#FFF9F6] border border-[#EADFCF]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-[#4E3F3A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#4E3F3A]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="md:hidden mt-4 pt-2 text-center text-[#D9B66F] text-xs font-bold">
                  Next Step ↓
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA to Open Custom Builder */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenCustomize}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F6C9D0] to-[#FAD8C5] hover:from-[#FAD8C5] hover:to-[#F6C9D0] text-[#4E3F3A] font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-[#EADFCF]"
          >
            <Sparkles className="w-5 h-5 text-[#D9B66F]" />
            <span>Start Building Your Custom Hamper Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
