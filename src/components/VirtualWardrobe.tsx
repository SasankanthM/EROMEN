import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, OUTFIT_PRESETS } from '../data/products';
import { SHOP_CONFIG } from '../data/shopConfig';
import { Product } from '../types';
import { Sparkles, ShoppingBag, MessageCircle, RefreshCw, Check, ArrowRight, Layers } from 'lucide-react';

export const VirtualWardrobe: React.FC = () => {
  const { language, formatPrice, addToCart, setIsCartOpen, showToast } = useShop();

  // Products suitable for Tops
  const availableTops = PRODUCTS.filter(p =>
    p.category === 'Shirts' || p.category === 'Ethnic Wear' || p.category === 'Formal Wear' || p.category === 'T-Shirts'
  );

  // Products suitable for Bottoms
  const availableBottoms = PRODUCTS.filter(p =>
    p.category === 'Trousers' || p.category === 'Jeans' || (p.category === 'Ethnic Wear' && p.id.includes('vesh'))
  );

  // Products suitable for Accessories
  const availableAccessories = PRODUCTS.filter(p => p.category === 'Accessories');

  const [selectedTop, setSelectedTop] = useState<Product>(availableTops[0]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(availableBottoms[0]);
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(availableAccessories[0]);

  // Sizes for the selected pieces
  const [topSize, setTopSize] = useState<string>(availableTops[0].sizes[0]);
  const [bottomSize, setBottomSize] = useState<string>(availableBottoms[0].sizes[0]);

  // Calculate combo savings (e.g. 10% combo discount on entire bundle)
  const rawSum = selectedTop.price + selectedBottom.price + (selectedAccessory ? selectedAccessory.price : 0);
  const bundleDiscount = Math.round(rawSum * 0.10);
  const bundlePrice = rawSum - bundleDiscount;

  const handleApplyPreset = (presetId: string) => {
    const preset = OUTFIT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const top = PRODUCTS.find(p => p.id === preset.topId);
    const bottom = PRODUCTS.find(p => p.id === preset.bottomId);
    const acc = PRODUCTS.find(p => p.id === preset.accessoryId);

    if (top) {
      setSelectedTop(top);
      setTopSize(top.sizes[0]);
    }
    if (bottom) {
      setSelectedBottom(bottom);
      setBottomSize(bottom.sizes[0]);
    }
    if (acc) {
      setSelectedAccessory(acc);
    }
    showToast(`Loaded "${preset.title}" look!`);
  };

  const handleAddBundleToCart = () => {
    addToCart(selectedTop, topSize, selectedTop.colors[0], 1);
    addToCart(selectedBottom, bottomSize, selectedBottom.colors[0], 1);
    if (selectedAccessory) {
      addToCart(selectedAccessory, selectedAccessory.sizes[0], selectedAccessory.colors[0], 1);
    }
    setIsCartOpen(true);
    showToast('Complete Outfit Bundle added to your cart with combo savings!');
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello EROMEN Stylist (Tex Valley, Perundurai)!\n` +
      `I styled an outfit in your Virtual Wardrobe:\n\n` +
      `• Top: ${selectedTop.name} (${topSize}) - ${formatPrice(selectedTop.price)}\n` +
      `• Bottom: ${selectedBottom.name} (${bottomSize}) - ${formatPrice(selectedBottom.price)}\n` +
      (selectedAccessory ? `• Accessory: ${selectedAccessory.name} - ${formatPrice(selectedAccessory.price)}\n` : '') +
      `• Combo Total: ${formatPrice(bundlePrice)} (Saved ${formatPrice(bundleDiscount)})\n\n` +
      `Can I check fitting & availability at your Tex Valley store?`
    );
    window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="virtual-wardrobe" className="w-full py-16 sm:py-24 bg-[#0d0e12] px-4 sm:px-8 border-b border-[#1f2128]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-semibold tracking-widest text-[#e6d5b8] uppercase mb-3">
            <Sparkles size={13} className="text-[#c5a880]" />
            <span>{language === 'en' ? 'INTERACTIVE MIX-AND-MATCH ATELIER' : 'மெய்நிகர் ஆடை ஜோடி தேர்வு'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white font-editorial tracking-tight">
            {language === 'en' ? 'Virtual Wardrobe Builder' : 'சட்டை & பேண்ட் பொருத்திப் பார்க்கும் தளம்'}
          </h2>

          <p className="mt-3 text-sm text-[#a09a8e] font-light">
            {language === 'en'
              ? 'Pair luxury shirts with bespoke pleated trousers, authentic wedding veshtis, or raw selvedge denim. Instant visual harmony with combo savings.'
              : 'உங்கள் விருப்பப்படி சட்டையையும் பேண்ட்டையும் சேர்த்துப் பார்த்து, ஒரே கிளிக்கில் வாங்கலாம்.'}
          </p>

          {/* QUICK PRESETS PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs text-[#a09a8e] mr-1">Curated Looks:</span>
            {OUTFIT_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className="px-3 py-1 bg-[#171920] hover:bg-[#232733] border border-[#2b2e3b] text-xs text-[#d6d0c4] hover:text-[#c5a880] rounded-full transition-all flex items-center space-x-1.5"
              >
                <span>✦</span>
                <span>{language === 'en' ? preset.title : preset.titleTa}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN BUILDER WORKSPACE: LEFT SELECTORS, RIGHT VISUAL PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: INTERACTIVE SELECTION PANELS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. TOP SELECTION */}
            <div className="bg-[#121419] border border-[#232630] rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#c5a880] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[10px] text-[#c5a880]">1</span>
                  <span>Select Upper / Top</span>
                </span>
                <span className="text-xs text-[#ded9cf] font-semibold">
                  {selectedTop.name} &bull; <strong className="text-[#c5a880] font-editorial text-sm">{formatPrice(selectedTop.price)}</strong>
                </span>
              </div>

              {/* Horizontal Thumbnails Carousel */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {availableTops.slice(0, 6).map(top => (
                  <button
                    key={top.id}
                    onClick={() => {
                      setSelectedTop(top);
                      setTopSize(top.sizes[0]);
                    }}
                    className={`relative rounded-lg overflow-hidden border aspect-[3/4] group transition-all ${
                      selectedTop.id === top.id
                        ? 'border-[#c5a880] ring-2 ring-[#c5a880]/40'
                        : 'border-[#262832] opacity-70 hover:opacity-100 hover:border-[#424657]'
                    }`}
                  >
                    <img src={top.image} alt={top.name} className="w-full h-full object-cover" />
                    {selectedTop.id === top.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#c5a880] text-[#0e0f12] rounded-full flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Top Size Selector */}
              <div className="mt-3.5 pt-3 border-t border-[#1d2028] flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-[#a09a8e]">Choose Size for Top:</span>
                <div className="flex items-center space-x-1.5">
                  {selectedTop.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setTopSize(size)}
                      className={`px-2.5 py-1 text-xs rounded border transition-all ${
                        topSize === size
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303d] text-[#b5af9f] hover:border-[#c5a880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. BOTTOM SELECTION */}
            <div className="bg-[#121419] border border-[#232630] rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#c5a880] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[10px] text-[#c5a880]">2</span>
                  <span>Select Trousers / Bottom</span>
                </span>
                <span className="text-xs text-[#ded9cf] font-semibold">
                  {selectedBottom.name} &bull; <strong className="text-[#c5a880] font-editorial text-sm">{formatPrice(selectedBottom.price)}</strong>
                </span>
              </div>

              {/* Horizontal Thumbnails Carousel */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {availableBottoms.slice(0, 6).map(bottom => (
                  <button
                    key={bottom.id}
                    onClick={() => {
                      setSelectedBottom(bottom);
                      setBottomSize(bottom.sizes[0]);
                    }}
                    className={`relative rounded-lg overflow-hidden border aspect-[3/4] group transition-all ${
                      selectedBottom.id === bottom.id
                        ? 'border-[#c5a880] ring-2 ring-[#c5a880]/40'
                        : 'border-[#262832] opacity-70 hover:opacity-100 hover:border-[#424657]'
                    }`}
                  >
                    <img src={bottom.image} alt={bottom.name} className="w-full h-full object-cover" />
                    {selectedBottom.id === bottom.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#c5a880] text-[#0e0f12] rounded-full flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Bottom Size Selector */}
              <div className="mt-3.5 pt-3 border-t border-[#1d2028] flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-[#a09a8e]">Choose Waist / Fit:</span>
                <div className="flex items-center space-x-1.5">
                  {selectedBottom.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setBottomSize(size)}
                      className={`px-2.5 py-1 text-xs rounded border transition-all ${
                        bottomSize === size
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303d] text-[#b5af9f] hover:border-[#c5a880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. ACCESSORY SELECTION (OPTIONAL) */}
            <div className="bg-[#121419] border border-[#232630] rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#c5a880] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[10px] text-[#c5a880]">3</span>
                  <span>Signature Accent (Optional)</span>
                </span>
                {selectedAccessory ? (
                  <button
                    onClick={() => setSelectedAccessory(null)}
                    className="text-[11px] text-[#a09a8e] hover:text-[#e05252] underline"
                  >
                    Remove
                  </button>
                ) : (
                  <span className="text-[11px] text-[#737069]">None Selected</span>
                )}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {availableAccessories.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccessory(acc)}
                    className={`relative rounded-lg overflow-hidden border aspect-square group transition-all ${
                      selectedAccessory?.id === acc.id
                        ? 'border-[#c5a880] ring-2 ring-[#c5a880]/40'
                        : 'border-[#262832] opacity-70 hover:opacity-100 hover:border-[#424657]'
                    }`}
                  >
                    <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                    {selectedAccessory?.id === acc.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#c5a880] text-[#0e0f12] rounded-full flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE OUTFIT VISUALIZER & COMBINED CHECKOUT CARD (5 COLS) */}
          <div className="lg:col-span-5 bg-[#14161c] border border-[#292c37] rounded-2xl p-6 shadow-2xl relative sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#232631]">
              <div className="flex items-center space-x-2">
                <Layers size={18} className="text-[#c5a880]" />
                <h3 className="text-lg font-bold text-white font-editorial">
                  Your Bespoke Look Preview
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-[#8b1e1e] text-white text-[10px] font-bold tracking-wider uppercase rounded">
                10% COMBO SAVINGS
              </span>
            </div>

            {/* MANNEQUIN / STACKED LOOK PREVIEW */}
            <div className="mt-5 space-y-3">
              {/* Stack 1: Top Image Card */}
              <div className="flex items-center space-x-3.5 bg-[#0f1014] p-3 rounded-lg border border-[#242732]">
                <img
                  src={selectedTop.image}
                  alt={selectedTop.name}
                  className="w-16 h-20 object-cover rounded border border-[#2b2e3b]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">Upper</span>
                  <h4 className="text-xs font-semibold text-white truncate">{selectedTop.name}</h4>
                  <p className="text-[11px] text-[#a09a8e]">Size: {topSize}</p>
                  <p className="text-xs font-bold text-[#e6d5b8] font-editorial mt-0.5">{formatPrice(selectedTop.price)}</p>
                </div>
              </div>

              {/* Stack 2: Bottom Image Card */}
              <div className="flex items-center space-x-3.5 bg-[#0f1014] p-3 rounded-lg border border-[#242732]">
                <img
                  src={selectedBottom.image}
                  alt={selectedBottom.name}
                  className="w-16 h-20 object-cover rounded border border-[#2b2e3b]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">Bottom</span>
                  <h4 className="text-xs font-semibold text-white truncate">{selectedBottom.name}</h4>
                  <p className="text-[11px] text-[#a09a8e]">Size: {bottomSize}</p>
                  <p className="text-xs font-bold text-[#e6d5b8] font-editorial mt-0.5">{formatPrice(selectedBottom.price)}</p>
                </div>
              </div>

              {/* Stack 3: Accessory Image Card (if any) */}
              {selectedAccessory && (
                <div className="flex items-center space-x-3.5 bg-[#0f1014] p-2.5 rounded-lg border border-[#242732]">
                  <img
                    src={selectedAccessory.image}
                    alt={selectedAccessory.name}
                    className="w-12 h-12 object-cover rounded border border-[#2b2e3b]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">Accent</span>
                    <h4 className="text-xs font-semibold text-white truncate">{selectedAccessory.name}</h4>
                    <p className="text-xs font-bold text-[#e6d5b8] font-editorial mt-0.5">{formatPrice(selectedAccessory.price)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* BUNDLE TOTAL CALCULATION */}
            <div className="mt-6 pt-4 border-t border-[#232631] space-y-2">
              <div className="flex justify-between text-xs text-[#a09a8e]">
                <span>Items Subtotal</span>
                <span>{formatPrice(rawSum)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Wardrobe Combo Discount (10%)</span>
                <span>-{formatPrice(bundleDiscount)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#232631]">
                <div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Bundle Price:</span>
                  <p className="text-[10px] text-[#a09a8e]">Includes complimentary Tex Valley alteration</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#c5a880] font-editorial">
                    {formatPrice(bundlePrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleAddBundleToCart}
                className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>Add Complete Look to Cart</span>
              </button>

              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3 bg-[#1d2028] hover:bg-[#252834] border border-[#3b3f4f] text-[#d6d0c4] hover:text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Buy This Look on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
