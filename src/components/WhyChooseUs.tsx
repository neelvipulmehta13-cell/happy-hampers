import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, Box, Leaf, MessageSquareHeart } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-7 h-7 text-[#D9B66F]" />,
      title: 'Customizable Gifts',
      description: 'Build your own custom hamper from scratch or personalize any pre-curated trunk with specific items, ribbon styles, and colors.',
      bgColor: 'bg-[#F6C9D0]/30'
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-[#4E3F3A]" />,
      title: '100% Handmade with Love',
      description: 'Partnering directly with over 120 skilled Indian brass, wood, and textile artisans to bring authentic traditional craftsmanship.',
      bgColor: 'bg-[#FAD8C5]/40'
    },
    {
      icon: <Box className="w-7 h-7 text-[#D9B66F]" />,
      title: 'Premium Packaging',
      description: 'Handcrafted wooden trunks, royal velvet boxes, and satin ribbon wraps that serve as treasured keepsakes long after gifting.',
      bgColor: 'bg-[#EADFCF]/50'
    },
    {
      icon: <Leaf className="w-7 h-7 text-emerald-700" />,
      title: 'Eco-Friendly Materials',
      description: 'Sustainable jute, recycled cotton paper, organic soy wax, and plastic-free bio-packaging for mindful, eco-conscious celebrations.',
      bgColor: 'bg-[#C8D8C4]/40'
    },
    {
      icon: <MessageSquareHeart className="w-7 h-7 text-[#4E3F3A]" />,
      title: 'Personalized Message Cards',
      description: 'Complimentary gold-embossed message cards written in elegant handwritten calligraphy to convey your heartfelt emotions.',
      bgColor: 'bg-[#F6C9D0]/30'
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#FFF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            The Happy Hampers Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Why Choose Happy Hampers?
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            We move beyond standard commercial gift boxes to deliver authentic Indian heritage, artisanal warmth, and emotional connection in every box.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl ${pillar.bgColor} flex items-center justify-center shadow-inner`}>
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-[#4E3F3A]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#4E3F3A]/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-3 w-full border-t border-[#EADFCF]/40 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#D9B66F]">
                <span>Pure Craftsmanship</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
