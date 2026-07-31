import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import FloatingDecor, { BlurBlob } from './FloatingDecor'
import { GiftBoxMotif, RibbonMotif, LeafMotif } from './Motifs'

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 15 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 15 })
  const translateX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 15 })
  const translateY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <BlurBlob className="left-[-10%] top-[10%] h-72 w-72 bg-blush" />
      <BlurBlob className="right-[-8%] top-[35%] h-80 w-80 bg-peach" />
      <BlurBlob className="left-[20%] bottom-[-10%] h-64 w-64 bg-sage" />

      <FloatingDecor variant="hero" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 font-body text-xs font-medium tracking-wide text-brown/70 shadow-sm">
            <Sparkles size={14} className="text-gold-dark" />
            Handmade in small batches, across India
          </span>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-brown sm:text-5xl lg:text-6xl">
            Thoughtfully handcrafted gifts,{' '}
            <span className="italic text-gold-dark">for every celebration</span>
          </h1>

          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-brown/70 md:text-lg">
            Every Happy Hampers box is packed by hand — real dried flowers, hand-lettered
            notes, and materials chosen the way you'd choose them for someone you love.
            No conveyor belts, no generic gift baskets.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollTo('#shop')}
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-brown px-7 py-3.5 font-body text-sm font-medium text-ivory shadow-soft transition-transform duration-300 hover:scale-105"
            >
              Explore Hampers
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#customize')}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/70 bg-transparent px-7 py-3.5 font-body text-sm font-medium text-brown transition-all duration-300 hover:scale-105 hover:bg-gold/10"
            >
              Customize Your Hamper
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 font-body text-xs text-brown/60">
            <span>4,800+ hampers delivered</span>
            <span className="h-1 w-1 rounded-full bg-brown/30" />
            <span>100% handmade</span>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center [perspective:1000px] md:h-[520px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative flex h-full w-full items-center justify-center rounded-4xl bg-gradient-to-br from-blush-light via-peach-light to-beige shadow-soft"
          >
            <motion.div
              className="w-40 md:w-52"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GiftBoxMotif className="w-full drop-shadow-2xl" color="#FFF9F6" />
            </motion.div>

            <motion.div
              className="absolute -top-6 right-8 w-16 md:w-20"
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RibbonMotif className="w-full" />
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 w-14"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <LeafMotif className="w-full" />
            </motion.div>

            <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
