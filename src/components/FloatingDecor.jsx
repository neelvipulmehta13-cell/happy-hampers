import { motion } from 'framer-motion'
import { GiftBoxMotif, RibbonMotif, FlowerMotif, LeafMotif, ButterflyMotif } from './Motifs'

const confettiColors = ['#F6C9D0', '#FAD8C5', '#C8D8C4', '#D9B66F', '#EADFCF']

/**
 * Ambient, pointer-events-none decoration layer.
 * `variant` controls which motifs appear so each section feels
 * related but not identical to the others.
 */
export default function FloatingDecor({ variant = 'hero', className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {variant === 'hero' && (
        <>
          <motion.div
            className="absolute left-[6%] top-[18%] w-16 md:w-24"
            animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GiftBoxMotif className="w-full drop-shadow-xl" />
          </motion.div>

          <motion.div
            className="absolute right-[10%] top-[10%] w-14 md:w-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <RibbonMotif className="w-full" />
          </motion.div>

          <motion.div
            className="absolute left-[16%] bottom-[16%] w-12 md:w-16"
            animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <FlowerMotif className="w-full" />
          </motion.div>

          <motion.div
            className="absolute right-[20%] bottom-[24%] w-10 md:w-14"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <LeafMotif className="w-full" />
          </motion.div>

          <motion.div
            className="absolute left-[42%] top-[8%] w-10 md:w-12"
            animate={{ y: [0, -12, 0], x: [0, 10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <ButterflyMotif className="w-full" />
          </motion.div>

          {/* soft particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 9 + 5) % 95}%`,
                top: `${(i * 17 + 10) % 90}%`,
                width: 6 + (i % 3) * 3,
                height: 6 + (i % 3) * 3,
                background: confettiColors[i % confettiColors.length],
                opacity: 0.55,
              }}
              animate={{ y: [0, -16, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}
        </>
      )}

      {variant === 'confetti' && (
        <>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-sm"
              style={{
                left: `${(i * 6.2) % 100}%`,
                top: `${(i * 11) % 100}%`,
                width: 8,
                height: 8,
                background: confettiColors[i % confettiColors.length],
                opacity: 0.4,
              }}
              animate={{ rotate: [0, 180, 360], y: [0, -12, 0] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
            />
          ))}
        </>
      )}

      {variant === 'garden' && (
        <>
          <motion.div
            className="absolute left-[4%] top-[20%] w-14"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FlowerMotif className="w-full" />
          </motion.div>
          <motion.div
            className="absolute right-[6%] bottom-[10%] w-16"
            animate={{ y: [0, -18, 0], x: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <LeafMotif className="w-full" />
          </motion.div>
          <motion.div
            className="absolute right-[30%] top-[8%] w-10"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ButterflyMotif className="w-full" />
          </motion.div>
        </>
      )}
    </div>
  )
}

export function BlurBlob({ className = '', color = '#F6C9D0' }) {
  return (
    <div
      className={`bg-blob animate-blob absolute ${className}`}
      style={{ background: color }}
    />
  )
}
