import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/hampers';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#FFF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Stories of Joy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Loved Across India
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            Read how Happy Hampers helped thousands of gift givers create unforgettable memories for their loved ones.
          </p>
        </div>

        {/* Carousel / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars & Occasion */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#D9B66F]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D9B66F]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F6C9D0]/40 text-[#4E3F3A]">
                    {review.occasion}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs text-[#4E3F3A]/80 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-[#EADFCF]/50 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#EADFCF]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-serif font-bold text-xs text-[#4E3F3A]">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#4E3F3A]/60">
                    {review.city} • {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
