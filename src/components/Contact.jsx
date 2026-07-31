import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import RevealOnScroll from './RevealOnScroll'

const contactItems = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 12345 67890',
    href: 'https://wa.me/911234567890',
    bg: 'bg-[#3FA24A]/10 text-[#3FA24A]',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@happyhampers.in',
    href: 'https://instagram.com',
    bg: 'bg-blush-light text-brown',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@happyhampers.in',
    href: 'mailto:hello@happyhampers.in',
    bg: 'bg-sage-light text-brown',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 12345 67890',
    href: 'tel:+911234567890',
    bg: 'bg-gold-light text-brown',
  },
]

export default function Contact() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-8">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Get in Touch
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
          Let's plan your gift
        </h2>
        <p className="mt-4 font-body text-brown/65">
          Reach out on WhatsApp for the fastest reply, or drop by our studio.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <RevealOnScroll className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              className="focus-ring card-paper flex items-center gap-4 rounded-3xl p-5 shadow-card"
            >
              <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${item.bg}`}>
                <item.icon size={20} />
              </span>
              <div>
                <p className="font-body text-xs text-brown/55">{item.label}</p>
                <p className="font-body text-sm font-medium text-brown">{item.value}</p>
              </div>
            </motion.a>
          ))}

          <div className="card-paper flex items-center gap-4 rounded-3xl p-5 shadow-card sm:col-span-2">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-beige text-brown">
              <MapPin size={20} />
            </span>
            <div>
              <p className="font-body text-xs text-brown/55">Studio</p>
              <p className="font-body text-sm font-medium text-brown">
                12 Marigold Lane, Bandra West, Mumbai, Maharashtra 400050
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="overflow-hidden rounded-4xl shadow-card">
          <iframe
            title="Happy Hampers studio location"
            src="https://www.google.com/maps?q=Bandra%20West%2C%20Mumbai&output=embed"
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </section>
  )
}
