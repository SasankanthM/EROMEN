import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

export const LookbookGallery: React.FC = () => {
  const { setQuickViewProduct, language } = useShop();

  const lookbookItems = [
    {
      id: 'look-1',
      title: 'The Modern Muhurtham Groom',
      product: PRODUCTS.find(p => p.id === 'eromen-eth-01') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=900&auto=format&fit=crop',
      tag: 'Pure Mulberry Silk'
    },
    {
      id: 'look-2',
      title: 'Savile Row Italian 3-Piece',
      product: PRODUCTS.find(p => p.id === 'eromen-frm-01') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop',
      tag: 'Super 130s Merino'
    },
    {
      id: 'look-3',
      title: 'Bespoke Gurkha Pleats & Linen',
      product: PRODUCTS.find(p => p.id === 'eromen-tr-01') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop',
      tag: 'Double Forward Pleat'
    },
    {
      id: 'look-4',
      title: 'Executive Double-Breasted Camel',
      product: PRODUCTS.find(p => p.id === 'eromen-frm-02') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop',
      tag: 'Cashmere Blend'
    },
    {
      id: 'look-5',
      title: 'Cutaway Collar Giza Linen',
      product: PRODUCTS.find(p => p.id === 'eromen-sh-01') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop',
      tag: '100% Egyptian Giza'
    },
    {
      id: 'look-6',
      title: 'Shuttle Loom Selvedge Raw Denim',
      product: PRODUCTS.find(p => p.id === 'eromen-jn-01') || PRODUCTS[0],
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=900&auto=format&fit=crop',
      tag: 'Kuroki Selvedge 13.5oz'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0a0b0d] px-4 sm:px-8 border-b border-[#1c1e26]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880] mb-2">
              <Instagram size={14} />
              <span>@EROMEN_MENSWEAR • EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
              {language === 'en' ? 'The EROMEN Lookbook' : 'ஸ்டைல் ஆடைப் புகைப்படங்கள்'}
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#c5a880] hover:underline uppercase tracking-wider"
          >
            <span>Follow on Instagram for Daily Looks</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 6-IMAGE EDITORIAL GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lookbookItems.map(item => (
            <div
              key={item.id}
              onClick={() => setQuickViewProduct(item.product)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#15171d] border border-[#232631] cursor-pointer hover:border-[#c5a880] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.75] group-hover:brightness-[0.9]"
                loading="lazy"
              />

              {/* Tag pill */}
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2 py-0.5 bg-[#0e1014]/80 backdrop-blur-md rounded text-[9px] font-mono tracking-wider text-[#c5a880] border border-[#2e313d]">
                  {item.tag}
                </span>
              </div>

              {/* Hover overlay with 'Shop This Look' */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold text-[#c5a880]">Shop This Look &rarr;</span>
                <h4 className="text-xs font-semibold text-white line-clamp-1 mt-0.5">{item.title}</h4>
                <p className="text-[11px] font-bold text-white font-editorial mt-0.5">₹{item.product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
