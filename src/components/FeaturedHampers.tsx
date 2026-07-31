import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingBag, Eye, Heart, Sparkles, Filter, Check } from 'lucide-react';
import { Hamper, OccasionType } from '../types';
import { HAMPERS } from '../data/hampers';

interface FeaturedHampersProps {
  hampers?: Hamper[];
  onSelectHamper: (hamper: Hamper) => void;
  onAddToCart: (hamper: Hamper) => void;
  onDirectBookNow?: (hamper: Hamper) => void;
  searchQuery: string;
  selectedOccasionFilter?: OccasionType | 'All';
  onFilterChange: (occasion: OccasionType | 'All') => void;
}

export const FeaturedHampers: React.FC<FeaturedHampersProps> = ({
  hampers = HAMPERS,
  onSelectHamper,
  onAddToCart,
  onDirectBookNow,
  searchQuery,
  selectedOccasionFilter = 'All',
  onFilterChange
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const occasionsList: (OccasionType | 'All')[] = [
    'All',
    'Wedding',
    'Birthday',
    'Festivals',
    'Anniversary',
    'Baby Shower',
    'Housewarming',
    'Corporate',
    'Farewell'
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (hamper: Hamper, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(hamper);
    setAddedItemNotice(hamper.id);
    setTimeout(() => setAddedItemNotice(null), 1800);
  };

  const filteredHampers = hampers.filter((hamper) => {
    const matchesOccasion =
      selectedOccasionFilter === 'All' || hamper.occasion === selectedOccasionFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      hamper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hamper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hamper.whatsInside.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesOccasion && matchesQuery;
  });

  return (
    <section id="shop" className="py-20 bg-[#FFF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6C9D0]/30 text-[#4E3F3A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D9B66F]" />
            <span>Curated Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Featured Handcrafted Hampers
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            Each hamper is meticulously assembled with authentic Indian keepsakes, artisanal treats, and hand-poured fragrant candles.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 -mx-4 px-4">
          {occasionsList.map((occ) => {
            const isActive = selectedOccasionFilter === occ;
            return (
              <button
                key={occ}
                onClick={() => onFilterChange(occ)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#4E3F3A] text-white shadow-md'
                    : 'bg-white/80 hover:bg-[#EADFCF]/50 text-[#4E3F3A] border border-[#EADFCF]'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>

        {/* Hampers Grid */}
        {filteredHampers.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-dashed border-[#EADFCF]">
            <p className="text-lg font-serif font-bold text-[#4E3F3A] mb-2">
              No hampers found
            </p>
            <p className="text-sm text-[#4E3F3A]/60 mb-6">
              Try adjusting your search query or selecting a different occasion.
            </p>
            <button
              onClick={() => {
                onFilterChange('All');
              }}
              className="px-6 py-2.5 rounded-full bg-[#F6C9D0] text-[#4E3F3A] font-medium text-sm"
            >
              Show All Hampers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredHampers.map((hamper) => {
              const isFav = favorites.includes(hamper.id);
              const isNoticeActive = addedItemNotice === hamper.id;

              return (
                <motion.div
                  key={hamper.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EADFCF]/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  onClick={() => onSelectHamper(hamper)}
                >
                  {/* Top Badges */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF9F6]">
                    <img
                      src={hamper.image}
                      alt={hamper.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* Occasion Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#4E3F3A] shadow-xs">
                        {hamper.occasion}
                      </span>
                      {hamper.isBestseller && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D9B66F] text-[#4E3F3A] shadow-xs">
                          ★ Bestseller
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(hamper.id, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#4E3F3A] shadow-xs transition-colors z-10"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'text-red-500 fill-red-500' : 'text-[#4E3F3A]'
                        }`}
                      />
                    </button>

                    {/* Hover Quick Actions */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDirectBookNow) {
                            onDirectBookNow(hamper);
                          } else {
                            onSelectHamper(hamper);
                          }
                        }}
                        className="px-3.5 py-2 rounded-full bg-[#3D2E2A] text-white font-bold text-xs shadow-lg hover:bg-[#2A1E1C] transition-all transform hover:scale-105 flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#CDA452]" />
                        <span>Book Now</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHamper(hamper);
                        }}
                        className="p-2 rounded-full bg-white text-[#3D2E2A] font-medium text-xs shadow-lg hover:bg-[#FFF9F6] transition-all transform hover:scale-105 flex items-center gap-1"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & Packaging */}
                      <div className="flex items-center justify-between text-xs text-[#4E3F3A]/70 mb-1.5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#D9B66F] text-[#D9B66F]" />
                          <span className="font-bold text-[#4E3F3A]">{hamper.rating}</span>
                          <span>({hamper.reviewsCount})</span>
                        </div>
                        <span className="text-[11px] font-medium text-[#D9B66F] bg-[#D9B66F]/10 px-2 py-0.5 rounded-md">
                          {hamper.packagingType}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-[#4E3F3A] group-hover:text-[#D9B66F] transition-colors line-clamp-1">
                        {hamper.name}
                      </h3>

                      {/* Short Tagline */}
                      <p className="text-xs text-[#4E3F3A]/70 line-clamp-2 mt-1 font-normal">
                        {hamper.tagline}
                      </p>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-3 border-t border-[#EADFCF]/60 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#4E3F3A]">
                            ₹{hamper.price.toLocaleString('en-IN')}
                          </span>
                          {hamper.originalPrice && (
                            <span className="text-xs text-[#4E3F3A]/50 line-through">
                              ₹{hamper.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          Free Personalized Card
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(hamper, e)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-xs ${
                          isNoticeActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-[#F6C9D0] to-[#FAD8C5] hover:from-[#FAD8C5] hover:to-[#F6C9D0] text-[#4E3F3A]'
                        }`}
                        id={`add-to-cart-${hamper.id}`}
                      >
                        {isNoticeActive ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
