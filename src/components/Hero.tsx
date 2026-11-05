import React from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import { Sparkles, ArrowRight, MapPin, ShieldCheck, Scissors, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActivePage, setSelectedCategory, setIsWardrobeOpen, setIsStyleQuizOpen, language } = useShop();

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* BACKGROUND CINEMATIC IMAGERY WITH LUXURY GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=85&w=2000&auto=format&fit=crop"
          alt="EROMEN Luxury Menswear Tex Valley Perundurai"
          className="w-full h-full object-cover object-top scale-105 animate-pulse duration-[10000ms] brightness-[0.45] contrast-[1.15]"
        />
        {/* Editorial vignetting and moody lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-[#0c0d0e]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0c0d0e]/40 to-[#0c0d0e]" />
      </div>

      {/* AMBIENT GOLD GLOW ACCENTS */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#c5a880]/15 blur-[120px] rounded-full pointer-events-none" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        {/* REVEAL BADGE */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 bg-[#15161b]/80 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#e6d5b8]">
            {language === 'en'
              ? 'TEX VALLEY MALL, PERUNDURAI • FLAGSHIP ATELIER'
              : 'டெக்ஸ் வேலி மால், பெருந்துறை • தலைமை ஆடை மையம்'}
          </span>
        </div>

        {/* BOLD EDITORIAL HEADLINE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl font-editorial">
          {language === 'en' ? (
            <>
              Dress The Man <br className="hidden sm:block" />
              <span className="gold-shimmer italic font-normal">You Are Becoming.</span>
            </>
          ) : (
            <>
              நீங்கள் மாறவிருக்கும் ஆளுமைக்கான <br className="hidden sm:block" />
              <span className="gold-shimmer italic font-normal">அரச பாரம்பரிய ஆடை அலங்காரம்.</span>
            </>
          )}
        </h1>

        {/* EDITORIAL SUBTITLE */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#d0cac0] max-w-2xl font-light leading-relaxed">
          {language === 'en'
            ? 'Bridging bespoke European tailoring with the handloom mastery of the Kongu corridor. Pure Giza linen, Italian cut suits, and ceremonial wedding silks.'
            : 'கொங்கு மண்டல கைத்தறி நுட்பமும் சர்வதேச இத்தாலிய தையல் கலை நேர்த்தியும் இணையும் பெருந்துறை டெக்ஸ் வேலியின் பிரீமியம் மென்ஸ்வேர்.'}
        </p>

        {/* PRIMARY CALLS TO ACTION */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Explore Collection */}
          <button
            onClick={() => {
              setActivePage('shop');
              setSelectedCategory('All');
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] hover:bg-[#d9bd95] text-[#0e0f12] font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 shadow-2xl hover:shadow-[#c5a880]/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 group"
          >
            <span>{language === 'en' ? 'Explore New Arrivals' : 'புதிய வரவுகளை காண்க'}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Virtual Wardrobe Mix & Match */}
          <button
            onClick={() => {
              setIsWardrobeOpen(true);
            }}
            className="w-full sm:w-auto px-7 py-4 border border-[#c5a880]/50 hover:border-[#c5a880] bg-[#14161b]/80 hover:bg-[#1c1f26] text-[#f4efe6] font-semibold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2 group"
          >
            <Sparkles size={15} className="text-[#c5a880] group-hover:rotate-12 transition-transform" />
            <span>{language === 'en' ? 'Virtual Wardrobe (Mix & Match)' : 'மெய்நிகர் ஆடை ஜோடி தேர்வு'}</span>
          </button>

          {/* Style Me Quiz */}
          <button
            onClick={() => setIsStyleQuizOpen(true)}
            className="w-full sm:w-auto px-5 py-4 text-xs font-semibold tracking-wider uppercase text-[#c5a880] hover:text-white transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>✦ Style Quiz</span>
          </button>
        </div>

        {/* STATS & ASSURANCE STRIP */}
        <div className="mt-14 pt-8 border-t border-[#252730] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl w-full">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded bg-[#171920] border border-[#2b2e39] text-[#c5a880]">
              <Scissors size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">45-Min Alteration</h4>
              <p className="text-xs text-[#a09a8e] mt-0.5">Complimentary express tailoring in Tex Valley</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded bg-[#171920] border border-[#2b2e39] text-[#c5a880]">
              <Award size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Mulberry & Giza</h4>
              <p className="text-xs text-[#a09a8e] mt-0.5">100% certified long staple natural fibers</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded bg-[#171920] border border-[#2b2e39] text-[#c5a880]">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Tex Valley, Erode</h4>
              <p className="text-xs text-[#a09a8e] mt-0.5">Ground floor luxury avenue, NH 544</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded bg-[#171920] border border-[#2b2e39] text-[#c5a880]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Direct WhatsApp</h4>
              <p className="text-xs text-[#a09a8e] mt-0.5">Order on chat with instant video preview</p>
            </div>
          </div>
        </div>
      </div>

      {/* SUBTLE BOTTOM CORNER SCROLL INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] tracking-widest text-[#a09a8e] uppercase pointer-events-none opacity-70">
        <span>SCROLL DOWN</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-[#c5a880] to-transparent mt-1 animate-bounce" />
      </div>
    </section>
  );
};
