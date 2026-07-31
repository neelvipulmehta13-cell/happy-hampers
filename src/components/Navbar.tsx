import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  ShoppingBag,
  Sparkles,
  Search,
  Menu,
  X,
  PhoneCall,
  Heart,
  MessageCircle
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenCustomize: () => void;
  onOpenAdmin: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenCustomize,
  onOpenAdmin,
  onSearchChange,
  searchQuery
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop Hampers', href: '#shop' },
    { name: 'By Occasion', href: '#occasions' },
    { name: 'Customize', href: '#customize', action: onOpenCustomize },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E8A5B0] to-[#EBBCA3] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-300">
              <Gift className="w-5.5 h-5.5 text-[#3D2E2A]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3D2E2A] leading-none">
                The Happy<span className="text-[#CDA452] font-normal"> Hampers</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#3D2E2A]/70 uppercase font-bold mt-0.5">
                Artisanal Studio • Pune
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                }}
                className="text-xs font-semibold text-[#3D2E2A]/85 hover:text-[#3D2E2A] transition-colors relative group py-1 uppercase tracking-wider"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CDA452] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Owner Portal / Admin Toggle Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 bg-[#3D2E2A] hover:bg-[#2A1E1C] text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all border border-[#CDA452]/40"
              title="Studio Owner Portal: Add/Remove Products"
              id="owner-portal-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CDA452]" />
              <span className="hidden md:inline">Owner Portal</span>
              <span className="md:hidden">Owner</span>
            </button>

            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 sm:p-2.5 rounded-full hover:bg-[#DBCAC0]/40 text-[#3D2E2A] transition-colors relative focus:outline-none"
                aria-label="Search hampers"
                id="search-toggle-btn"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-72 sm:w-80 bg-white rounded-2xl p-3 shadow-xl border border-[#DBCAC0] z-50"
                  >
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-[#3D2E2A]/50" />
                      <input
                        type="text"
                        placeholder="Search Wedding, Diwali, Candle..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        autoFocus
                        className="w-full pl-9 pr-8 py-2 text-sm bg-[#FAF2ED] rounded-xl border border-[#DBCAC0] focus:outline-none focus:border-[#E8A5B0] text-[#3D2E2A]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => onSearchChange('')}
                          className="absolute right-2.5 top-2.5 text-xs text-[#3D2E2A]/50 hover:text-[#3D2E2A]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Customize CTA */}
            <button
              onClick={onOpenCustomize}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#E8A5B0] to-[#EBBCA3] hover:from-[#EBBCA3] hover:to-[#E8A5B0] text-[#3D2E2A] px-3.5 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all border border-[#DBCAC0]"
              id="nav-customize-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3D2E2A]" />
              <span>Customize</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-[#DBCAC0] hover:bg-[#FAF2ED] text-[#3D2E2A] transition-colors relative shadow-xs focus:outline-none"
              aria-label="View shopping cart"
              id="cart-drawer-toggle"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#3D2E2A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                >
                  {totalCartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#DBCAC0]/40 text-[#3D2E2A] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FFF9F6]/98 border-b border-[#EADFCF] shadow-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.action) {
                      e.preventDefault();
                      link.action();
                    }
                  }}
                  className="text-base font-medium text-[#4E3F3A] hover:text-[#D9B66F] py-2 border-b border-[#EADFCF]/40 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-[#4E3F3A]/40">➔</span>
                </a>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCustomize();
                }}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F6C9D0] to-[#FAD8C5] text-[#4E3F3A] py-3 rounded-xl font-semibold shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D9B66F]" />
                <span>Build Custom Hamper</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
