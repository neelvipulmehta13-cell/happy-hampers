import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/911234567890?text=Hi%20Happy%20Hampers%2C%20I'd%20like%20to%20know%20more%20about%20your%20hampers."
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      className="focus-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#3FA24A] text-white shadow-soft"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FA24A] opacity-30" />
      <MessageCircle size={26} className="relative" />
    </motion.a>
  )
}
