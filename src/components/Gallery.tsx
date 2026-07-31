import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hampers';
import { GalleryItem, OccasionType } from '../types';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<OccasionType | 'All'>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    GALLERY_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );

  const categories: (OccasionType | 'All')[] = [
    'All',
    'Wedding',
    'Festivals',
    'Birthday',
    'Housewarming',
    'Baby Shower',
    'Corporate'
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.occasion === selectedCategory
  );

  return (
    <section id="gallery" className="py-20 bg-[#FFF5F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Artisanal Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Handmade Gifting Gallery
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            Take a peak inside our gifting studio. Every trunk, ribbon, wax seal, and brass adornment is assembled by hand with devotion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4E3F3A] text-white shadow-xs'
                  : 'bg-white hover:bg-[#EADFCF]/50 text-[#4E3F3A] border border-[#EADFCF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest Style Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveLightboxItem(item)}
              className="break-inside-avoid bg-white rounded-3xl overflow-hidden border border-[#EADFCF] shadow-xs hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-108 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B66F] mb-1">
                    {item.occasion}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <span>{likesMap[item.id]} Likes</span>
                    </button>
                    <Maximize2 className="w-4 h-4 text-white/80" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-[#4E3F3A] hover:bg-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 md:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-[#F6C9D0]/50 text-[#4E3F3A] text-xs font-bold rounded-full">
                      {activeLightboxItem.occasion}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#4E3F3A] mt-3">
                      {activeLightboxItem.title}
                    </h3>
                    <p className="text-xs text-[#4E3F3A]/70 mt-2">
                      Hand-packed with authentic Indian crafts, brass lotus urlis, organic soy candles, and personalized handwritten cards.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EADFCF] flex items-center justify-between">
                    <button
                      onClick={(e) => handleLike(activeLightboxItem.id, e)}
                      className="flex items-center gap-2 text-xs font-bold text-[#4E3F3A]"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      <span>{likesMap[activeLightboxItem.id]} People Loved This</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
