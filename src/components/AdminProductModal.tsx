import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Package,
  Sparkles,
  Check,
  AlertCircle,
  RefreshCw,
  Search,
  Tag,
  Gift,
  ShieldAlert,
  Image as ImageIcon,
  Upload,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { Hamper, OccasionType, Order } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  hampers: Hamper[];
  orders?: Order[];
  onAddHamper: (newHamper: Hamper) => void;
  onRemoveHamper: (hamperId: string) => void;
  onUpdateHamperImage?: (hamperId: string, newImage: string) => void;
  onResetCatalogue: () => void;
}

const PRESET_IMAGES = [
  {
    label: 'Royal Brass & Gold Box',
    url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Velvet Floral Trunk',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Bamboo Festive Basket',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Artisanal Keepsake Drawer',
    url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Earthy Organic Jute Box',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
  }
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  hampers,
  orders = [],
  onAddHamper,
  onRemoveHamper,
  onUpdateHamperImage,
  onResetCatalogue,
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'orders'>('add');
  const [searchFilter, setSearchFilter] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listFileInputRef = useRef<HTMLInputElement>(null);
  const [editingHamperId, setEditingHamperId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [occasion, setOccasion] = useState<OccasionType>('Wedding');
  const [packagingType, setPackagingType] = useState<
    'Wooden Trunk' | 'Velvet Box' | 'Eco Jute Basket' | 'Handmade Floral Box' | 'Brass Urli Box'
  >('Wooden Trunk');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [whatsInsideInput, setWhatsInsideInput] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(true);

  if (!isOpen) return null;

  // Handle local image file upload converting to DataURL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          setSuccessMsg('Picture uploaded successfully!');
          setTimeout(() => setSuccessMsg(null), 2000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleListImageUpload = (e: React.ChangeEvent<HTMLInputElement>, hamperId: string) => {
    const file = e.target.files?.[0];
    if (file && onUpdateHamperImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateHamperImage(hamperId, reader.result);
          setSuccessMsg('Product picture updated successfully!');
          setTimeout(() => setSuccessMsg(null), 2000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const insideItems = whatsInsideInput
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    const newHamper: Hamper = {
      id: `custom-h-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Handcrafted bespoke token by The Happy Hampers',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: 5.0,
      reviewsCount: 1,
      occasion,
      image: imageUrl.trim() || PRESET_IMAGES[0].url,
      galleryImages: [imageUrl.trim() || PRESET_IMAGES[0].url],
      description: tagline.trim() || 'Curated with premium Indian delights and artisanal gifts.',
      whatsInside: insideItems.length > 0 ? insideItems : ['Artisanal Brassware', 'Scented Candle', 'Gourmet Treats'],
      isBestseller,
      isNew,
      packagingType,
    };

    onAddHamper(newHamper);
    setSuccessMsg(`" ${newHamper.name} " has been added to your online store!`);

    // Reset Form
    setName('');
    setTagline('');
    setPrice('');
    setOriginalPrice('');
    setWhatsInsideInput('');
    setIsBestseller(false);
    setIsNew(true);

    setTimeout(() => {
      setSuccessMsg(null);
      setActiveTab('list');
    }, 1500);
  };

  const filteredHampers = hampers.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.occasion.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FAF2ED] w-full max-w-4xl rounded-3xl border border-[#DBCAC0] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#3D2E2A] text-white flex items-center justify-between border-b border-[#523F3A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8A5B0] text-[#3D2E2A] flex items-center justify-center font-bold shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                  Studio Owner Portal
                </h3>
                <span className="text-[10px] font-bold bg-[#CDA452] text-[#3D2E2A] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-white/70">
                Upload your own product pictures, add custom listings & view direct website orders.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DBCAC0] bg-[#F5EBE6] px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-5 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'add'
                ? 'bg-[#FAF2ED] text-[#3D2E2A] border-t-2 border-[#E8A5B0] shadow-xs'
                : 'text-[#3D2E2A]/60 hover:text-[#3D2E2A]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#E8A5B0]" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'list'
                ? 'bg-[#FAF2ED] text-[#3D2E2A] border-t-2 border-[#E8A5B0] shadow-xs'
                : 'text-[#3D2E2A]/60 hover:text-[#3D2E2A]'
            }`}
          >
            <Package className="w-4 h-4 text-[#CDA452]" />
            <span>Manage Store & Upload Pictures ({hampers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#FAF2ED] text-[#3D2E2A] border-t-2 border-[#E8A5B0] shadow-xs'
                : 'text-[#3D2E2A]/60 hover:text-[#3D2E2A]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Direct Website Orders ({orders.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-950/90 border border-emerald-500 rounded-2xl text-xs font-bold text-emerald-200 flex items-center gap-2 shadow-md"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {activeTab === 'add' && (
            /* ADD PRODUCT FORM */
            <form onSubmit={handleAddSubmit} className="space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-[#DBCAC0] shadow-xs space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#3D2E2A] border-b border-[#DBCAC0] pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#CDA452]" />
                  <span>Product Basics</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Hamper Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Pune Heritage Brass Trunk"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Tagline / Short Summary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure brass diya, handcrafted sweets & Mogra perfume"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      placeholder="e.g. 3499"
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs font-bold text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Original MRP (₹) (Optional strike-through)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 4200"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Occasion Tag
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as OccasionType)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Festivals">Festivals / Diwali</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Housewarming">Housewarming</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Farewell">Farewell</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      Packaging Container
                    </label>
                    <select
                      value={packagingType}
                      onChange={(e) =>
                        setPackagingType(
                          e.target.value as
                            | 'Wooden Trunk'
                            | 'Velvet Box'
                            | 'Eco Jute Basket'
                            | 'Handmade Floral Box'
                            | 'Brass Urli Box'
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    >
                      <option value="Wooden Trunk">Wooden Trunk</option>
                      <option value="Velvet Box">Velvet Box</option>
                      <option value="Brass Urli Box">Brass Urli Box</option>
                      <option value="Handmade Floral Box">Handmade Floral Box</option>
                      <option value="Eco Jute Basket">Eco Jute Basket</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2E2A] mb-1">
                      What’s Inside (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Brass Diya, Rose Truffles, Scented Candle, Card"
                      value={whatsInsideInput}
                      onChange={(e) => setWhatsInsideInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBCAC0] bg-[#FAF2ED] text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                    />
                  </div>
                </div>
              </div>

              {/* UPLOAD CUSTOM IMAGE FILE */}
              <div className="bg-white p-5 rounded-2xl border border-[#DBCAC0] shadow-xs space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#3D2E2A] border-b border-[#DBCAC0] pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#E8A5B0]" />
                    <span>Upload Product Picture</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Upload from Device or Select Preset
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* File Upload Box */}
                  <div className="col-span-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 rounded-2xl border-2 border-dashed border-[#E8A5B0] bg-[#FAF2ED] hover:bg-[#F5EBE6] transition-all flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
                    >
                      <Upload className="w-6 h-6 text-[#E8A5B0] group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-xs font-bold text-[#3D2E2A]">
                        Upload Picture from Device
                      </span>
                      <span className="text-[10px] text-gray-500 mt-0.5">
                        JPG, PNG, WEBP (Max 10MB)
                      </span>
                    </button>
                  </div>

                  {/* Selected Preview Box */}
                  <div className="col-span-2 flex items-center gap-4 bg-[#FAF2ED] p-3 rounded-2xl border border-[#DBCAC0]">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-[#DBCAC0] shrink-0">
                      <img
                        src={imageUrl}
                        alt="Selected Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="text-xs font-bold text-[#3D2E2A] block">
                        Selected Image Preview
                      </span>
                      <input
                        type="url"
                        placeholder="Or paste image URL (https://...)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#DBCAC0] bg-white text-[11px] text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#3D2E2A]">
                    Or choose from Sample Presets:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`p-1.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                          imageUrl === preset.url
                            ? 'border-[#3D2E2A] ring-2 ring-[#E8A5B0]'
                            : 'border-[#DBCAC0] opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[10px] font-bold text-[#3D2E2A] line-clamp-1">
                          {preset.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FLAGS */}
              <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl border border-[#DBCAC0]">
                <label className="flex items-center gap-2 text-xs font-bold text-[#3D2E2A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="rounded border-[#DBCAC0] text-[#E8A5B0] focus:ring-[#E8A5B0]"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#3D2E2A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="rounded border-[#DBCAC0] text-[#E8A5B0] focus:ring-[#E8A5B0]"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#3D2E2A] hover:bg-[#2A1E1C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#E8A5B0]" />
                <span>Publish Product to Store</span>
              </button>
            </form>
          )}

          {activeTab === 'list' && (
            /* MANAGE / UPLOAD PICTURES FOR PRODUCTS LIST */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#3D2E2A]/50" />
                  <input
                    type="text"
                    placeholder="Search product name..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-full border border-[#DBCAC0] bg-white text-xs text-[#3D2E2A] focus:outline-none focus:border-[#E8A5B0]"
                  />
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Reset catalogue to original default products?')) {
                      onResetCatalogue();
                      setSuccessMsg('Store catalogue reset to default products!');
                      setTimeout(() => setSuccessMsg(null), 2000);
                    }
                  }}
                  className="px-4 py-2 rounded-full border border-[#DBCAC0] bg-white text-xs font-bold text-[#3D2E2A] hover:bg-[#F5EBE6] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#CDA452]" />
                  <span>Reset Catalogue</span>
                </button>
              </div>

              <div className="space-y-3">
                {filteredHampers.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-[#DBCAC0]">
                    <Package className="w-10 h-10 text-[#3D2E2A]/40 mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#3D2E2A]">No products match your search.</p>
                  </div>
                ) : (
                  filteredHampers.map((hamper) => (
                    <div
                      key={hamper.id}
                      className="bg-white p-4 rounded-2xl border border-[#DBCAC0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative group shrink-0">
                          <img
                            src={hamper.image}
                            alt={hamper.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#DBCAC0]"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-serif font-bold text-sm text-[#3D2E2A]">
                              {hamper.name}
                            </h5>
                            {hamper.isBestseller && (
                              <span className="text-[9px] font-bold bg-[#CDA452]/20 text-[#3D2E2A] px-2 py-0.5 rounded-md">
                                BESTSELLER
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#3D2E2A]/70 line-clamp-1">
                            {hamper.tagline}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px]">
                            <span className="font-bold text-[#3D2E2A]">
                              ₹{hamper.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[#3D2E2A]/50">• {hamper.occasion}</span>
                            <span className="text-[#3D2E2A]/50">• {hamper.packagingType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Image Upload & Delete Actions */}
                      <div className="shrink-0 w-full sm:w-auto flex items-center gap-2 justify-end">
                        {/* Change Image Button */}
                        <label className="px-3 py-2 rounded-full border border-[#DBCAC0] bg-[#FAF2ED] hover:bg-[#F5EBE6] text-[#3D2E2A] font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#E8A5B0]" />
                          <span>Change Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleListImageUpload(e, hamper.id)}
                            className="hidden"
                          />
                        </label>

                        {/* Delete Action */}
                        {deleteConfirmId === hamper.id ? (
                          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl border border-red-200">
                            <span className="text-[11px] font-bold text-red-700">Confirm?</span>
                            <button
                              onClick={() => {
                                onRemoveHamper(hamper.id);
                                setDeleteConfirmId(null);
                                setSuccessMsg(`Removed "${hamper.name}" from store.`);
                                setTimeout(() => setSuccessMsg(null), 2000);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[10px] hover:bg-red-700"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2.5 py-1 rounded-lg bg-gray-200 text-[#3D2E2A] font-bold text-[10px]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(hamper.id)}
                            className="p-2 rounded-full border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-600 font-bold transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            /* DIRECT WEBSITE BOOKINGS LIST */
            <div className="space-y-4">
              <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base">Direct Customer Bookings</h4>
                  <p className="text-xs text-emerald-200">
                    Orders placed directly by customers on your website.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-800 text-emerald-100 text-xs font-bold border border-emerald-700">
                  Total Orders: {orders.length}
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#DBCAC0] space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#3D2E2A]/30 mx-auto" />
                  <h5 className="font-serif font-bold text-base text-[#3D2E2A]">No Website Orders Yet</h5>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    When customers book hampers using the "Direct Website Booking" button, their order details will appear here instantly!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white p-4 rounded-2xl border border-[#DBCAC0] shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs bg-[#3D2E2A] text-[#CDA452] px-2.5 py-1 rounded-lg">
                            #{ord.id}
                          </span>
                          <span className="text-xs font-bold text-[#3D2E2A]">{ord.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-gray-400">• {ord.createdAt}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3D2E2A]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <Phone className="w-3.5 h-3.5 text-[#E8A5B0]" />
                            <span className="font-bold">{ord.phone}</span>
                            {ord.email && <span className="text-gray-500">({ord.email})</span>}
                          </div>
                          <div className="flex items-start gap-1.5 text-gray-600">
                            <MapPin className="w-3.5 h-3.5 text-[#CDA452] shrink-0 mt-0.5" />
                            <span>{ord.address}, {ord.city} - {ord.pincode}</span>
                          </div>
                        </div>

                        <div className="bg-[#FAF2ED] p-2.5 rounded-xl border border-[#DBCAC0] text-[11px] space-y-1">
                          <div className="font-bold text-[#3D2E2A]">Payment Method: {ord.paymentMethod}</div>
                          {ord.utrNumber && <div>UTR Ref: <span className="font-mono font-bold">{ord.utrNumber}</span></div>}
                          {ord.giftMessage && <div className="italic text-[#3D2E2A]">Note: "{ord.giftMessage}"</div>}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-gray-50 p-2.5 rounded-xl text-xs space-y-1">
                        <span className="font-bold text-gray-700 text-[11px] uppercase tracking-wider block">Ordered Items:</span>
                        <div className="flex flex-wrap gap-2">
                          {ord.items.map((it, idx) => (
                            <span key={idx} className="bg-white border px-2.5 py-1 rounded-md text-[11px] font-bold text-[#3D2E2A]">
                              {it.name} (x{it.quantity}) - ₹{it.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

