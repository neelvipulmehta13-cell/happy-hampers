import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/faqs'
import RevealOnScroll from './RevealOnScroll'

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="card-paper overflow-hidden rounded-3xl shadow-card">
      <button
        onClick={onClick}
        className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-brown sm:text-lg">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold-light text-brown"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 font-body text-sm leading-relaxed text-brown/65">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 md:px-8">
      <RevealOnScroll className="text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          FAQ
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
          Questions, answered
        </h2>
      </RevealOnScroll>

      <div className="mt-12 flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <RevealOnScroll key={faq.question} delay={i * 0.05}>
            <FAQItem
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
