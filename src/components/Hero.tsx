import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Star, ShieldCheck, Gift } from 'lucide-react';
import { HERO_HAMPER_IMAGE } from '../data/hampers';

interface HeroProps {
  onExploreClick: () => void;
  onCustomizeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomizeClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-[#FFF9F6] via-[#FFF5F2] to-[#FFF9F6]"
    >
      {/* Background Soft Pastel Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#F6C9D0]/35 rounded-full filter blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FAD8C5]/40 rounded-full filter blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#C8D8C4]/30 rounded-full filter blur-3xl pointer-events-none" />

      {/* Floating Interactive Decorative Particles (Ribbons, Flowers, Confetti) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Floating Ribbon 1 */}
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-[10%] opacity-70 text-[#F6C9D0]"
        >
          <svg className="w-12 h-12" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,50 Q30,20 50,50 T90,50 Q70,80 50,50 T10,50" />
          </svg>
        </motion.div>

        {/* Floating Marigold Flower Icon */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-48 right-[12%] text-[#D9B66F]/80 opacity-80"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#D9B66F] flex items-center justify-center bg-[#FFF9F6]/80 backdrop-blur-xs shadow-xs">
            🌸
          </div>
        </motion.div>

        {/* Floating Gift Box 3D Shape */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-28 left-[12%] bg-white/80 p-3 rounded-2xl shadow-md border border-[#F6C9D0]"
        >
          <Gift className="w-6 h-6 text-[#4E3F3A]" />
        </motion.div>

        {/* Floating Confetti Hearts */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 left-[48%] text-[#F6C9D0] text-xl"
        >
          ✨
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#DBCAC0] shadow-xs text-xs font-semibold text-[#3D2E2A]">
              <span className="w-2 h-2 rounded-full bg-[#CDA452] animate-ping" />
              <span className="text-[#CDA452] font-bold">100% Handcrafted Indian Gifts</span>
              <span className="text-[#3D2E2A]/40">•</span>
              <span className="text-[#3D2E2A]/80">The Happy Hampers Studio • Pune</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#4E3F3A] leading-[1.15]">
              Thoughtfully Handcrafted Gifts for Every{' '}
              <span className="relative inline-block text-[#4E3F3A]">
                <span className="relative z-10 italic font-normal text-[#D9B66F]">Celebration.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#F6C9D0]/40 -z-0 rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4E3F3A]/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Curated luxury hampers overflowing with authentic brassware, artisan tea blends, hand-poured soy candles, and personalized handwritten cards. Delivered with love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#4E3F3A] text-white font-medium text-sm shadow-md hover:bg-[#382d2a] hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                id="hero-explore-btn"
              >
                <span>Explore Hampers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomizeClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#F6C9D0] to-[#FAD8C5] hover:from-[#FAD8C5] hover:to-[#F6C9D0] text-[#4E3F3A] font-semibold text-sm shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 border border-[#EADFCF]"
                id="hero-customize-btn"
              >
                <Sparkles className="w-4 h-4 text-[#D9B66F]" />
                <span>Customize Your Hamper</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-[#EADFCF]/60 grid grid-cols-3 gap-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C8D8C4]/40 flex items-center justify-center text-[#4E3F3A]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#4E3F3A]">120+ Artisans</p>
                  <p className="text-[10px] text-[#4E3F3A]/70">Support Local</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F6C9D0]/40 flex items-center justify-center text-[#4E3F3A]">
                  <Star className="w-4 h-4 text-[#D9B66F] fill-[#D9B66F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#4E3F3A]">4.9 ★ Rated</p>
                  <p className="text-[10px] text-[#4E3F3A]/70">12,000+ Gifts</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FAD8C5]/50 flex items-center justify-center text-[#4E3F3A]">
                  <Heart className="w-4 h-4 text-[#4E3F3A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#4E3F3A]">Free Card</p>
                  <p className="text-[10px] text-[#4E3F3A]/70">Handwritten Note</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Parallax Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px)`,
            }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Main Featured Image Card */}
            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden p-3 bg-white/70 shadow-2xl border border-[#F6C9D0]/50 backdrop-blur-md group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square">
                <img
                  src={HERO_HAMPER_IMAGE}
                  alt="Handcrafted Indian Gift Hamper Box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Badge on Image */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#4E3F3A] shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D9B66F]" />
                  <span>Bestseller Celebration Trunk</span>
                </div>
              </div>

              {/* Floating Badge 1: Handwritten Calligraphy Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#EADFCF] flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6C9D0]/50 flex items-center justify-center text-[#4E3F3A]">
                  ✍️
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4E3F3A]">Handwritten Cards</p>
                  <p className="text-[11px] text-[#4E3F3A]/70">Included with every order</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Pan-India Express Delivery */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#C8D8C4] flex items-center gap-2.5 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-[#C8D8C4]/60 flex items-center justify-center text-xs font-bold">
                  🚚
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4E3F3A]">Pan-India Delivery</p>
                  <p className="text-[10px] text-[#4E3F3A]/70">Express dispatch in 24h</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
