import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { hampers } from '../data/hampers'
import { GiftBoxMotif } from './Motifs'
import RevealOnScroll from './RevealOnScroll'

const accentBg = {
  gold: 'from-gold-light/60 to-beige',
  sage: 'from-sage-light to-sage/40',
  blush: 'from-blush-light to-blush/40',
  peach: 'from-peach-light to-peach/50',
  beige: 'from-beige to-beige-dark/40',
}

function HamperCard({ hamper, index }) {
  return (
    <RevealOnScroll delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="card-paper group flex h-full flex-col overflow-hidden rounded-4xl shadow-card"
      >
        <div
          className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${accentBg[hamper.accent]}`}
        >
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 font-body text-xs font-medium text-brown shadow-sm">
            {hamper.occasion}
          </span>
          <motion.div
            className="w-24"
            whileHover={{ scale: 1.12, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            <GiftBoxMotif className="w-full drop-shadow-xl" color="#FFFDFB" />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-brown">{hamper.name}</h3>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-brown/65">
            {hamper.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-brown">
              ₹{hamper.price.toLocaleString('en-IN')}
            </span>
            <button className="focus-ring inline-flex items-center gap-1 rounded-full border border-brown/15 px-4 py-2 font-body text-xs font-medium text-brown transition-colors hover:border-gold hover:bg-gold/10">
              View Details
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </motion.article>
    </RevealOnScroll>
  )
}

export default function FeaturedHampers() {
  return (
    <section id="shop" className="relative mx-auto max-w-7xl px-6 py-24 md:px-8">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Featured Hampers
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
          Made to be opened slowly
        </h2>
        <p className="mt-4 font-body text-brown/65">
          A small, rotating edit of our most-loved hampers — each one hand-assembled to order.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hampers.map((hamper, i) => (
          <HamperCard key={hamper.id} hamper={hamper} index={i} />
        ))}
      </div>
    </section>
  )
}
