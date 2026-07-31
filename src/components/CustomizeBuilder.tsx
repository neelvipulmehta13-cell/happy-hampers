import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Gift,
  MessageCircle,
  ShoppingBag,
  Info
} from 'lucide-react';
import { BuilderItem, CustomHamperState, OccasionType, CartItem } from '../types';
import { BUILDER_BOXES, BUILDER_ADDONS } from '../data/builderItems';
import { CUSTOM_BUILDER_IMAGE } from '../data/hampers';

interface CustomizeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customCartItem: CartItem) => void;
}

export const CustomizeBuilder: React.FC<CustomizeBuilderProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [customState, setCustomState] = useState<CustomHamperState>({
    box: BUILDER_BOXES[0], // Default blush rigid box
    items: [BUILDER_ADDONS[0], BUILDER_ADDONS[3]], // Default dates + soy candle
    personalNote: 'Wishing you endless joy, peace, and warmth on your special day! With all our love.',
    recipientName: 'Priya & Rahul',
    wrappingStyle: 'blush_ribbon',
    occasion: 'Birthday',
  });

  if (!isOpen) return null;

  const calculateTotal = () => {
    const boxPrice = customState.box ? customState.box.price : 0;
    const itemsTotal = customState.items.reduce((acc, it) => acc + it.price, 0);
    return boxPrice + itemsTotal;
  };

  const toggleItemSelection = (item: BuilderItem) => {
    setCustomState((prev) => {
      const exists = prev.items.some((i) => i.id === item.id);
      if (exists) {
        return { ...prev, items: prev.items.filter((i) => i.id !== item.id) };
      } else {
        return { ...prev, items: [...prev.items, item] };
      }
    });
  };

  const handleFinishCustomization = (mode: 'cart' | 'whatsapp') => {
    const total = calculateTotal();
    const hamperName = `Bespoke Custom ${customState.occasion} Hamper (${customState.box?.name.split(' ')[0]})`;

    const customCartItem: CartItem = {
      hamper: {
        id: `custom-${Date.now()}`,
        name: hamperName,
        tagline: `Curated for ${customState.recipientName} with ${customState.items.length} artisan items`,
        price: total,
        rating: 5.0,
        reviewsCount: 1,
        occasion: customState.occasion,
        image: CUSTOM_BUILDER_IMAGE,
        galleryImages: [CUSTOM_BUILDER_IMAGE],
        description: `Bespoke custom hamper in a ${customState.box?.name}. Items: ${customState.items.map((i) => i.name).join(', ')}. Note: "${customState.personalNote}"`,
        whatsInside: [
          `Base: ${customState.box?.name}`,
          ...customState.items.map((i) => i.name),
          `Wrapping: ${customState.wrappingStyle.replace('_', ' ')}`,
        ],
        packagingType: (customState.box?.name.includes('Velvet')
          ? 'Velvet Box'
          : customState.box?.name.includes('Wood')
          ? 'Wooden Trunk'
          : customState.box?.name.includes('Jute')
          ? 'Eco Jute Basket'
          : 'Handmade Floral Box') as any,
      },
      quantity: 1,
      customNote: customState.personalNote,
      customizationDetails: `For: ${customState.recipientName} | Items: ${customState.items.map((i) => i.name).join(', ')}`,
    };

    if (mode === 'cart') {
      onAddToCart(customCartItem);
      onClose();
    } else {
      // Direct WhatsApp Order
      const text = encodeURIComponent(
        `Hello The Happy Hampers! I built a custom hamper on your website:\n\n` +
          `🎁 *${hamperName}*\n` +
          `📦 Box: ${customState.box?.name} (₹${customState.box?.price})\n` +
          `✨ Items:\n${customState.items.map((i) => ` - ${i.name} (₹${i.price})`).join('\n')}\n\n` +
          `👤 Recipient: ${customState.recipientName}\n` +
          `💌 Note: "${customState.personalNote}"\n` +
          `💰 Total Price: ₹${total.toLocaleString('en-IN')}\n\n` +
          `Please confirm availability and dispatch details!`
      );
      window.open(`https://wa.me/918999492692?text=${text}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#FFF9F6] w-full max-w-5xl rounded-3xl border border-[#EADFCF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#EADFCF] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F6C9D0]/50 flex items-center justify-center text-[#4E3F3A]">
              <Sparkles className="w-5 h-5 text-[#D9B66F]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4E3F3A]">
                Customize Your Hamper
              </h2>
              <p className="text-xs text-[#4E3F3A]/70">
                Step {step} of 4: {step === 1 ? 'Choose Base Box' : step === 2 ? 'Select Handcrafted Items' : step === 3 ? 'Personalize Note' : 'Review & Confirm'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EADFCF]/50 text-[#4E3F3A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#FFF5F2] px-6 py-3 border-b border-[#EADFCF]/60 flex items-center justify-between text-xs font-semibold text-[#4E3F3A]">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#4E3F3A] text-white' : 'bg-[#EADFCF]'}`}>1</span>
            <span className="hidden sm:inline">Base Box</span>
          </div>
          <span className="text-[#EADFCF]">➔</span>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#4E3F3A] text-white' : 'bg-[#EADFCF]'}`}>2</span>
            <span className="hidden sm:inline">Artisan Items</span>
          </div>
          <span className="text-[#EADFCF]">➔</span>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#4E3F3A] text-white' : 'bg-[#EADFCF]'}`}>3</span>
            <span className="hidden sm:inline">Handwritten Note</span>
          </div>
          <span className="text-[#EADFCF]">➔</span>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-[#4E3F3A] text-white' : 'bg-[#EADFCF]'}`}>4</span>
            <span className="hidden sm:inline">Review & Order</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* STEP 1: Select Box */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4E3F3A]">
                    Select Your Keepsake Base Box
                  </h3>
                  <p className="text-xs text-[#4E3F3A]/70">
                    The box sets the aesthetic foundation for your gift hamper.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BUILDER_BOXES.map((box) => {
                  const isSelected = customState.box?.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setCustomState({ ...customState, box })}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'border-[#4E3F3A] bg-white shadow-md ring-2 ring-[#F6C9D0]'
                          : 'border-[#EADFCF] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <img
                        src={box.image}
                        alt={box.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-bold text-sm text-[#4E3F3A]">
                              {box.name}
                            </h4>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#4E3F3A] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-[#4E3F3A]/70 line-clamp-2 mt-1">
                            {box.description}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-[#4E3F3A] mt-2">
                          ₹{box.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Items */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#4E3F3A]">
                  Add Handcrafted Products to Your Box
                </h3>
                <p className="text-xs text-[#4E3F3A]/70">
                  Select treats, candles, brassware, and tea blends. You have chosen {customState.items.length} items.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUILDER_ADDONS.map((item) => {
                  const isSelected = customState.items.some((i) => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemSelection(item)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-3 ${
                        isSelected
                          ? 'border-[#4E3F3A] bg-white shadow-sm ring-1 ring-[#F6C9D0]'
                          : 'border-[#EADFCF] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-[#D9B66F]">
                              {item.category}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                isSelected
                                  ? 'bg-[#4E3F3A] text-white'
                                  : 'border border-[#EADFCF] text-[#4E3F3A]/40'
                              }`}
                            >
                              {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </div>
                          </div>
                          <h4 className="font-serif font-bold text-xs text-[#4E3F3A] line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#4E3F3A]/70 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#4E3F3A] mt-1">
                          +₹{item.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Personal Note */}
          {step === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#4E3F3A]">
                  Personalize Your Message Card
                </h3>
                <p className="text-xs text-[#4E3F3A]/70">
                  Our team calligraphs your exact words onto gold-trimmed handmade cardstock.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EADFCF] shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                    Occasion / Event
                  </label>
                  <select
                    value={customState.occasion}
                    onChange={(e) =>
                      setCustomState({ ...customState, occasion: e.target.value as OccasionType })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs font-medium text-[#4E3F3A]"
                  >
                    {['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Housewarming', 'Festivals', 'Corporate', 'Farewell'].map(
                      (o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                    Recipient’s Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya & Dev"
                    value={customState.recipientName}
                    onChange={(e) => setCustomState({ ...customState, recipientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs font-medium text-[#4E3F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                    Your Personalized Message (Handwritten by Calligrapher)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your heartfelt wish here..."
                    value={customState.personalNote}
                    onChange={(e) => setCustomState({ ...customState, personalNote: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs font-medium text-[#4E3F3A]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Order */}
          {step === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Preview Card */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#EADFCF] space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#EADFCF]/60">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#D9B66F]">
                      Bespoke Summary
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#4E3F3A]">
                      {customState.occasion} Hamper for {customState.recipientName || 'Someone Special'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-[#F6C9D0]/50 rounded-full text-xs font-bold text-[#4E3F3A]">
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Base Box Selected */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#4E3F3A]/70 font-medium">Base Packaging:</span>
                  <span className="font-bold text-[#4E3F3A]">{customState.box?.name} (₹{customState.box?.price})</span>
                </div>

                {/* Selected Items */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#4E3F3A] block">Selected Items ({customState.items.length}):</span>
                  {customState.items.length === 0 ? (
                    <p className="text-xs text-red-500 italic">No items selected yet! Please go back to step 2.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {customState.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs bg-[#FFF9F6] p-2.5 rounded-xl border border-[#EADFCF]">
                          <span className="font-medium text-[#4E3F3A]">{item.name}</span>
                          <span className="font-bold text-[#4E3F3A]">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Handwritten Note Preview */}
                <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#EADFCF] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B66F]">
                    ✍️ Card Note Preview
                  </span>
                  <p className="font-serif italic text-xs text-[#4E3F3A]">
                    "{customState.personalNote}"
                  </p>
                </div>
              </div>

              {/* Order Actions */}
              <div className="lg:col-span-5 bg-[#FFF5F2] p-6 rounded-3xl border border-[#EADFCF] space-y-6">
                <h4 className="font-serif text-lg font-bold text-[#4E3F3A]">
                  Order Options
                </h4>

                <div className="space-y-3">
                  <button
                    onClick={() => handleFinishCustomization('cart')}
                    className="w-full py-4 rounded-full bg-[#4E3F3A] text-white font-bold text-sm shadow-md hover:bg-[#382d2a] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Custom Hamper to Cart</span>
                  </button>

                  <button
                    onClick={() => handleFinishCustomization('whatsapp')}
                    className="w-full py-4 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order Directly on WhatsApp</span>
                  </button>
                </div>

                <div className="p-3 bg-white/80 rounded-2xl border border-[#EADFCF] flex items-start gap-2.5 text-[11px] text-[#4E3F3A]/80">
                  <Info className="w-4 h-4 text-[#D9B66F] shrink-0 mt-0.5" />
                  <span>
                    Dispatches within 24 hours. Includes free gift card & handmade velvet ribbon wrapping.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-white border-t border-[#EADFCF] flex items-center justify-between sticky bottom-0 z-20">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 rounded-full border border-[#EADFCF] text-xs font-semibold text-[#4E3F3A] hover:bg-[#FFF9F6] flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-[#4E3F3A]/60 block">Total Price:</span>
              <span className="text-lg font-bold text-[#4E3F3A]">
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as any)}
                className="px-6 py-2.5 rounded-full bg-[#4E3F3A] text-white font-semibold text-xs shadow-xs hover:bg-[#382d2a] flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
