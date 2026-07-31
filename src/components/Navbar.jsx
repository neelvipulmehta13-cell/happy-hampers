import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gift } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Customize', href: '#customize' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled ? 'shadow-card' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#home')
          }}
          className="focus-ring flex items-center gap-2 font-display text-xl font-semibold text-brown md:text-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-brown md:h-10 md:w-10">
            <Gift size={18} />
          </span>
          Happy Hampers
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.href)
                }}
                className="focus-ring relative font-body text-sm font-medium text-brown/80 transition-colors hover:text-gold-dark after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNav('#shop')}
          className="focus-ring hidden rounded-full bg-brown px-5 py-2.5 font-body text-sm font-medium text-ivory shadow-card transition-transform hover:scale-105 md:inline-block"
        >
          Explore Hampers
        </button>

        <button
          className="focus-ring text-brown md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-brown/10 bg-ivory/95 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNav(link.href)
                    }}
                    className="focus-ring block rounded-xl px-3 py-3 font-body text-brown/80 transition-colors hover:bg-blush-light hover:text-brown"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('#shop')}
                  className="focus-ring mt-1 w-full rounded-full bg-brown px-5 py-3 text-center font-body text-sm font-medium text-ivory"
                >
                  Explore Hampers
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
