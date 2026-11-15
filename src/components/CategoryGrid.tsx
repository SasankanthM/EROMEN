import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setActivePage, setSelectedCategory, language } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName as ProductCategory);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0a0b0d] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
            {language === 'en' ? 'CURATED DEPARTMENTS' : 'ஆடை பிரிவுகள்'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-editorial tracking-tight mt-2">
            {language === 'en' ? 'Shop By Category' : 'பிரிவு வாரியாக தேர்வு செய்க'}
          </h2>
          <p className="mt-3 text-sm text-[#a09a8e] font-light">
            {language === 'en'
              ? 'From handwoven ceremonial silks to contemporary European cuts tailored for Perundurai gentlemen.'
              : 'தூய பட்டு வேஷ்டி, குர்தாக்கள் முதல் இத்தாலிய பாணி கோட் சூட் வரை அனைத்தும் ஒரே இடத்தில்.'}
          </p>
        </div>

        {/* MASONRY / ASYMMETRICAL LUXURY EDITORIAL TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group relative h-72 sm:h-84 overflow-hidden rounded-xl border border-[#22242c] cursor-pointer hover:border-[#c5a880]/70 transition-all duration-500 shadow-xl ${
                idx === 0 || idx === 1 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* CATEGORY BACKGROUND IMAGE */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.6] group-hover:brightness-[0.7]"
                loading="lazy"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-[#0e0f12]/40 to-transparent" />

              {/* TOP COUNT BADGE */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 bg-[#121316]/80 backdrop-blur-md rounded-full text-[10px] font-mono tracking-wider uppercase text-[#e6d5b8] border border-[#2d3039]">
                  {cat.count}
                </span>
              </div>

              {/* BOTTOM EDITORIAL DETAILS */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-editorial group-hover:text-[#c5a880] transition-colors flex items-center space-x-1.5">
                    <span>{language === 'en' ? cat.name : cat.nameTa}</span>
                  </h3>
                  <p className="text-xs text-[#d1cbc0] mt-1 font-light line-clamp-1 max-w-xs">
                    {cat.desc}
                  </p>
                </div>

                {/* ARROW BUTTON */}
                <div className="w-9 h-9 rounded-full bg-[#171920] border border-[#373a46] group-hover:bg-[#c5a880] group-hover:text-[#0e0f12] text-white flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
