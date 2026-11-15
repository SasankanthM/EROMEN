import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COUPONS, FESTIVAL_DEAL } from '../data/shopConfig';
import { PRODUCTS } from '../data/products';
import { FestivalOfferStrip } from './FestivalOfferStrip';
import { Tag, Sparkles, Copy, Check, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { language, formatPrice, applyCoupon, addToCart, setIsCartOpen, showToast, setActivePage, setSelectedCategory } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    showToast(`Coupon "${code}" copied and applied to your bag!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleAddBundle = (name: string, pIds: string[], bundlePrice: number) => {
    pIds.forEach(id => {
      const prod = PRODUCTS.find(p => p.id === id);
      if (prod) {
        addToCart(prod, prod.sizes[0], prod.colors[0], 1);
      }
    });
    setIsCartOpen(true);
    showToast(`Added ${name} to your cart with festive discount!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0b0e] text-[#f4efe6] py-10 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* TOP HERO OFFER BANNER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
            <Sparkles size={14} />
            <span>FESTIVE SAVINGS ATELIER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Pongal & Wedding Season Offers
          </h1>
          <p className="text-xs sm:text-sm text-[#a09a8e] font-light max-w-xl mx-auto">
            Celebrate the auspicious season with exclusive promotions, festive bundle discounts, and complimentary custom alterations at our Tex Valley flagship.
          </p>
        </div>

        {/* LIVE COUNTDOWN STRIP */}
        <FestivalOfferStrip />

        {/* ACTIVE COUPON CODES GRID */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
              Official Atelier Promo Codes
            </h2>
            <p className="text-xs text-[#a09a8e] mt-1">
              Click any code to copy and automatically apply to your active bag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPONS.map(coupon => {
              const isCopied = copiedCode === coupon.code;

              return (
                <div
                  key={coupon.code}
                  className="bg-[#121419] border border-[#2b2e3b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#c5a880] transition-all shadow-xl relative overflow-hidden group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold font-mono tracking-wider uppercase rounded border border-[#c5a880]/30">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#a09a8e] font-bold">
                        {coupon.discountPercent ? `${coupon.discountPercent}% OFF` : `₹${coupon.discountAmount} OFF`}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-editorial">
                      {coupon.description}
                    </h3>

                    {coupon.minSpend && (
                      <p className="text-[11px] text-[#787a82]">
                        Valid on minimum cart value of {formatPrice(coupon.minSpend)}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="mt-6 w-full py-2.5 bg-[#1b1d26] hover:bg-[#c5a880] text-[#c5a880] hover:text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-all border border-[#2f3242]"
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span>Code Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CURATED FESTIVE BUNDLES WITH COMBO DISCOUNTS */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
              ALL-IN-ONE PACKAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white mt-1">
              Curated Festive & Groom Bundles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bundle 1 */}
            <div className="bg-[#14161e] border border-[#2b2e3b] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 bg-[#8b1e1e] text-white text-[10px] font-bold tracking-widest uppercase rounded">
                  FESTIVE SAVINGS 25% OFF
                </span>

                <h3 className="text-2xl font-bold font-editorial text-white">
                  The Grand Muhurtham Groom Ensemble
                </h3>

                <p className="text-xs text-[#a09a8e] leading-relaxed">
                  Includes Pure Mulberry Raw Silk Kurta + Pure Kanchipuram Zari Pattu Veshti Set + Pure Silk Paisley Tie & Pocket Square Set.
                </p>

                <div className="space-y-1.5 text-xs text-[#d1ccc3]">
                  <p>✔ Includes 45-min bespoke alteration at Tex Valley</p>
                  <p>✔ Free luxury wooden gift box packaging</p>
                  <p>✔ Free express insured courier across Tamil Nadu</p>
                </div>

                <div className="pt-2 flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-[#c5a880] font-editorial">
                    ₹9,499
                  </span>
                  <span className="text-sm text-[#787a82] line-through">
                    ₹13,897
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddBundle('Grand Muhurtham Groom Ensemble', ['eromen-eth-01', 'eromen-eth-03', 'eromen-acc-02'], 9499)}
                className="mt-6 w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>Add Groom Bundle to Bag (Save ₹4,398)</span>
              </button>
            </div>

            {/* Bundle 2 */}
            <div className="bg-[#14161e] border border-[#2b2e3b] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold tracking-widest uppercase rounded">
                  CORPORATE POWER PACK 20% OFF
                </span>

                <h3 className="text-2xl font-bold font-editorial text-white">
                  The Tex Valley Executive 3-Piece Look
                </h3>

                <p className="text-xs text-[#a09a8e] leading-relaxed">
                  Includes Italian Super 130s Bespoke Suit + Savile Row Double-Cuff Twill Shirt + Hand-Burnished Full-Grain Leather Dress Belt.
                </p>

                <div className="space-y-1.5 text-xs text-[#d1ccc3]">
                  <p>✔ Master tailor shoulder & waist adjustment in Tex Valley</p>
                  <p>✔ Anti-crease breathable natural fibers</p>
                  <p>✔ Signature suit garment bag included</p>
                </div>

                <div className="pt-2 flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-[#c5a880] font-editorial">
                    ₹13,999
                  </span>
                  <span className="text-sm text-[#787a82] line-through">
                    ₹17,497
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddBundle('Tex Valley Executive Look', ['eromen-frm-01', 'eromen-sh-02', 'eromen-acc-01'], 13999)}
                className="mt-6 w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>Add Executive Bundle to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
