import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Check,
  Truck,
  ShieldCheck,
  Gift,
  Heart,
  Sparkles
} from 'lucide-react';
import { Hamper, CartItem } from '../types';

interface HamperDetailModalProps {
  hamper: Hamper | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  onDirectBookNow?: (hamper: Hamper) => void;
}

export const HamperDetailModal: React.FC<HamperDetailModalProps> = ({
  hamper,
  onClose,
  onAddToCart,
  onDirectBookNow,
}) => {
  if (!hamper) return null;

  const [selectedImage, setSelectedImage] = useState(hamper.image);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      hamper,
      quantity,
      customNote: customNote.trim() ? customNote : undefined,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello The Happy Hampers! I am interested in inquiring about:\n\n` +
        `🎁 *${hamper.name}* (₹${hamper.price})\n` +
        `Occasion: ${hamper.occasion}\n` +
        `Quantity: ${quantity}\n` +
        (customNote ? `Card Note: "${customNote}"\n\n` : '\n') +
        `Please confirm delivery dates and custom branding details.`
    );
    window.open(`https://wa.me/918999492692?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#FFF9F6] w-full max-w-4xl rounded-3xl border border-[#EADFCF] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#4E3F3A] shadow-md z-20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Section */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#EADFCF] shadow-xs relative">
                <img
                  src={selectedImage}
                  alt={hamper.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#4E3F3A]">
                  {hamper.occasion}
                </div>
              </div>

              {/* Thumbnails */}
              {hamper.galleryImages && hamper.galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {hamper.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img ? 'border-[#4E3F3A] ring-2 ring-[#F6C9D0]' : 'border-[#EADFCF]'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-[#D9B66F]">
                    <Star className="w-4 h-4 fill-[#D9B66F]" />
                    <span className="font-bold text-xs text-[#4E3F3A]">{hamper.rating}</span>
                  </div>
                  <span className="text-xs text-[#4E3F3A]/60">({hamper.reviewsCount} reviews)</span>
                  <span className="text-xs text-[#D9B66F] font-bold bg-[#D9B66F]/10 px-2 py-0.5 rounded-md ml-auto">
                    {hamper.packagingType}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#4E3F3A]">
                  {hamper.name}
                </h2>
                <p className="text-xs text-[#4E3F3A]/70 mt-1">
                  {hamper.tagline}
                </p>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-bold text-[#4E3F3A]">
                    ₹{hamper.price.toLocaleString('en-IN')}
                  </span>
                  {hamper.originalPrice && (
                    <span className="text-sm text-[#4E3F3A]/50 line-through">
                      ₹{hamper.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-semibold ml-2">
                    Taxes Included
                  </span>
                </div>
              </div>

              {/* What's Inside List */}
              <div className="bg-white p-4 rounded-2xl border border-[#EADFCF] space-y-2">
                <span className="text-xs font-bold uppercase text-[#D9B66F] tracking-wider block">
                  📦 What’s Inside This Trunk:
                </span>
                <ul className="space-y-1.5 text-xs text-[#4E3F3A]/90">
                  {hamper.whatsInside.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D9B66F] font-bold">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom Note Option */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#4E3F3A]">
                  ✍️ Add Handwritten Message Card (Complimentary)
                </label>
                <textarea
                  rows={2}
                  placeholder="Type your message for the recipient..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFCF] bg-white text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                />
              </div>

              {/* Quantity Selector & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#4E3F3A]">Quantity:</span>
                  <div className="flex items-center rounded-full border border-[#EADFCF] bg-white px-3 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-sm font-bold text-[#4E3F3A] px-2"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-3">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-sm font-bold text-[#4E3F3A] px-2"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      if (onDirectBookNow && hamper) {
                        onDirectBookNow(hamper);
                      }
                    }}
                    className="w-full py-3.5 rounded-full bg-[#3D2E2A] hover:bg-[#2A1E1C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#CDA452]" />
                    <span>Direct Website Booking (₹{(hamper.price * quantity).toLocaleString('en-IN')})</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={handleAddToCart}
                      className={`py-3 rounded-full text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                        added
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-[#3D2E2A] border-[#DBCAC0] hover:bg-[#FAF2ED]'
                      }`}
                    >
                      {added ? <Check className="w-4 h-4 text-white" /> : <ShoppingBag className="w-4 h-4 text-[#3D2E2A]" />}
                      <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppInquiry}
                      className="py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Micro Perks */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-[#4E3F3A]/70">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D9B66F]" />
                  <span>Pan-India Express Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D9B66F]" />
                  <span>100% Damage-Proof Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
