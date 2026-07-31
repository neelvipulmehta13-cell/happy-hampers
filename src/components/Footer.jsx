import { useState } from 'react'
import { Gift, Instagram, Facebook, Youtube, Send, Check } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Customize', href: '#customize' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
]

const policies = [
  { label: 'Shipping Policy', href: '#' },
  { label: 'Returns & Refunds', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative bg-brown text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-brown">
                <Gift size={18} />
              </span>
              Happy Hampers
            </a>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory/65">
              Thoughtfully handcrafted gifts, packed by hand across India — for birthdays,
              weddings, festivals and everything worth celebrating.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-gold"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-gold"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-gold"
              >
                <Youtube size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold">Quick Links</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="focus-ring font-body text-sm text-ivory/70 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold">Policies</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {policies.map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="focus-ring font-body text-sm text-ivory/70 transition-colors hover:text-gold-light">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold">Newsletter</h4>
            <p className="mt-4 font-body text-sm text-ivory/65">
              New drops, festive edits and gifting ideas — once or twice a month.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="focus-ring w-full rounded-full bg-ivory/10 px-4 py-2.5 font-body text-sm text-ivory placeholder:text-ivory/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="focus-ring flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold text-brown transition-transform hover:scale-105"
              >
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 font-body text-xs text-gold-light">Thanks — you're on the list!</p>
            )}
          </div>
        </div>

        <div className="thread-divider my-10 opacity-30" />

        <p className="text-center font-body text-xs text-ivory/50">
          © {new Date().getFullYear()} Happy Hampers. Handmade with care, all across India.
        </p>
      </div>
    </footer>
  )
}
