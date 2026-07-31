import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { categories } from '../data/categories'
import RevealOnScroll from './RevealOnScroll'

export default function ShopByOccasion() {
  return (
    <section className="relative bg-beige/40 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Shop by Occasion
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
            A hamper for every reason to celebrate
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = Icons[cat.icon] || Icons.Gift
            return (
              <RevealOnScroll key={cat.id} delay={i * 0.05}>
                <motion.button
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="focus-ring card-paper group flex w-full flex-col items-center gap-3 rounded-4xl px-5 py-8 text-center shadow-card"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush-light text-brown transition-colors group-hover:bg-gold-light">
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-base font-semibold text-brown">
                    {cat.label}
                  </span>
                  <span className="font-body text-xs text-brown/55">{cat.note}</span>
                </motion.button>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
