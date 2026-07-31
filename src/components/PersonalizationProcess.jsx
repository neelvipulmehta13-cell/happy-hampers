import { motion } from 'framer-motion'
import { ListTree, PackageSearch, PenLine, Ribbon, Truck } from 'lucide-react'
import RevealOnScroll from './RevealOnScroll'

const steps = [
  { icon: ListTree, title: 'Choose an occasion', text: 'Birthday, wedding, festival, farewell — tell us what you\'re celebrating.' },
  { icon: PackageSearch, title: 'Select products', text: 'Pick from curated items or start from an empty crate and build your own.' },
  { icon: PenLine, title: 'Add a personal note', text: 'Write it yourself or tell us what to say — we\'ll hand-letter it.' },
  { icon: Ribbon, title: 'Handmade packing', text: 'Every layer is placed and tied by hand, never machine-sealed.' },
  { icon: Truck, title: 'Delivered with love', text: 'Packed, boxed and on its way — tracked, right to their door.' },
]

// A single zig-zagging path that visually "ties together" all five
// steps, echoing the brand's ribbon motif. Drawn on scroll.
const ribbonPath =
  'M15 50 C85 90, 85 110, 85 150 C85 190, 15 210, 15 250 C15 290, 85 310, 85 350 C85 390, 15 410, 15 450'

export default function PersonalizationProcess() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-blush-light/30 to-ivory py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            How It's Made
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brown sm:text-4xl">
            The personalisation process
          </h2>
          <p className="mt-4 font-body text-brown/65">
            Five steps, tied together — literally — from your first choice to their doorstep.
          </p>
        </RevealOnScroll>

        <div className="relative mt-16">
          {/* Ribbon thread — desktop only */}
          <svg
            viewBox="0 0 100 500"
            preserveAspectRatio="none"
            className="absolute inset-0 hidden h-full w-full md:block"
            aria-hidden="true"
          >
            <motion.path
              d={ribbonPath}
              fill="none"
              stroke="#D9B66F"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </svg>

          <ol className="relative flex flex-col gap-10 md:gap-4">
            {steps.map((step, i) => {
              const alignRight = i % 2 === 1
              return (
                <RevealOnScroll
                  key={step.title}
                  as="li"
                  delay={i * 0.12}
                  className={`relative flex md:min-h-[100px] md:items-center ${
                    alignRight ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <div
                    className={`card-paper flex w-full items-start gap-4 rounded-4xl p-6 shadow-card md:w-[46%] ${
                      alignRight ? 'md:text-right md:flex-row-reverse' : ''
                    }`}
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold-light font-display text-lg font-semibold text-brown">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-brown">
                        {step.title}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-brown/65">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
