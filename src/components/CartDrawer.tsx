import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    showToast,
    setActivePage
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101217] border-l border-[#242733] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* HEADER */}
          <div className="p-5 border-b border-[#212430] flex items-center justify-between bg-[#0e1014]">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-[#c5a880]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                Your Atelier Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#a09a8e] hover:text-white hover:bg-[#1f222d] transition-all"
              aria-label="Close Cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#15171f] px-5 py-3 border-b border-[#212430] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#d0cac0]">
                Add <strong className="text-[#c5a880]">{formatPrice(remainingForFreeShipping)}</strong> more for{' '}
                <strong className="text-white">Free Express Shipping & Alteration</strong> across Tamil Nadu!
              </p>
            ) : (
              <p className="text-emerald-400 font-semibold flex items-center space-x-1.5">
                <Check size={14} />
                <span>You unlocked Free Tamil Nadu Delivery & Tex Valley In-Store Alteration!</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-[#252834] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#c5a880] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* CART ITEMS LIST */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#171922] border border-[#2b2e3c] flex items-center justify-center mx-auto text-[#a09a8e]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-lg font-bold font-editorial text-white">Your Bag is Empty</h3>
                <p className="text-xs text-[#a09a8e] max-w-xs mx-auto">
                  Explore our luxury linen shirts, ceremonial silk veshtis, and tailored trousers.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                  className="flex space-x-3.5 bg-[#14161e] p-3.5 rounded-xl border border-[#232632] group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover rounded border border-[#2b2e3c]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-semibold text-white line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                          className="text-[#787a82] hover:text-[#e05252] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-[#a09a8e] mt-1">
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                        <span>&bull;</span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e202a]">
                      <div className="flex items-center space-x-2 bg-[#1b1e28] border border-[#2a2d3b] rounded px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                          className="text-[#a09a8e] hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                          className="text-[#a09a8e] hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#c5a880] font-editorial">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CHECKOUT SUMMARY */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#212430] bg-[#0e1014] space-y-4">
              {/* COUPON CODE INPUT */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09a8e]" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Try: EROFIRST or PONGAL2026"
                      className="w-full bg-[#161820] border border-[#2c2f3c] rounded pl-8 pr-3 py-2 text-xs text-white uppercase placeholder-[#6a6c76] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1f222d] hover:bg-[#c5a880] text-[#c5a880] hover:text-[#0e0f12] text-xs font-bold uppercase rounded transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponMsg && (
                  <p className={`text-[11px] mt-1.5 ${couponMsg.success ? 'text-emerald-400' : 'text-[#e05252]'}`}>
                    {couponMsg.text}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-[#19221b] border border-[#29422e] px-2.5 py-1.5 rounded mt-2 text-xs text-emerald-300">
                    <span>Applied Coupon: <strong>{appliedCoupon.code}</strong></span>
                    <button
                      onClick={removeCoupon}
                      className="text-[#e05252] hover:underline font-bold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* TOTALS BREAKDOWN */}
              <div className="space-y-1.5 text-xs text-[#a09a8e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Festive / Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tamil Nadu Express Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#212430]">
                  <span>Total Amount</span>
                  <span className="text-lg text-[#c5a880] font-editorial">{formatPrice(total)}</span>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#787a82]">
                <ShieldCheck size={12} className="text-[#c5a880]" />
                <span>Tex Valley In-Store Pickup & COD Supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
