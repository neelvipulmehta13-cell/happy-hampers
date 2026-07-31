import React from 'react';
import { motion } from 'motion/react';
import {
  Cake,
  HeartHandshake,
  Sparkles,
  Baby,
  Home,
  Flame,
  Briefcase,
  Gift,
  ArrowUpRight
} from 'lucide-react';
import { OccasionType } from '../types';
import { OCCASIONS } from '../data/hampers';

interface ShopByOccasionProps {
  onSelectOccasion: (occasion: OccasionType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Cake: <Cake className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Baby: <Baby className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Gift: <Gift className="w-6 h-6" />,
};

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ onSelectOccasion }) => {
  return (
    <section id="occasions" className="py-20 bg-[#FFF5F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Celebration Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Shop by Special Occasion
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            Whether it’s welcoming a newborn, celebrating a lifelong wedding bond, or honoring festive traditions, explore hampers curated for life’s sweetest milestones.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {OCCASIONS.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                onSelectOccasion(occ.id);
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-white rounded-3xl p-5 sm:p-6 border border-[#EADFCF] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Card Top */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F6] border border-[#EADFCF] flex items-center justify-center text-[#4E3F3A] group-hover:bg-[#F6C9D0] transition-colors duration-300">
                  {iconMap[occ.iconName] || <Gift className="w-6 h-6" />}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFF9F6] flex items-center justify-center text-[#4E3F3A]/40 group-hover:text-[#4E3F3A] group-hover:bg-[#FAD8C5] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-1 z-10">
                <h3 className="font-serif text-lg font-bold text-[#4E3F3A] group-hover:text-[#D9B66F] transition-colors">
                  {occ.name}
                </h3>
                <p className="text-xs text-[#4E3F3A]/60 line-clamp-2">
                  {occ.subtitle}
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="mt-4 pt-3 border-t border-[#EADFCF]/40 flex items-center justify-between text-[11px] font-medium text-[#4E3F3A]/70">
                <span>{occ.count}+ Curated Hampers</span>
                <span className="text-[#D9B66F] font-semibold">Explore ➔</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
