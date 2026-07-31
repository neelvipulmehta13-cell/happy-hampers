import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import RevealOnScroll from './RevealOnScroll'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-sage-light/40 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Words from people we've packed for
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.id} delay={i * 0.08}>
              <motion.figure
                whileHover={{ y: -8 }}
                className="card-paper flex h-full flex-col rounded-4xl p-6 shadow-card"
              >
                <Quote size={22} className="text-gold-dark" />
                <blockquote className="mt-3 flex-1 font-body text-sm leading-relaxed text-brown/75">
                  “{t.quote}”
                </blockquote>
                <div className="mt-5 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s < t.rating ? 'fill-gold text-gold' : 'text-brown/20'}
                    />
                  ))}
                </div>
                <figcaption className="mt-3 font-body text-xs text-brown/60">
                  <span className="font-medium text-brown">{t.name}</span> · {t.city} · {t.occasion}
                </figcaption>
              </motion.figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
