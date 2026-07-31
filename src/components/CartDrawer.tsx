import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Tag,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOpenDirectCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenDirectCheckout,
}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.hamper.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'HAPPY10') {
      setAppliedDiscount(10);
      setCouponMessage('🎉 10% Festive Discount Applied!');
    } else {
      setCouponMessage('❌ Invalid Code. Try "HAPPY10"');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.hamper.name}* x${item.quantity} - ₹${(
            item.hamper.price * item.quantity
          ).toLocaleString('en-IN')}${
            item.customNote ? `\n   Note: "${item.customNote}"` : ''
          }`
      )
      .join('\n');

    const text = encodeURIComponent(
      `Hello The Happy Hampers! I want to place an order from your website:\n\n` +
        `📦 *ORDER SUMMARY:*\n${itemsText}\n\n` +
        `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n` +
        (discountAmount > 0
          ? `Discount (HAPPY10): -₹${discountAmount.toLocaleString('en-IN')}\n`
          : '') +
        `💰 *Grand Total: ₹${grandTotal.toLocaleString('en-IN')}*\n\n` +
        `Please confirm payment options and dispatch details!`
    );

    window.open(`https://wa.me/918999492692?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-[#FFF9F6] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#EADFCF]"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-white border-b border-[#EADFCF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4E3F3A]" />
            <h3 className="font-serif text-lg font-bold text-[#4E3F3A]">
              Your Gift Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EADFCF]/50 text-[#4E3F3A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F6C9D0]/40 text-[#4E3F3A] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4E3F3A]">
                Your Bag is Empty
              </h4>
              <p className="text-xs text-[#4E3F3A]/60 max-w-xs mx-auto">
                Explore our handcrafted hampers or build your own custom gift box!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#4E3F3A] text-white font-semibold text-xs shadow-xs hover:bg-[#382d2a]"
              >
                Explore Hampers
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3.5 rounded-2xl border border-[#EADFCF] flex gap-3 shadow-xs relative"
                >
                  <img
                    src={item.hamper.image}
                    alt={item.hamper.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-xs text-[#4E3F3A] line-clamp-1">
                          {item.hamper.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[#4E3F3A]/40 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-[#4E3F3A]/60">
                        ₹{item.hamper.price.toLocaleString('en-IN')} each
                      </p>
                      {item.customNote && (
                        <p className="text-[10px] italic text-[#D9B66F] line-clamp-1 mt-0.5">
                          Note: "{item.customNote}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EADFCF] rounded-full px-2 py-0.5 bg-[#FFF9F6]">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="text-xs font-bold text-[#4E3F3A] px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="text-xs font-bold text-[#4E3F3A] px-1"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-[#4E3F3A]">
                        ₹{(item.hamper.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EADFCF] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#4E3F3A]/50" />
                  <input
                    type="text"
                    placeholder="Promo Code (Try HAPPY10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-full border border-[#EADFCF] bg-[#FFF9F6] text-xs uppercase font-medium text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#4E3F3A] text-white text-xs font-semibold hover:bg-[#382d2a]"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="text-[10px] font-semibold text-[#4E3F3A]">{couponMessage}</p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#4E3F3A]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>Festive Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Estimated Express Shipping</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-[#EADFCF]">
                <span>Total Amount</span>
                <span className="text-[#4E3F3A]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="space-y-2">
              <button
                onClick={onOpenDirectCheckout}
                className="w-full py-3.5 rounded-full bg-[#3D2E2A] hover:bg-[#2A1E1C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#CDA452]" />
                <span>Book Directly on Website</span>
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Or Express Checkout via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
