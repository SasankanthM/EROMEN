import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import { MessageCircle, MapPin, Sparkles, X, ShoppingBag, Layers, Compass, Tag } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const {
    toast,
    cartCount,
    setIsCartOpen,
    activePage,
    setActivePage,
    setIsWardrobeOpen,
    setIsStyleQuizOpen
  } = useShop();

  const [chatPopupOpen, setChatPopupOpen] = useState(false);

  const handleLaunchWhatsApp = (prefill: string) => {
    const text = encodeURIComponent(prefill);
    window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* 1. NOTIFICATION TOAST NOTIFIER */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#161822]/95 border border-[#c5a880] text-white px-5 py-3 rounded-full shadow-2xl backdrop-blur-md text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* 2. FLOATING WHATSAPP BUTTON WITH LIVE CONCIERGE CHAT POPOVER */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        {chatPopupOpen && (
          <div className="mb-3 w-72 bg-[#12141a] border border-[#2c2f3c] rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#21232d]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  EROMEN Concierge
                </span>
              </div>
              <button
                onClick={() => setChatPopupOpen(false)}
                className="text-[#a09a8e] hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-[#d1ccc3] mt-2.5 font-light leading-relaxed">
              Vanakkam! Looking for a wedding suit, festive silk kurta, or custom fitting at Tex Valley Mall?
            </p>

            <div className="mt-3 space-y-1.5">
              <button
                onClick={() =>
                  handleLaunchWhatsApp(
                    'Hello! I would like to check wedding reception suits at Tex Valley store.'
                  )
                }
                className="w-full text-left p-2 rounded bg-[#181a22] hover:bg-[#222530] text-[11px] text-[#ded9cf] hover:text-[#c5a880] transition-colors"
              >
                💬 Ask about Wedding Suits & Silks
              </button>

              <button
                onClick={() =>
                  handleLaunchWhatsApp(
                    'Hello! I would like to book a 45-min master tailor alteration at Tex Valley.'
                  )
                }
                className="w-full text-left p-2 rounded bg-[#181a22] hover:bg-[#222530] text-[11px] text-[#ded9cf] hover:text-[#c5a880] transition-colors"
              >
                ✂️ Book Alteration / Fitting
              </button>
            </div>
          </div>
        )}

        {/* The Floating WhatsApp Icon Button */}
        <button
          onClick={() => setChatPopupOpen(!chatPopupOpen)}
          className="relative w-13 h-13 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-[#0e0f12] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} className="text-[#0e0f12]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#12141a] animate-ping" />
        </button>
      </div>

      {/* 3. STICKY MOBILE BOTTOM ACTION DOCK (MOBILE FIRST COMFORT) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0e1014]/95 backdrop-blur-lg border-t border-[#232630] py-2 px-3 flex items-center justify-around text-[10px] text-[#a09a8e] font-semibold select-none">
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-0.5 ${
            activePage === 'home' ? 'text-[#c5a880]' : 'hover:text-white'
          }`}
        >
          <Sparkles size={18} />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-0.5 ${
            activePage === 'shop' ? 'text-[#c5a880]' : 'hover:text-white'
          }`}
        >
          <Compass size={18} />
          <span>Shop</span>
        </button>

        <button
          onClick={() => {
            setIsWardrobeOpen(true);
          }}
          className="flex flex-col items-center space-y-0.5 text-[#c5a880]"
        >
          <Layers size={18} />
          <span>Wardrobe</span>
        </button>

        <button
          onClick={() => {
            setActivePage('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-0.5 ${
            activePage === 'store' ? 'text-[#c5a880]' : 'hover:text-white'
          }`}
        >
          <MapPin size={18} />
          <span>Tex Valley</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center space-y-0.5 text-white relative"
        >
          <ShoppingBag size={18} />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c5a880] text-[#0e0f12] text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
