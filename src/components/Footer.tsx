import React, { useState } from 'react';
import { Gift, Instagram, Facebook, Twitter, Mail, Heart, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#4E3F3A] text-white pt-16 pb-12 border-t border-[#382d2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E8A5B0] text-[#3D2E2A] flex items-center justify-center font-bold shadow-inner">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                The Happy<span className="text-[#CDA452] font-normal"> Hampers</span>
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              The Happy Hampers is a Pune-based artisanal gifting studio creating handcrafted hampers, royal wedding trunks, and bespoke corporate tokens filled with authentic Indian brassware and organic delights.
            </p>
            <p className="text-[11px] text-[#CDA452] font-medium leading-tight">
              📍 589 Rasta Peth, Pune 411011<br />
              📞 +91 89994 92692 | ✉️ thehappyhampersofficial@gmail.com
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/thehappyhampers_?igsh=bTZnZHUwb3dobTE5"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#E8A5B0] hover:text-[#3D2E2A] text-white transition-colors flex items-center gap-1.5 px-4 text-xs font-bold"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span>@thehappyhampers_</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D9B66F] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Shop Hampers</a></li>
              <li><a href="#occasions" className="hover:text-white transition-colors">By Occasion</a></li>
              <li><a href="#customize" className="hover:text-white transition-colors">Custom Builder</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gifting Gallery</a></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D9B66F] uppercase tracking-wider">
              Policies
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
              <li><a href="#corporate" className="hover:text-white transition-colors">Corporate Gifting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D9B66F] uppercase tracking-wider">
              Join Our Gifting Circle
            </h4>
            <p className="text-xs text-white/70">
              Subscribe to receive exclusive festive discounts, early access to new hampers, and seasonal gifting inspiration.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing! Welcome to Happy Hampers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D9B66F]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#D9B66F] text-[#4E3F3A] font-bold text-xs hover:bg-[#cba45b] transition-all flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4 text-center sm:text-left">
          <p>© 2026 Happy Hampers. Thoughtfully Handcrafted in India. All rights reserved.</p>
          <div className="flex items-center gap-1 text-white/80">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>for life’s special celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
