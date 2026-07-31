import { Hamper, OccasionCategory, FAQItem, Testimonial, GalleryItem } from '../types';

// High quality hampers imagery
const heroHamperImg = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1000';
const weddingHamperImg = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000';
const festiveHamperImg = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000';
const customBuilderImg = 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=1000';

export const HERO_HAMPER_IMAGE = heroHamperImg;
export const CUSTOM_BUILDER_IMAGE = customBuilderImg;

export const HAMPERS: Hamper[] = [
  {
    id: 'h-royal-wed',
    name: 'The Royal Shehnaai Trunk',
    tagline: 'Opulent wedding keepsakes crafted with gold foil & brass heirloom treasures',
    price: 4999,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 128,
    occasion: 'Wedding',
    image: weddingHamperImg,
    galleryImages: [
      weddingHamperImg,
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A grand velvet gift trunk curated specifically for Indian weddings and royal blessings. Includes handcrafted brass urli, artisanal saffron dry fruit sweets, and gold-embossed message card.',
    whatsInside: [
      'Hand-carved Brass Lotus Diya Urli',
      '250g Artisanal Saffron-Pistachio Stuffed Dates',
      'Handmade Mogra & Rose Soy Wax Candle',
      'Gold Foil Embossed Bride-Groom Blessing Card',
      'Organic Kashmir Lavender Bath Crystals',
      'Hand-loomed Pure Silk Ribbon & Velvet Trunk'
    ],
    isBestseller: true,
    isEcoFriendly: false,
    packagingType: 'Velvet Box'
  },
  {
    id: 'h-bandhan-diwali',
    name: 'Shubh Aagaman Festive Basket',
    tagline: 'Warm lights, handcrafted diyas & organic festive delights',
    price: 3299,
    originalPrice: 3899,
    rating: 4.8,
    reviewsCount: 94,
    occasion: 'Festivals',
    image: festiveHamperImg,
    galleryImages: [
      festiveHamperImg,
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Brimming with festive spirit, this handcrafted basket combines traditional brass work with organic edible delights to celebrate Diwali, Karwa Chauth, or Rakhi.',
    whatsInside: [
      '2 Hand-painted Terracotta Clay Diyas',
      'Polished Brass Meenakari Peacock Bowl',
      '200g Roasted Almonds in Rose Honey',
      'Cardamom & Chamomile Loose Leaf Infusion Tea',
      'Handmade Sandalwood Agarbatti Cones in Ceramic Holder',
      'Reusable Woven Bamboo Basket with Floral Bunch'
    ],
    isBestseller: true,
    isEcoFriendly: true,
    packagingType: 'Eco Jute Basket'
  },
  {
    id: 'h-gulab-bday',
    name: 'Gulab Khas Birthday Luxe',
    tagline: 'A fragrant celebration of rose petals, pampering scents & sweet moments',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 156,
    occasion: 'Birthday',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Delight someone special on their birthday with this romantic, rose-infused pampering hamper presented in our signature blush pink gift box.',
    whatsInside: [
      'Damask Rose & French Clay Handmade Soap',
      'Hand-poured Botanical Soy Candle with Dried Rose Buds',
      '150g Organic Rose Petal Gulkand Chocolate Truffles',
      'Personalized Calligraphy Birthday Wish Card',
      'Brass Bookmark with Silk Tassel',
      'Blush Pink Rigid Box with Satin Ribbon'
    ],
    isBestseller: true,
    isNew: true,
    packagingType: 'Handmade Floral Box'
  },
  {
    id: 'h-anand-anni',
    name: 'Prem Kahaani Anniversary Keepsake',
    tagline: 'Two hearts, timeless memory book & hand-poured candle romance',
    price: 3799,
    originalPrice: 4299,
    rating: 5.0,
    reviewsCount: 88,
    occasion: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Celebrate years of love with a pair of handcrafted brass mugs, a romantic photo journal, and artisan honeyed treats.',
    whatsInside: [
      'Pair of Hand-hammered Pure Copper/Brass Coffee Mugs',
      'Handcrafted Leatherette Memory & Photo Journal',
      'Vanilla & Wildflower Honey Soy Candle',
      '100g Handcrafted Dark Chocolate Barks with Freeze-dried Berries',
      'Customized "Together Forever" Framed Note',
      'Handmade Keepsake Box with Brass Clasp'
    ],
    isBestseller: false,
    packagingType: 'Wooden Trunk'
  },
  {
    id: 'h-khushiyan-baby',
    name: 'Nanhi Khushiyan Baby Blessing',
    tagline: 'Soft, eco-friendly organic cotton & silver keepsake for the newborn',
    price: 2999,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 64,
    occasion: 'Baby Shower',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Thoughtfully designed for new parents and baby shower celebrations using 100% GOTS certified organic materials and hand-carved neem wood toys.',
    whatsInside: [
      'Hand-knitted Baby Booties & Bonnet set',
      'Organic Cotton Baby Muslin Swaddle',
      'Hand-carved Wooden Teething Rattle',
      'Silver-plated Nazariya Anklet Charm',
      'Calm Chamomile Motherhood Tea Jar',
      'Pastel Sage Woven Basket'
    ],
    isEcoFriendly: true,
    packagingType: 'Eco Jute Basket'
  },
  {
    id: 'h-griha-house',
    name: 'Griha Pravesh Blessings Hamper',
    tagline: 'Welcome new beginnings with sacred brass, fragrant oils & sweet blessings',
    price: 4199,
    originalPrice: 4799,
    rating: 4.8,
    reviewsCount: 52,
    occasion: 'Housewarming',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'An auspicious welcome gift for housewarming ceremonies, filled with handcrafted home fragrance, sacred brass idols, and gourmet nuts.',
    whatsInside: [
      'Handcrafted Brass Ganesh Ji Idol with antique finish',
      'Terracotta Essential Oil Reed Diffuser (Sandalwood)',
      '200g Roasted Cashews in Kashmiri Saffron Salt',
      'Organic Brass Coaster set (Set of 4)',
      'Auspicious Toran / Door Hanging with Dried Marigold & Brass Beads',
      'Handmade Pinewood Treasure Box'
    ],
    packagingType: 'Wooden Trunk'
  },
  {
    id: 'h-corp-parampar',
    name: 'Parampara Executive Corporate Hamper',
    tagline: 'Refined corporate gifting with artisan stationery, dry fruits & brass desk decor',
    price: 1999,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 210,
    occasion: 'Corporate',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Impress corporate clients, team members, and business partners with bespoke packaging, handcrafted notebooks, and luxury dry fruit jars.',
    whatsInside: [
      'Handmade Recycled Cotton Paper Planner / Journal',
      'Hand-turned Sheesham Wood Brass Pen',
      '150g Organic Pistachios in Glass Cork Jar',
      '150g Dried Cranberries & Walnut Mix',
      'Customized Corporate Logo Foil Printing on sleeve',
      'Sophisticated Beige Kraft Box'
    ],
    isEcoFriendly: true,
    packagingType: 'Handmade Floral Box'
  },
  {
    id: 'h-yaadein-farewell',
    name: 'Yaadein Memories Farewell Box',
    tagline: 'Cherish memories with personalized memory jar, scented wax & gourmet tea',
    price: 2199,
    originalPrice: 2599,
    rating: 4.8,
    reviewsCount: 43,
    occasion: 'Farewell',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A heartwarming farewell token to bid farewell to colleagues, mentors, or friends heading to new horizons.',
    whatsInside: [
      'Handwritten Memory Message Jar with 25 Rolled Scrolls',
      'Kashmiri Kahwa Green Tea Blend in Brass Tin',
      'Hand-poured Lemongrass & Jasmine Soy Candle',
      'Brass Polaroid Photo Clip Holder',
      'Handcrafted Artisanal Cookie Box',
      'Warm Ivory Presentation Box'
    ],
    packagingType: 'Handmade Floral Box'
  }
];

export const OCCASIONS: OccasionCategory[] = [
  {
    id: 'Birthday',
    name: 'Birthday',
    iconName: 'Cake',
    subtitle: 'Vibrant boxes for smiles & sweet moments',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#F6C9D0] text-[#4E3F3A]',
    count: 24
  },
  {
    id: 'Wedding',
    name: 'Wedding',
    iconName: 'HeartHandshake',
    subtitle: 'Royal trunks for lifelong celebrations',
    image: weddingHamperImg,
    badgeColor: 'bg-[#D9B66F] text-[#4E3F3A]',
    count: 38
  },
  {
    id: 'Anniversary',
    name: 'Anniversary',
    iconName: 'Sparkles',
    subtitle: 'Romantic keepsakes for couple milestones',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#FAD8C5] text-[#4E3F3A]',
    count: 19
  },
  {
    id: 'Baby Shower',
    name: 'Baby Shower',
    iconName: 'Baby',
    subtitle: 'Gentle organic blessings for little ones',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#C8D8C4] text-[#4E3F3A]',
    count: 15
  },
  {
    id: 'Housewarming',
    name: 'Housewarming',
    iconName: 'Home',
    subtitle: 'Auspicious decor & fragrant beginnings',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#EADFCF] text-[#4E3F3A]',
    count: 18
  },
  {
    id: 'Festivals',
    name: 'Festivals',
    iconName: 'Flame',
    subtitle: 'Diwali, Rakhi & festive cheer',
    image: festiveHamperImg,
    badgeColor: 'bg-[#D9B66F] text-[#4E3F3A]',
    count: 42
  },
  {
    id: 'Corporate',
    name: 'Corporate',
    iconName: 'Briefcase',
    subtitle: 'Artisanal executive corporate tokens',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#C8D8C4] text-[#4E3F3A]',
    count: 30
  },
  {
    id: 'Farewell',
    name: 'Farewell',
    iconName: 'Gift',
    subtitle: 'Warm memories for new journeys',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-[#F6C9D0] text-[#4E3F3A]',
    count: 12
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    comment: 'Ordered 80 Royal Shehnaai Trunks for my sister’s wedding in Jaipur. The level of craftsmanship, handwritten note cards, and fragrant candles exceeded all expectations. Everyone kept asking where we bought them!',
    occasion: 'Wedding Gifting',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true,
    date: '2 weeks ago'
  },
  {
    id: 't-2',
    name: 'Rohan Verma',
    city: 'Bengaluru',
    rating: 5,
    comment: 'The custom hamper builder is incredible! I built a birthday hamper with custom tea blends and a brass bookmark for my mother. She was moved to tears by the personalized message card.',
    occasion: 'Birthday Gift',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true,
    date: '1 month ago'
  },
  {
    id: 't-3',
    name: 'Pooja Hegde',
    city: 'Delhi NCR',
    rating: 5,
    comment: 'Happy Hampers handled our corporate Diwali hampers for 150 employees. Eco-friendly packaging, on-time delivery, and unmatched Indian artisanal elegance.',
    occasion: 'Corporate Diwali',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    verified: true,
    date: '3 weeks ago'
  },
  {
    id: 't-4',
    name: 'Kavya & Siddharth',
    city: 'Pune',
    rating: 5,
    comment: 'We got our anniversary hamper delivered via WhatsApp support in under 24 hours in Pune! The velvet box and brass mugs were pristine.',
    occasion: '1st Anniversary',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    verified: true,
    date: '1 week ago'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Customized Royal Velvet Wedding Trunk Assembly',
    occasion: 'Wedding',
    image: weddingHamperImg,
    aspectRatio: 'tall',
    likes: 342
  },
  {
    id: 'g-2',
    title: 'Diwali Festive Urli & Handmade Soy Candles',
    occasion: 'Festivals',
    image: festiveHamperImg,
    aspectRatio: 'square',
    likes: 418
  },
  {
    id: 'g-3',
    title: 'Custom Hamper Assembly in Blush Pink Studio',
    occasion: 'Birthday',
    image: customBuilderImg,
    aspectRatio: 'wide',
    likes: 289
  },
  {
    id: 'g-4',
    title: 'Handcrafted Brass Diya & Organic Rose Tea',
    occasion: 'Housewarming',
    image: heroHamperImg,
    aspectRatio: 'tall',
    likes: 512
  },
  {
    id: 'g-5',
    title: 'Organic Cotton Baby Shower Gift Basket',
    occasion: 'Baby Shower',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    aspectRatio: 'square',
    likes: 195
  },
  {
    id: 'g-6',
    title: 'Gold Foil Calligraphy Personalized Gift Tags',
    occasion: 'Corporate',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    aspectRatio: 'wide',
    likes: 274
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f-1',
    category: 'Customization',
    question: 'How does the "Customize Your Hamper" option work?',
    answer: 'You can select your preferred base box (Wooden trunk, Velvet box, or Eco Jute Basket), choose individual handcrafted products from our treats, candles, tea, and keepsakes collection, write a personalized message card, and choose ribbon wrapping styles. Your live total in ₹ updates as you build!'
  },
  {
    id: 'f-2',
    category: 'Ordering',
    question: 'Can I add a personalized handwritten note to my hamper?',
    answer: 'Yes! Every Happy Hamper includes a complimentary gold-trimmed handmade message card. During checkout or custom builder, simply type your personal note and our calligraphers will write it by hand.'
  },
  {
    id: 'f-3',
    category: 'Delivery',
    question: 'What are the delivery timelines across India?',
    answer: 'Standard shipping takes 3-5 business days across pan-India metros (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune). Express 24-48 hour dispatch is available for urgent birthday and wedding orders.'
  },
  {
    id: 'f-4',
    category: 'Bulk & Corporate',
    question: 'Do you offer custom branding for corporate and wedding return gifts?',
    answer: 'Absolutely! For orders over 15 hampers, we offer custom logo foil stamping, custom silk ribbons matching your wedding/corporate theme, and bespoke product curation.'
  },
  {
    id: 'f-5',
    category: 'Customization',
    question: 'Are all products 100% handmade and eco-friendly?',
    answer: 'Yes, we collaborate directly with over 120 rural Indian artisans and self-help groups. Our soy wax, tea blends, copperware, and packaging materials are ethically sourced and eco-conscious.'
  }
];
