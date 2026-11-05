import React from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import { Award, Compass, HeartHandshake, Scissors, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, setActivePage } = useShop();

  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-[#0a0b0e] text-[#f4efe6] px-4 sm:px-8 border-b border-[#1c1e26]">
      <div className="max-w-7xl mx-auto">
        {/* EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: CURATED EDITORIAL PHOTOGRAPHY (5 COLS) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2b2e3a] shadow-2xl aspect-[4/5] bg-[#14161c]">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                alt="EROMEN Bespoke Tailor at Tex Valley, Perundurai"
                className="w-full h-full object-cover brightness-[0.75] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-transparent to-transparent opacity-80" />

              {/* Floating Atelier Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#12141a]/90 backdrop-blur-md border border-[#303340]">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#c5a880] uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>TEX VALLEY ATELIER • ESTD. 2021</span>
                </div>
                <p className="text-xs text-[#d1ccc3] mt-1 font-light">
                  Located at Tex Valley Mall, the textile powerhouse of South India, Perundurai.
                </p>
              </div>
            </div>

            {/* Overlapping small accent card */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-[#161820] border border-[#c5a880]/40 p-4 rounded-xl shadow-2xl max-w-xs backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-[#c5a880] tracking-widest">
                QUALITY CREED
              </span>
              <p className="text-xs text-white mt-1 font-editorial italic">
                "We don't sell clothes. We engineer the poise of the gentleman you are stepping into."
              </p>
            </div>
          </div>

          {/* RIGHT: THE STORY & PILLARS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
                <Compass size={14} />
                <span>{language === 'en' ? 'OUR HERITAGE & VISION' : 'எங்கள் பாரம்பரியமும் தொலைநோக்கும்'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight leading-tight">
                {language === 'en' ? (
                  <>
                    Rooted in the Kongu Corridor. <br />
                    <span className="text-[#c5a880] italic">Tailored for the World.</span>
                  </>
                ) : (
                  <>
                    கொங்கு மண்டல மண்ணின் பெருமை. <br />
                    <span className="text-[#c5a880] italic">உலகத்தரம் வாய்ந்த தையல் நேர்த்தி.</span>
                  </>
                )}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#d0cac0] font-light leading-relaxed">
              {language === 'en'
                ? `Born at the crossroads of Tamil Nadu's historic textile capital in Perundurai and Erode, EROMEN was founded on a singular conviction: a gentleman should never have to travel to London or Milan to wear a garment of true sartorial distinction.`
                : `பெருந்துறை மற்றும் ஈரோட்டின் நூற்றாண்டு பாரம்பரிய கைத்தறி வளத்திலிருந்து உதித்த EROMEN, நவீன ஆடைகளுக்கான சர்வதேச தரத்தை உள்ளூரிலேயே வழங்குகிறது.`}
            </p>

            <p className="text-xs sm:text-sm text-[#a09a8e] font-light leading-relaxed">
              {language === 'en'
                ? `Located inside the grand corridors of Tex Valley Mall, our flagship boutique houses master tailors, certified weavers, and fabric specialists who ensure every collar sits proud, every seam holds firm, and every veshti zari gleams with unadulterated silver and gold.`
                : `டெக்ஸ் வேலி மாலில் அமைந்துள்ள எங்கள் கிளையில், அனுபவம் வாய்ந்த தையல் கலைஞர்கள் மூலம் உடனுக்குடன் ஆடை அளவு திருத்தம் மற்றும் பிரத்யேக ஆலோசனை வழங்கப்படுகிறது.`}
            </p>

            {/* 4 CORE COMMITMENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="bg-[#13151b] border border-[#232632] p-4 rounded-xl flex items-start space-x-3">
                <Scissors size={20} className="text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    45-Min Express Alteration
                  </h4>
                  <p className="text-[11px] text-[#a09a8e] mt-1">
                    On-site tailoring team right inside Tex Valley for immediate personalized fit.
                  </p>
                </div>
              </div>

              <div className="bg-[#13151b] border border-[#232632] p-4 rounded-xl flex items-start space-x-3">
                <Award size={20} className="text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    100% Certified Natural Weaves
                  </h4>
                  <p className="text-[11px] text-[#a09a8e] mt-1">
                    Authentic Egyptian Giza cottons, pure Mulberry silks, and genuine selvedge denim.
                  </p>
                </div>
              </div>

              <div className="bg-[#13151b] border border-[#232632] p-4 rounded-xl flex items-start space-x-3">
                <HeartHandshake size={20} className="text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Direct Artisan Support
                  </h4>
                  <p className="text-[11px] text-[#a09a8e] mt-1">
                    Empowering master weavers and pattern makers across Erode, Bhavani and Tirupur.
                  </p>
                </div>
              </div>

              <div className="bg-[#13151b] border border-[#232632] p-4 rounded-xl flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Personalized Stylist Suite
                  </h4>
                  <p className="text-[11px] text-[#a09a8e] mt-1">
                    Private fitting rooms and groom entourage styling consultations.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION */}
            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={() => setActivePage('store')}
                className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-widest rounded transition-all shadow-lg"
              >
                Visit Our Tex Valley Store
              </button>
              <button
                onClick={() => setActivePage('shop')}
                className="px-5 py-3 border border-[#373a48] hover:border-[#c5a880] text-xs font-semibold uppercase tracking-wider text-[#d6d0c4] hover:text-white rounded transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
