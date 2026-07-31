// Small, hand-drawn-feeling SVG motifs used for floating decoration.
// Kept intentionally simple/illustrative rather than photographic —
// this is what lets the site feel "handmade" instead of stock-photo generic.

export function GiftBoxMotif({ className = '', color = '#F6C9D0' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect x="18" y="42" width="64" height="46" rx="4" fill={color} />
      <rect x="18" y="30" width="64" height="16" rx="3" fill="#D9B66F" />
      <rect x="44" y="30" width="12" height="58" fill="#D9B66F" />
      <path
        d="M50 30c-8-16-28-16-26-2 2 10 16 6 26 2z"
        fill="#C8D8C4"
      />
      <path
        d="M50 30c8-16 28-16 26-2 -2 10-16 6-26 2z"
        fill="#C8D8C4"
      />
    </svg>
  )
}

export function RibbonMotif({ className = '', color = '#D9B66F' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M50 10c-18 8-18 26 0 40 18-14 18-32 0-40z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M22 34c10 18 30 20 28 40-16-4-34-18-28-40z"
        fill={color}
        opacity="0.6"
      />
      <path
        d="M78 34c-10 18-30 20-28 40 16-4 34-18 28-40z"
        fill={color}
        opacity="0.6"
      />
    </svg>
  )
}

export function FlowerMotif({ className = '', color = '#F6C9D0' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="30"
          rx="10"
          ry="18"
          fill={color}
          opacity="0.85"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="#D9B66F" />
    </svg>
  )
}

export function LeafMotif({ className = '', color = '#C8D8C4' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M20 80C20 40 55 15 85 15c0 35-25 65-65 65z"
        fill={color}
      />
      <path d="M28 76C42 55 60 38 82 20" stroke="#8FA989" strokeWidth="2" opacity="0.6" />
    </svg>
  )
}

export function ButterflyMotif({ className = '', color = '#EDA5AF' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M48 50c-10-24-38-28-38-8 0 16 24 16 38 8z" fill={color} opacity="0.9" />
      <path d="M52 50c10-24 38-28 38-8 0 16-24 16-38 8z" fill={color} opacity="0.9" />
      <path d="M48 58c-8 18-30 20-30 4 0-12 18-12 30-4z" fill="#D9B66F" opacity="0.8" />
      <path d="M52 58c8 18 30 20 30 4 0-12-18-12-30-4z" fill="#D9B66F" opacity="0.8" />
      <rect x="48" y="42" width="4" height="26" rx="2" fill="#4E3F3A" opacity="0.7" />
    </svg>
  )
}
