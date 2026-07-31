export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  deliveryDate?: string;
  giftMessage?: string;
  items: {
    hamperId?: string;
    name: string;
    quantity: number;
    price: number;
    customNote?: string;
  }[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'UPI / QR Code' | 'Cash on Delivery' | 'Bank Transfer';
  paymentStatus: 'Paid' | 'Pending Verification' | 'Pay on Delivery';
  utrNumber?: string;
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
}

export interface Hamper {
  id: string;
  name: string;
  tagline: string;
  price: number; // In INR ₹
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  occasion: OccasionType;
  image: string;
  galleryImages: string[];
  description: string;
  whatsInside: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  isEcoFriendly?: boolean;
  packagingType: 'Wooden Trunk' | 'Velvet Box' | 'Eco Jute Basket' | 'Handmade Floral Box' | 'Brass Urli Box';
}

export type OccasionType =
  | 'Birthday'
  | 'Wedding'
  | 'Anniversary'
  | 'Baby Shower'
  | 'Housewarming'
  | 'Festivals'
  | 'Corporate'
  | 'Farewell';

export interface OccasionCategory {
  id: OccasionType;
  name: string;
  iconName: string;
  subtitle: string;
  image: string;
  badgeColor: string;
  count: number;
}

export interface BuilderItem {
  id: string;
  name: string;
  category: 'box' | 'treats' | 'scents' | 'keepsakes' | 'beverages' | 'cards';
  price: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  occasion: string;
  avatar: string;
  verified: boolean;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  occasion: OccasionType;
  image: string;
  aspectRatio: 'square' | 'tall' | 'wide';
  likes: number;
}

export interface CartItem {
  hamper: Hamper;
  quantity: number;
  customNote?: string;
  customizationDetails?: string;
}

export interface CustomHamperState {
  box?: BuilderItem;
  items: BuilderItem[];
  personalNote: string;
  recipientName: string;
  wrappingStyle: 'blush_ribbon' | 'gold_foil' | 'sage_eco_wrap' | 'velvet_tie';
  occasion: OccasionType;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Ordering' | 'Customization' | 'Delivery' | 'Bulk & Corporate';
}
