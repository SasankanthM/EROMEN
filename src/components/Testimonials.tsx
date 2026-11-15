import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_TESTIMONIALS } from '../data/shopConfig';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language } = useShop();

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0c0d10] text-[#f4efe6] px-4 sm:px-8 border-b border-[#1c1e26]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
            {language === 'en' ? 'PATRON TESTIMONIALS' : 'வாடிக்கையாளர் நற்சான்றிதழ்கள்'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight mt-2">
            {language === 'en' ? 'Worn by Gentlemen of Distinction' : 'கொங்கு மண்டல வாடிக்கையாளர்களின் அனுபவம்'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#a09a8e] font-light">
            Read what grooms, corporate executives, and professors from Erode, Perundurai, and Coimbatore say about their EROMEN fit.
          </p>
        </div>

        {/* 3 TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_TESTIMONIALS.map(test => (
            <div
              key={test.id}
              className="bg-[#121419] border border-[#232632] rounded-2xl p-6 flex flex-col justify-between hover:border-[#c5a880]/50 transition-colors shadow-xl relative"
            >
              <Quote size={28} className="text-[#c5a880]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-[#c5a880]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#c5a880]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#d4cdbf] font-light italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#1e202a] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{test.name}</h4>
                  <p className="text-[11px] text-[#a09a8e]">{test.role}</p>
                  <p className="text-[10px] text-[#c5a880] flex items-center space-x-1 mt-0.5">
                    <MapPin size={10} />
                    <span>{test.location}</span>
                  </p>
                </div>

                {test.verifiedPurchase && (
                  <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded flex items-center space-x-1">
                    <CheckCircle size={10} />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
