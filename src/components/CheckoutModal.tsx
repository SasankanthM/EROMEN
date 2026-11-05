import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  Store,
  Printer,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    formatPrice,
    clearCart,
    showToast
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'store'>('upi');

  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Perundurai',
    pincode: '638052',
    fittingAppointment: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('Please enter your full name and phone number');
      return;
    }

    const generatedId = `ERO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const itemsList = cart
      .map(
        i =>
          `• ${i.product.name} (Size: ${i.selectedSize}, Color: ${i.selectedColor.name}, Qty: ${i.quantity}) - ${formatPrice(i.product.price * i.quantity)}`
      )
      .join('\n');

    const paymentLabel =
      paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : paymentMethod === 'upi'
        ? 'Instant UPI Payment'
        : 'Pay at Tex Valley Store';

    const deliveryLabel =
      deliveryType === 'delivery'
        ? `Home Delivery: ${formData.address}, ${formData.city} - ${formData.pincode}`
        : `Self Pickup at Tex Valley Mall Flagship Store`;

    const text = encodeURIComponent(
      `*NEW ORDER RECEIVED - EROMEN*\n` +
      `--------------------------------\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer:* ${formData.fullName}\n` +
      `*Phone:* ${formData.phone}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : '') +
      `*Fulfillment:* ${deliveryLabel}\n` +
      `*Payment:* ${paymentLabel}\n\n` +
      `*ITEMS ORDERED:*\n${itemsList}\n\n` +
      `*Subtotal:* ${formatPrice(subtotal)}\n` +
      (discountAmount > 0 ? `*Discount:* -${formatPrice(discountAmount)}\n` : '') +
      `*Shipping:* ${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}\n` +
      `*TOTAL PAYABLE:* ${formatPrice(total)}\n` +
      `--------------------------------\n` +
      `Please confirm order preparation and alteration timeline.`
    );

    window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
    showToast('Thank you! Your order was placed successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121419] border border-[#2b2e3c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232631] bg-[#0e1014]">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-[#c5a880]" />
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white">
              {isSubmitted ? 'ORDER CONFIRMATION' : 'SECURE ATELIER CHECKOUT'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (isSubmitted) {
                clearCart();
              }
              setIsCheckoutOpen(false);
            }}
            className="p-1.5 rounded-full text-[#a09a8e] hover:text-white hover:bg-[#1f222d] transition-all"
            aria-label="Close Checkout"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. FULFILLMENT METHOD */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block">
                  Select Delivery Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border text-left transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-[#1b1e27] border-[#c5a880] ring-1 ring-[#c5a880]'
                        : 'bg-[#14161e] border-[#252834] text-[#a09a8e]'
                    }`}
                  >
                    <Truck size={18} className={deliveryType === 'delivery' ? 'text-[#c5a880]' : ''} />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Express Doorstep Delivery</span>
                      <span className="text-[11px] text-[#a09a8e]">
                        Direct to home across Erode, Coimbatore & all Tamil Nadu
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border text-left transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-[#1b1e27] border-[#c5a880] ring-1 ring-[#c5a880]'
                        : 'bg-[#14161e] border-[#252834] text-[#a09a8e]'
                    }`}
                  >
                    <Store size={18} className={deliveryType === 'pickup' ? 'text-[#c5a880]' : ''} />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Pick Up at Tex Valley Flagship</span>
                      <span className="text-[11px] text-[#a09a8e]">
                        Ready in 2 hours with free custom tailor fitting
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. CUSTOMER CONTACT DETAILS */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block">
                  Your Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. S. Karthik"
                      className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98427 00000"
                      className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#a09a8e] block mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. karthik@example.com"
                    className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* 3. ADDRESS (ONLY IF HOME DELIVERY) */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block">
                    Delivery Address
                  </label>

                  <div>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Door / Building No, Street Name, Area"
                      className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#a09a8e] block mb-1">City / Town</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Perundurai / Erode"
                        className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#a09a8e] block mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="638052"
                        className="w-full bg-[#181a22] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PAYMENT METHOD */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block">
                  Payment Method
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#1b1e27] border-[#c5a880] ring-1 ring-[#c5a880]'
                        : 'bg-[#14161e] border-[#252834]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
                      <QrCode size={16} className="text-[#c5a880]" />
                      <span>Instant UPI</span>
                    </div>
                    <p className="text-[10px] text-[#a09a8e]">GPay, PhonePe, Paytm, BHIM</p>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#1b1e27] border-[#c5a880] ring-1 ring-[#c5a880]'
                        : 'bg-[#14161e] border-[#252834]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
                      <Truck size={16} className="text-[#c5a880]" />
                      <span>Cash on Delivery</span>
                    </div>
                    <p className="text-[10px] text-[#a09a8e]">Pay cash upon inspection</p>
                  </button>

                  {/* STORE */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('store')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'store'
                        ? 'bg-[#1b1e27] border-[#c5a880] ring-1 ring-[#c5a880]'
                        : 'bg-[#14161e] border-[#252834]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
                      <Store size={16} className="text-[#c5a880]" />
                      <span>Pay at Store</span>
                    </div>
                    <p className="text-[10px] text-[#a09a8e]">Tex Valley Mall desk</p>
                  </button>
                </div>

                {/* Simulated UPI Details */}
                {paymentMethod === 'upi' && (
                  <div className="bg-[#181a22] border border-[#2e313f] p-3 rounded-lg text-xs text-[#a09a8e] flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">UPI ID: eromen@upi</span>
                      <span>Scan QR or pay on delivery via phone</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                      Zero Surcharge
                    </span>
                  </div>
                )}
              </div>

              {/* ORDER SUMMARY STRIP */}
              <div className="p-4 bg-[#161820] border border-[#262834] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#a09a8e] block">Total Amount to Pay:</span>
                  <span className="text-xl font-bold text-[#c5a880] font-editorial">
                    {formatPrice(total)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.18em] rounded flex items-center space-x-2 shadow-xl active:scale-95"
                >
                  <span>Confirm Order</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          ) : (
            /* ORDER CONFIRMATION SCREEN */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#c5a880] uppercase">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white mt-1">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-xs text-[#a09a8e] mt-1">
                  Order ID: <strong className="text-white font-mono">{orderId}</strong> &bull; Total: <strong className="text-[#c5a880] font-editorial text-sm">{formatPrice(total)}</strong>
                </p>
              </div>

              {/* INVOICE CARD */}
              <div className="bg-[#15171e] border border-[#282b37] rounded-xl p-4 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#22242e] pb-2 text-[#a09a8e]">
                  <span>Fulfillment:</span>
                  <span className="text-white font-medium">
                    {deliveryType === 'delivery' ? `Home Delivery (${formData.city})` : 'Tex Valley Store Pickup'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#22242e] pb-2 text-[#a09a8e]">
                  <span>Payment Mode:</span>
                  <span className="text-white font-medium uppercase">{paymentMethod}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-[#a09a8e]">Items Ordered:</span>
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-[#d6d0c4]">
                      <span>{item.quantity}x {item.product.name} ({item.selectedSize})</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHATSAPP CONFIRMATION CTA */}
              <div className="p-4 bg-[#132018] border border-[#214a2b] rounded-xl text-xs space-y-3">
                <p className="text-emerald-300">
                  Send your order details directly to the EROMEN Tex Valley store owner via WhatsApp for instant status, video preview, and alteration scheduling.
                </p>
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3 bg-[#25d366] hover:bg-[#20ba59] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>Send Order to Store WhatsApp (+91 98427 54321)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-[#2d303c] rounded text-xs text-[#a09a8e] hover:text-white flex items-center space-x-1.5"
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={handleFinish}
                  className="px-6 py-2 bg-[#c5a880] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
