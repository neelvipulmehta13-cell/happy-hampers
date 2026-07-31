import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedHampers } from './components/FeaturedHampers';
import { ShopByOccasion } from './components/ShopByOccasion';
import { CustomizeBuilder } from './components/CustomizeBuilder';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PersonalisationProcess } from './components/PersonalisationProcess';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { InstagramFeed } from './components/InstagramFeed';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HamperDetailModal } from './components/HamperDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { DirectCheckoutModal } from './components/DirectCheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminProductModal } from './components/AdminProductModal';

import { Hamper, OccasionType, CartItem, Order } from './types';
import { HAMPERS } from './data/hampers';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<OccasionType | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDirectCheckoutOpen, setIsDirectCheckoutOpen] = useState(false);
  const [directBookingHamper, setDirectBookingHamper] = useState<Hamper | null>(null);
  const [selectedDetailHamper, setSelectedDetailHamper] = useState<Hamper | null>(null);

  // Direct Website Orders State persisted in localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('the_happy_hampers_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('the_happy_hampers_orders', JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }, [orders]);

  // Store catalogue state with local persistence for website owner edits
  const [hampers, setHampers] = useState<Hamper[]>(() => {
    try {
      const saved = localStorage.getItem('the_happy_hampers_catalog');
      return saved ? JSON.parse(saved) : HAMPERS;
    } catch {
      return HAMPERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('the_happy_hampers_catalog', JSON.stringify(hampers));
    } catch {
      // Ignore storage errors
    }
  }, [hampers]);

  const handleAddHamper = (newHamper: Hamper) => {
    setHampers((prev) => [newHamper, ...prev]);
  };

  const handleRemoveHamper = (hamperId: string) => {
    setHampers((prev) => prev.filter((h) => h.id !== hamperId));
  };

  const handleUpdateHamperImage = (hamperId: string, newImage: string) => {
    setHampers((prev) =>
      prev.map((h) =>
        h.id === hamperId ? { ...h, image: newImage, galleryImages: [newImage, ...h.galleryImages] } : h
      )
    );
  };

  const handleResetCatalogue = () => {
    setHampers(HAMPERS);
  };

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('happy_hampers_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('happy_hampers_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage error
    }
  }, [cartItems]);

  const handleAddToCart = (itemToAdd: Hamper | CartItem) => {
    setCartItems((prev) => {
      if ('hamper' in itemToAdd) {
        // It's a CartItem (like custom hamper)
        return [...prev, itemToAdd];
      } else {
        // Standard Hamper
        const existingIdx = prev.findIndex((i) => i.hamper.id === itemToAdd.id && !i.customizationDetails);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx].quantity += 1;
          return updated;
        } else {
          return [...prev, { hamper: itemToAdd, quantity: 1 }];
        }
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOccasionSelectFromShop = (occ: OccasionType) => {
    setSelectedOccasionFilter(occ);
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDirectBookHamper = (hamper: Hamper) => {
    setDirectBookingHamper(hamper);
    setSelectedDetailHamper(null);
    setIsDirectCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart if booking was from cart
    if (!directBookingHamper) {
      setCartItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#4E3F3A] font-poppins selection:bg-[#F6C9D0] selection:text-[#4E3F3A] flex flex-col justify-between">
      {/* Sticky Glassmorphism Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('shop');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
        />

        {/* Featured Hampers Catalog */}
        <FeaturedHampers
          hampers={hampers}
          onSelectHamper={(h) => setSelectedDetailHamper(h)}
          onAddToCart={handleAddToCart}
          onDirectBookNow={handleDirectBookHamper}
          searchQuery={searchQuery}
          selectedOccasionFilter={selectedOccasionFilter}
          onFilterChange={setSelectedOccasionFilter}
        />

        {/* Shop By Occasion */}
        <ShopByOccasion onSelectOccasion={handleOccasionSelectFromShop} />

        {/* Why Choose Happy Hampers */}
        <WhyChooseUs />

        {/* Personalisation Process Timeline */}
        <PersonalisationProcess onOpenCustomize={() => setIsCustomizeOpen(true)} />

        {/* Testimonials */}
        <Testimonials />

        {/* Gallery */}
        <Gallery />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Contact & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Custom Hamper Builder Modal */}
      <CustomizeBuilder
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Hamper Quick View Detail Modal */}
      <HamperDetailModal
        hamper={selectedDetailHamper}
        onClose={() => setSelectedDetailHamper(null)}
        onAddToCart={handleAddToCart}
        onDirectBookNow={handleDirectBookHamper}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onOpenDirectCheckout={() => {
          setDirectBookingHamper(null);
          setIsCartOpen(false);
          setIsDirectCheckoutOpen(true);
        }}
      />

      {/* Direct Website Booking Modal */}
      <DirectCheckoutModal
        isOpen={isDirectCheckoutOpen}
        onClose={() => {
          setIsDirectCheckoutOpen(false);
          setDirectBookingHamper(null);
        }}
        bookingItems={cartItems}
        directHamper={directBookingHamper}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Studio Owner / Admin Product Management Modal */}
      <AdminProductModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        hampers={hampers}
        orders={orders}
        onAddHamper={handleAddHamper}
        onRemoveHamper={handleRemoveHamper}
        onUpdateHamperImage={handleUpdateHamperImage}
        onResetCatalogue={handleResetCatalogue}
      />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp />
    </div>
  );
}
