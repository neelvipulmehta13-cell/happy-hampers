import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, ExternalLink, Check } from 'lucide-react';
import { HERO_HAMPER_IMAGE, HAMPERS } from '../data/hampers';

export const InstagramFeed: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState(false);

  const instaPosts = [
    {
      id: 'i-1',
      image: HAMPERS[0].image,
      likes: '1.2k',
      comments: '84',
      caption: 'The Royal Shehnaai Trunk arriving in Jaipur for a grand wedding celebration! ✨ #HappyHampers #WeddingGifts'
    },
    {
      id: 'i-2',
      image: HAMPERS[1].image,
      likes: '950',
      comments: '42',
      caption: 'Shubh Diwali blessings packaged in handwoven bamboo & brass urlis 🪔 #FestiveGifting #Traditional'
    },
    {
      id: 'i-3',
      image: HAMPERS[2].image,
      likes: '1.8k',
      comments: '112',
      caption: 'Fresh Damask rose truffles & hand-poured Mogra candles in signature blush pink boxes 🌸 #BirthdayGifts'
    },
    {
      id: 'i-4',
      image: HERO_HAMPER_IMAGE,
      likes: '2.1k',
      comments: '150',
      caption: 'Behind the scenes at our Mumbai studio! Calligraphers writing personal wishes by hand ✍️ #CraftedWithLove'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('@thehappyhampers_');
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <section className="py-16 bg-[#F5EBE6] relative border-t border-b border-[#DBCAC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3D2E2A]">
                Follow @thehappyhampers_
              </h3>
              <p className="text-xs text-[#3D2E2A]/70">
                Tag us on Instagram for a chance to get featured in our Pune studio showcase!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-full bg-white border border-[#DBCAC0] text-xs font-semibold text-[#3D2E2A] hover:bg-[#FAF2ED] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copiedHandle ? <Check className="w-4 h-4 text-emerald-600" /> : <Instagram className="w-4 h-4" />}
              <span>{copiedHandle ? 'Handle Copied!' : '@thehappyhampers_'}</span>
            </button>

            <a
              href="https://www.instagram.com/thehappyhampers_?igsh=bTZnZHUwb3dobTE5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#3D2E2A] text-white text-xs font-semibold shadow-xs hover:bg-[#2A1E1C] transition-all flex items-center gap-1.5"
            >
              <span>Follow Us</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {instaPosts.map((post) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/thehappyhampers_?igsh=bTZnZHUwb3dobTE5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="group relative aspect-square rounded-3xl overflow-hidden border border-[#DBCAC0] shadow-xs block bg-[#FAF2ED]"
            >
              <img
                src={post.image}
                alt="Instagram post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <p className="text-[11px] line-clamp-3 italic">
                  "{post.caption}"
                </p>

                <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
