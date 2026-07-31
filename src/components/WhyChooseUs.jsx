import { motion } from 'framer-motion'
import { Wand2, HandHeart, Package, Leaf, NotebookPen } from 'lucide-react'
import RevealOnScroll from './RevealOnScroll'

const features = [
  {
    icon: Wand2,
    title: 'Customizable Gifts',
    text: 'Swap items, colours and notes — every hamper starts as a template, not a fixed box.',
  },
  {
    icon: HandHeart,
    title: '100% Handmade',
    text: 'Packed and finished by hand in small batches, never on an assembly line.',
  },
  {
    icon: Package,
    title: 'Premium Packaging',
    text: 'Cane, cloth and hand-block-printed paper — packaging that is part of the gift.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Materials',
    text: 'Reusable baskets and recycled fillers in place of plastic and styrofoam.',
  },
  {
    icon: NotebookPen,
    title: 'Personalized Message Cards',
    text: 'Hand-lettered on request, so the words feel as considered as the gift.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 md:px-8">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Why Happy Hampers
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
          The details that don't scale — on purpose
        </h2>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((f, i) => (
          <RevealOnScroll key={f.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -6 }}
              className="card-paper flex h-full flex-col items-start gap-4 rounded-4xl p-6 shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-light text-brown">
                <f.icon size={22} strokeWidth={1.6} />
              </span>
              <h3 className="font-display text-lg font-semibold text-brown">{f.title}</h3>
              <p className="font-body text-sm leading-relaxed text-brown/65">{f.text}</p>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
