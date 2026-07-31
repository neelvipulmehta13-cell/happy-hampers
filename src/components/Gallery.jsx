import { motion } from 'framer-motion'
import { galleryItems } from '../data/gallery'
import { FlowerMotif, LeafMotif, RibbonMotif } from './Motifs'
import RevealOnScroll from './RevealOnScroll'

const toneClasses = {
  blush: 'from-blush-light to-blush/50',
  gold: 'from-gold-light to-gold/40',
  sage: 'from-sage-light to-sage/50',
  peach: 'from-peach-light to-peach/50',
  beige: 'from-beige to-beige-dark/50',
}

const heights = ['h-52', 'h-64', 'h-72', 'h-60']

export default function Gallery() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-8">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Gallery
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
          A closer look at the details
        </h2>
        <p className="mt-4 font-body text-brown/65">
          Swap these tiles for your own product photography — the layout adapts automatically.
        </p>
      </RevealOnScroll>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {galleryItems.map((item, i) => (
          <RevealOnScroll key={item.id} delay={i * 0.05} className="mb-5 break-inside-avoid">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className={`group relative overflow-hidden rounded-4xl bg-gradient-to-br shadow-card ${
                toneClasses[item.tone]
              } ${heights[i % heights.length]}`}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-80"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.4 }}
              >
                {i % 3 === 0 && <FlowerMotif className="w-16" />}
                {i % 3 === 1 && <LeafMotif className="w-16" />}
                {i % 3 === 2 && <RibbonMotif className="w-16" />}
              </motion.div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brown/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-body text-sm font-medium text-ivory">{item.caption}</p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
