import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import RevealOnScroll from './RevealOnScroll'
import { categories } from '../data/categories'
import FloatingDecor, { BlurBlob } from './FloatingDecor'

const addOns = [
  { id: 'dry-fruits', label: 'Hand-roasted dry fruits' },
  { id: 'candles', label: 'Hand-poured candles' },
  { id: 'note', label: 'Hand-lettered note card' },
  { id: 'flowers', label: 'Dried flower topper' },
  { id: 'chocolates', label: 'Small-batch chocolates' },
  { id: 'wrap', label: 'Block-print gift wrap' },
]

// Replace with your real business WhatsApp number, digits only, country code first.
const WHATSAPP_NUMBER = '911234567890'

export default function Customize() {
  const [occasion, setOccasion] = useState(categories[0].label)
  const [selectedAddOns, setSelectedAddOns] = useState(['note'])
  const [note, setNote] = useState('')

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const buildMessage = () => {
    const chosen = addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .map((a) => a.label)
      .join(', ')
    const lines = [
      `Hi Happy Hampers! I'd like to build a custom hamper.`,
      `Occasion: ${occasion}`,
      chosen ? `Add-ons: ${chosen}` : null,
      note ? `Note to include: "${note}"` : null,
    ].filter(Boolean)
    return encodeURIComponent(lines.join('\n'))
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`

  return (
    <section id="customize" className="relative overflow-hidden py-24">
      <BlurBlob className="right-[-10%] top-[10%] h-72 w-72 bg-peach" />
      <BlurBlob className="left-[-8%] bottom-[0%] h-64 w-64 bg-sage" />
      <FloatingDecor variant="garden" />

      <div className="relative mx-auto max-w-3xl px-6 md:px-8">
        <RevealOnScroll className="text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Build Your Own
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Customize your hamper
          </h2>
          <p className="mt-4 font-body text-brown/65">
            Pick the occasion and add-ons, jot a note, and send it straight to us on WhatsApp —
            we'll confirm pricing and packing time within the hour.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="card-paper mt-12 rounded-4xl p-6 shadow-soft sm:p-10">
          <div>
            <h3 className="font-display text-lg font-semibold text-brown">1. Occasion</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setOccasion(cat.label)}
                  className={`focus-ring rounded-full px-4 py-2 font-body text-sm transition-colors ${
                    occasion === cat.label
                      ? 'bg-brown text-ivory'
                      : 'bg-beige/60 text-brown/70 hover:bg-blush-light'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold text-brown">2. Add-ons</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {addOns.map((addon) => {
                const active = selectedAddOns.includes(addon.id)
                return (
                  <motion.button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`focus-ring flex items-center gap-3 rounded-2xl border px-4 py-3 text-left font-body text-sm transition-colors ${
                      active
                        ? 'border-gold bg-gold-light/50 text-brown'
                        : 'border-brown/10 text-brown/70 hover:border-gold/50'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border ${
                        active ? 'border-gold bg-gold text-white' : 'border-brown/25'
                      }`}
                    >
                      {active && <Check size={12} />}
                    </span>
                    {addon.label}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold text-brown">3. Personal note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Happy anniversary — here's to many more!"
              className="focus-ring mt-4 w-full rounded-2xl border border-brown/15 bg-ivory px-4 py-3 font-body text-sm text-brown placeholder:text-brown/35"
            />
          </div>

          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="focus-ring mt-9 flex w-full items-center justify-center gap-2 rounded-full bg-[#3FA24A] px-6 py-4 font-body text-sm font-medium text-white shadow-soft transition-shadow hover:shadow-glow"
          >
            <MessageCircle size={18} />
            Send my hamper on WhatsApp
          </motion.a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
