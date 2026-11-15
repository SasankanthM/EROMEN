import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { FESTIVAL_DEAL } from '../data/shopConfig';
import { Clock, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export const FestivalOfferStrip: React.FC = () => {
  const { language, applyCoupon, showToast, setActivePage, setSelectedCategory } = useShop();
  const [copied, setCopied] = useState(false);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 6,
    hours: 14,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const target = new Date(FESTIVAL_DEAL.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(FESTIVAL_DEAL.code);
    applyCoupon(FESTIVAL_DEAL.code);
    setCopied(true);
    showToast(`Code "${FESTIVAL_DEAL.code}" copied & applied to your cart!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full bg-gradient-to-r from-[#171410] via-[#211b14] to-[#171410] border-y border-[#3a2e1d] relative overflow-hidden py-10 px-4 sm:px-8">
      {/* Subtle gold ornamentation background */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* LEFT: FESTIVAL TITLE & TEXT */}
        <div className="text-center lg:text-left space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#c5a880]/20 border border-[#c5a880]/40 rounded-full text-xs font-bold tracking-widest text-[#e6d5b8] uppercase">
            <Sparkles size={12} className="text-[#e6c17e]" />
            <span>{language === 'en' ? FESTIVAL_DEAL.badge : FESTIVAL_DEAL.badgeTa}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-editorial tracking-tight">
            {language === 'en' ? FESTIVAL_DEAL.title : FESTIVAL_DEAL.titleTa}
          </h2>

          <p className="text-xs sm:text-sm text-[#d4cdbf] font-light leading-relaxed">
            {FESTIVAL_DEAL.description}
          </p>
        </div>

        {/* MIDDLE: LIVE COUNTDOWN TIMER BLOCKS */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          <div className="flex flex-col items-center justify-center w-14 h-16 sm:w-18 sm:h-20 bg-[#121316] border border-[#3e3422] rounded-lg shadow-xl">
            <span className="text-xl sm:text-2xl font-bold font-editorial text-[#e6d5b8]">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-wider uppercase text-[#a09a8e]">
              {language === 'en' ? 'Days' : 'நாட்கள்'}
            </span>
          </div>
          <span className="text-xl font-bold text-[#c5a880]">:</span>

          <div className="flex flex-col items-center justify-center w-14 h-16 sm:w-18 sm:h-20 bg-[#121316] border border-[#3e3422] rounded-lg shadow-xl">
            <span className="text-xl sm:text-2xl font-bold font-editorial text-[#e6d5b8]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-wider uppercase text-[#a09a8e]">
              {language === 'en' ? 'Hours' : 'மணி'}
            </span>
          </div>
          <span className="text-xl font-bold text-[#c5a880]">:</span>

          <div className="flex flex-col items-center justify-center w-14 h-16 sm:w-18 sm:h-20 bg-[#121316] border border-[#3e3422] rounded-lg shadow-xl">
            <span className="text-xl sm:text-2xl font-bold font-editorial text-[#e6d5b8]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-wider uppercase text-[#a09a8e]">
              {language === 'en' ? 'Mins' : 'நிமிடம்'}
            </span>
          </div>
          <span className="text-xl font-bold text-[#c5a880]">:</span>

          <div className="flex flex-col items-center justify-center w-14 h-16 sm:w-18 sm:h-20 bg-[#121316] border border-[#3e3422] rounded-lg shadow-xl">
            <span className="text-xl sm:text-2xl font-bold font-editorial text-[#c5a880] animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-wider uppercase text-[#a09a8e]">
              {language === 'en' ? 'Secs' : 'விநாடி'}
            </span>
          </div>
        </div>

        {/* RIGHT: COUPON CODE BUTTON & SHOP NOW */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Coupon Code Pill */}
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-2.5 px-4 py-3 bg-[#131418] hover:bg-[#1b1c22] border-2 border-dashed border-[#c5a880] rounded text-xs font-mono font-bold text-[#e6d5b8] tracking-wider transition-all group"
            title="Click to copy coupon code"
          >
            <span className="text-[#a09a8e] group-hover:text-white uppercase font-sans text-[10px]">
              CODE:
            </span>
            <span className="text-[#c5a880]">{FESTIVAL_DEAL.code}</span>
            {copied ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <Copy size={16} className="text-[#a09a8e] group-hover:text-white" />
            )}
          </button>

          {/* Shop Festive Collection */}
          <button
            onClick={() => {
              setActivePage('shop');
              setSelectedCategory('Ethnic Wear');
            }}
            className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-widest rounded flex items-center space-x-2 transition-all shadow-lg active:scale-95"
          >
            <span>{language === 'en' ? 'Shop Festive' : 'ஆடைகளை காண்க'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
