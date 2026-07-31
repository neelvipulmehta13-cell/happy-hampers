import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { GiftBoxMotif, FlowerMotif, RibbonMotif, LeafMotif, ButterflyMotif } from './Motifs'
import RevealOnScroll from './RevealOnScroll'

const tiles = [
  { Motif: GiftBoxMotif, bg: 'from-blush-light to-blush/40' },
  { Motif: FlowerMotif, bg: 'from-peach-light to-peach/40' },
  { Motif: RibbonMotif, bg: 'from-gold-light to-gold/40' },
  { Motif: LeafMotif, bg: 'from-sage-light to-sage/40' },
  { Motif: ButterflyMotif, bg: 'from-beige to-beige-dark/40' },
  { Motif: GiftBoxMotif, bg: 'from-sage-light to-sage/40' },
]

export default function InstagramFeed() {
  return (
    <section className="relative bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blush to-gold text-white shadow-glow">
            <Instagram size={22} />
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brown sm:text-4xl">
            @happyhampers.in
          </h2>
          <p className="mt-3 font-body text-brown/65">
            Follow along for unboxings, behind-the-scenes packing and new drops.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {tiles.map((tile, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06 }}
                className={`focus-ring flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br shadow-card ${tile.bg}`}
              >
                <tile.Motif className="w-10" />
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
