import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  QrCode,
  CreditCard,
  Truck,
  Building,
  Calendar,
  Gift,
  Phone,
  User,
  MapPin,
  FileText,
  Copy,
  Check,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Printer
} from 'lucide-react';
import { CartItem, Hamper, Order } from '../types';

interface DirectCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItems: CartItem[];
  directHamper?: Hamper | null;
  onOrderSuccess: (order: Order) => void;
}

export const DirectCheckoutModal: React.FC<DirectCheckoutModalProps> = ({
  isOpen,
  onClose,
  bookingItems,
  directHamper,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI / QR Code' | 'Cash on Delivery' | 'Bank Transfer'>('UPI / QR Code');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Placed Order details
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Determine items to book
  const itemsToBook = directHamper
    ? [{ hamper: directHamper, quantity: 1, customNote: '' }]
    : bookingItems;

  const subtotal = itemsToBook.reduce(
    (acc, item) => acc + item.hamper.price * item.quantity,
    0
  );

  const shippingFee = 0; // Free express delivery
  const totalAmount = subtotal + shippingFee;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('8999492692@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      alert('Please fill in all required delivery fields (Name, Phone, Address, Pincode)');
      return;
    }
    setStep('payment');
  };

  const handleConfirmBooking = () => {
    const orderId = `THH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim() || 'Pune',
      pincode: pincode.trim(),
      deliveryDate: deliveryDate || 'Standard (2-3 Days)',
      giftMessage: giftMessage.trim(),
      items: itemsToBook.map((i) => ({
        hamperId: i.hamper.id,
        name: i.hamper.name,
        quantity: i.quantity,
        price: i.hamper.price,
        customNote: i.customNote
      })),
      subtotal,
      discount: 0,
      totalAmount,
      paymentMethod,
      paymentStatus:
        paymentMethod === 'UPI / QR Code'
          ? utrNumber
            ? 'Paid'
            : 'Pending Verification'
          : paymentMethod === 'Cash on Delivery'
          ? 'Pay on Delivery'
          : 'Pending Verification',
      utrNumber: utrNumber.trim(),
      status: 'Confirmed'
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FFF9F6] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#DBCAC0] overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#3D2E2A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CDA452] text-[#3D2E2A] flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                Direct Website Booking
              </h3>
              <p className="text-xs text-[#CDA452]">
                The Happy Hampers Studio • Pune
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-[#FAF2ED] border-b border-[#DBCAC0] px-6 py-2.5 flex items-center justify-between text-xs font-bold text-[#3D2E2A] shrink-0">
          <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-[#CDA452]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'details' ? 'bg-[#3D2E2A] text-[#CDA452]' : 'bg-emerald-600 text-white'}`}>
              {step !== 'details' ? '✓' : '1'}
            </span>
            <span>1. Delivery Info</span>
          </div>
          <span className="text-gray-300">→</span>
          <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#CDA452]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#3D2E2A] text-[#CDA452]' : step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {step === 'confirmation' ? '✓' : '2'}
            </span>
            <span>2. Payment</span>
          </div>
          <span className="text-gray-300">→</span>
          <div className={`flex items-center gap-1.5 ${step === 'confirmation' ? 'text-emerald-700' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </span>
            <span>3. Order Confirmed</span>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: DELIVERY & CONTACT DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-5">
              {/* Items Summary Header */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#DBCAC0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2ED] text-[#3D2E2A] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#3D2E2A] block">
                      Booking {itemsToBook.length} Item(s)
                    </span>
                    <span className="text-[11px] text-gray-500 line-clamp-1">
                      {itemsToBook.map((i) => i.hamper.name).join(', ')}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-serif font-bold text-[#3D2E2A]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D2E2A] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#CDA452]" />
                  Recipient / Customer Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Kulkarni"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. aditi@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D2E2A] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#CDA452]" />
                  Shipping Address
                </h4>
                <div>
                  <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                    Flat / House No. / Street / Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Flat 402, Sunshine Heights, Lane 5, Rasta Peth"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 411011"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      Preferred Delivery Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3D2E2A] block mb-1">
                      Custom Calligraphy Note / Wish
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Happy Birthday Di! Love, Aditi"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                    />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#3D2E2A] hover:bg-[#2A1E1C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Proceed to Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                <Sparkles className="w-4 h-4 text-[#CDA452]" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-5">
              <button
                onClick={() => setStep('details')}
                className="text-xs font-bold text-[#3D2E2A] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Delivery Info
              </button>

              {/* Order Amount Banner */}
              <div className="bg-white p-4 rounded-2xl border border-[#DBCAC0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#CDA452] block">
                    Direct Booking Payable
                  </span>
                  <span className="text-xl font-serif font-bold text-[#3D2E2A]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#3D2E2A] block">{fullName}</span>
                  <span className="text-[11px] text-gray-500">{phone}</span>
                </div>
              </div>

              {/* Select Payment Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3D2E2A] block">
                  Select Payment Option
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI / QR Code')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'UPI / QR Code'
                        ? 'border-[#3D2E2A] bg-[#3D2E2A] text-white shadow-md'
                        : 'border-[#DBCAC0] bg-white text-[#3D2E2A] hover:border-[#3D2E2A]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mb-2 text-[#CDA452]" />
                    <div>
                      <span className="font-bold text-xs block">UPI / GPay / QR</span>
                      <span className={`text-[10px] ${paymentMethod === 'UPI / QR Code' ? 'text-white/70' : 'text-gray-500'}`}>
                        Instant PhonePe / Google Pay
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#3D2E2A] bg-[#3D2E2A] text-white shadow-md'
                        : 'border-[#DBCAC0] bg-white text-[#3D2E2A] hover:border-[#3D2E2A]'
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-2 text-[#CDA452]" />
                    <div>
                      <span className="font-bold text-xs block">Cash on Delivery</span>
                      <span className={`text-[10px] ${paymentMethod === 'Cash on Delivery' ? 'text-white/70' : 'text-gray-500'}`}>
                        Pay when delivered
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-[#3D2E2A] bg-[#3D2E2A] text-white shadow-md'
                        : 'border-[#DBCAC0] bg-white text-[#3D2E2A] hover:border-[#3D2E2A]'
                    }`}
                  >
                    <Building className="w-5 h-5 mb-2 text-[#CDA452]" />
                    <div>
                      <span className="font-bold text-xs block">Bank Transfer</span>
                      <span className={`text-[10px] ${paymentMethod === 'Bank Transfer' ? 'text-white/70' : 'text-gray-500'}`}>
                        NEFT / RTGS / IMPS
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Details Box */}
              {paymentMethod === 'UPI / QR Code' && (
                <div className="bg-white p-4 rounded-2xl border border-[#DBCAC0] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Visual QR Code Box */}
                    <div className="w-36 h-36 rounded-2xl bg-white border-2 border-[#3D2E2A] p-2 flex flex-col items-center justify-center shrink-0 shadow-xs text-center">
                      <div className="w-full h-full bg-[#FAF2ED] rounded-xl flex flex-col items-center justify-center p-2 border border-dashed border-[#CDA452]">
                        <QrCode className="w-12 h-12 text-[#3D2E2A]" />
                        <span className="text-[9px] font-bold text-[#3D2E2A] mt-1">
                          SCAN TO PAY ₹{totalAmount}
                        </span>
                      </div>
                    </div>

                    {/* UPI Instructions */}
                    <div className="space-y-2 text-xs flex-1">
                      <span className="text-xs font-bold text-[#3D2E2A] block">
                        Official Studio UPI ID:
                      </span>
                      <div className="flex items-center gap-2 bg-[#FAF2ED] p-2 rounded-xl border border-[#DBCAC0]">
                        <span className="font-mono font-bold text-xs text-[#3D2E2A]">
                          8999492692@upi
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="ml-auto px-2.5 py-1 bg-[#3D2E2A] text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-[#2A1E1C]"
                        >
                          {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-600 leading-tight">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM. Enter transaction reference ID below (optional for quick verification).
                      </p>

                      <div className="pt-1">
                        <label className="text-[10px] font-bold uppercase text-[#3D2E2A] block mb-1">
                          UPI Ref / UTR Number (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 409812345678"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#DBCAC0] focus:outline-none focus:border-[#3D2E2A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="bg-white p-4 rounded-2xl border border-[#DBCAC0] space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pay ₹{totalAmount.toLocaleString('en-IN')} on Delivery</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Your order will be handcrafted at our Pune studio and dispatched directly to your shipping address. You can pay via Cash or UPI scanner when the delivery rider arrives!
                  </p>
                </div>
              )}

              {paymentMethod === 'Bank Transfer' && (
                <div className="bg-white p-4 rounded-2xl border border-[#DBCAC0] text-xs space-y-2 text-[#3D2E2A]">
                  <span className="font-bold text-xs block">Studio Bank Account Details:</span>
                  <div className="bg-[#FAF2ED] p-3 rounded-xl border border-[#DBCAC0] space-y-1 font-mono text-[11px]">
                    <div>Bank: ICICI Bank, Rasta Peth Branch</div>
                    <div>Account Name: The Happy Hampers</div>
                    <div>Account No: 098105009842</div>
                    <div>IFSC Code: ICIC0000981</div>
                  </div>
                </div>
              )}

              {/* Confirm Booking Action */}
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span>Confirm & Place Booking (₹{totalAmount.toLocaleString('en-IN')})</span>
              </button>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Booking Confirmed!
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2E2A]">
                  Thank You, {confirmedOrder.customerName}!
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                  Your order <span className="font-bold text-[#3D2E2A]">#{confirmedOrder.id}</span> has been successfully booked with The Happy Hampers studio.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DBCAC0] text-left text-xs space-y-3 shadow-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold text-[#3D2E2A]">Order ID: #{confirmedOrder.id}</span>
                  <span className="text-gray-500">{confirmedOrder.createdAt}</span>
                </div>

                <div>
                  <span className="font-bold text-[#3D2E2A] block mb-1">Items Booked:</span>
                  <ul className="space-y-1">
                    {confirmedOrder.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-gray-700">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between font-bold text-[#3D2E2A] text-sm">
                    <span>Total Paid/Payable:</span>
                    <span>₹{confirmedOrder.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>Payment Method:</span>
                    <span className="font-semibold text-emerald-800">{confirmedOrder.paymentMethod}</span>
                  </div>
                </div>

                <div className="bg-[#FAF2ED] p-3 rounded-xl border border-[#DBCAC0] text-[11px] space-y-0.5 text-[#3D2E2A]">
                  <span className="font-bold block">Delivery Address:</span>
                  <div>{confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.pincode}</div>
                  <div>Phone: {confirmedOrder.phone}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-full bg-white border border-[#DBCAC0] text-[#3D2E2A] text-xs font-bold hover:bg-[#FAF2ED] flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-[#3D2E2A] text-white text-xs font-bold hover:bg-[#2A1E1C]"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
