import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Wedding Gifting',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);

    // Open WhatsApp prefilled message
    const waText = encodeURIComponent(
      `Hello The Happy Hampers! New website inquiry:\n\n` +
        `👤 Name: ${formData.name}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `✉️ Email: ${formData.email}\n` +
        `🎉 Occasion: ${formData.occasion}\n` +
        `💬 Message: ${formData.message}`
    );
    window.open(`https://wa.me/918999492692?text=${waText}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#FFF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#D9B66F] uppercase">
            Let’s Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E3F3A]">
            Get in Touch with Us
          </h2>
          <p className="text-[#4E3F3A]/70 text-sm sm:text-base">
            Have a custom wedding request, corporate inquiry, or need help choosing the perfect hamper? We’re just a message away!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Info & Quick Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#EADFCF] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#4E3F3A]">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918999492692"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#EADFCF] flex items-center gap-4 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                      Fastest Support
                    </span>
                    <span className="text-sm font-bold text-[#4E3F3A] group-hover:text-emerald-700">
                      WhatsApp: +91 89994 92692
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:thehappyhampersofficial@gmail.com"
                  className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#EADFCF] flex items-center gap-4 hover:border-[#D9B66F] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F6C9D0] text-[#4E3F3A] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#D9B66F] block">
                      Email Concierge
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#4E3F3A] group-hover:text-[#D9B66F] break-all">
                      thehappyhampersofficial@gmail.com
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+918999492692"
                  className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#EADFCF] flex items-center gap-4 hover:border-[#D9B66F] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAD8C5] text-[#4E3F3A] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#4E3F3A]/60 block">
                      Studio Helpline
                    </span>
                    <span className="text-sm font-bold text-[#4E3F3A]">
                      +91 89994 92692 (Mon-Sat, 10am-8pm)
                    </span>
                  </div>
                </a>

                {/* Studio Location */}
                <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#EADFCF] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C8D8C4] text-[#4E3F3A] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#4E3F3A]/60 block">
                      Flagship Gifting Studio
                    </span>
                    <span className="text-xs font-bold text-[#4E3F3A] leading-snug block">
                      The Happy Hampers Studio, 589 Rasta Peth, Pune 411011
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map for Pune */}
            <div className="rounded-3xl overflow-hidden border border-[#EADFCF] shadow-xs h-64 relative bg-[#FFF5F2]">
              <iframe
                title="The Happy Hampers Studio Location Map"
                src="https://maps.google.com/maps?q=589%20Rasta%20Peth%20Pune%20411011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#EADFCF] shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#4E3F3A] mb-2">
              Send Us a Bespoke Inquiry
            </h3>
            <p className="text-xs text-[#4E3F3A]/70 mb-6">
              Fill out the form below and our lead gifting curator will contact you within 2 hours.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-[#FFF5F2] rounded-2xl border border-[#C8D8C4] text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-xl text-[#4E3F3A]">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-xs text-[#4E3F3A]/80 max-w-md mx-auto">
                  Your message has been dispatched directly to our WhatsApp Concierge. We will get back to you shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                      Gifting Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                    >
                      <option value="Wedding Gifting">Wedding Gifting (Bulk / Trunks)</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Festive / Diwali">Festive / Diwali Hampers</option>
                      <option value="Corporate Token">Corporate Bulk Gifting</option>
                      <option value="Baby Shower / Housewarming">Baby Shower / Housewarming</option>
                      <option value="Custom Requirement">Custom Requirement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E3F3A] mb-1">
                    Your Requirements / Special Instructions *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your budget, required hamper quantity, expected delivery date, or custom item preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#EADFCF] bg-[#FFF9F6] text-xs text-[#4E3F3A] focus:outline-none focus:border-[#D9B66F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#F6C9D0] to-[#FAD8C5] text-[#4E3F3A] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#EADFCF]"
                >
                  <Send className="w-4 h-4 text-[#D9B66F]" />
                  <span>Send Inquiry via WhatsApp Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
