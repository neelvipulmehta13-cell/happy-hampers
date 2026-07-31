import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedHampers from './components/FeaturedHampers'
import ShopByOccasion from './components/ShopByOccasion'
import WhyChooseUs from './components/WhyChooseUs'
import PersonalizationProcess from './components/PersonalizationProcess'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import InstagramFeed from './components/InstagramFeed'
import FAQ from './components/FAQ'
import Customize from './components/Customize'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { GiftBoxMotif } from './components/Motifs'

function PageLoader() {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-16"
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiftBoxMotif className="w-full" />
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <PageLoader />}</AnimatePresence>

      <div className="relative min-h-screen bg-ivory">
        <Navbar />
        <main>
          <Hero />
          <FeaturedHampers />
          <ShopByOccasion />
          <WhyChooseUs />
          <PersonalizationProcess />
          <Customize />
          <Testimonials />
          <Gallery />
          <InstagramFeed />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
