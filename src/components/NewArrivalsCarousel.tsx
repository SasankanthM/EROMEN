import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { Eye, Heart, ShoppingBag, ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

export const NewArrivalsCarousel: React.FC = () => {
  const {
    language,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setActivePage,
    setSelectedCategory
  } = useShop();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [scrollIndex, setScrollIndex] = useState(0);

  const filterTabs = ['All', 'Shirts', 'Ethnic Wear', 'Formal Wear', 'Trousers'];

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeFilter === 'All') return p.isNewArrival || p.isFeatured;
    return p.category === activeFilter;
  });

  const handleNext = () => {
    setScrollIndex(prev => Math.min(prev + 1, Math.max(0, filteredProducts.length - 3)));
  };

  const handlePrev = () => {
    setScrollIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0c0d10] px-4 sm:px-8 border-b border-[#1c1e24]">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER WITH SUBTLE LUXURY EDITORIAL TOUCH */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880] mb-2">
              <Sparkles size={14} />
              <span>{language === 'en' ? 'CURATED ATELIER EDIT' : 'தேர்ந்தெடுக்கப்பட்ட புதிய வரவுகள்'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-editorial tracking-tight">
              {language === 'en' ? 'New Arrivals & Icons' : 'புதிய வரவுகள் & பிரத்யேக ஆடைகள்'}
            </h2>
          </div>

          {/* FILTER TABS & NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between md:justify-end space-x-4 flex-wrap gap-y-3">
            <div className="flex items-center bg-[#15171d] p-1 rounded-lg border border-[#242732] overflow-x-auto max-w-full">
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveFilter(tab);
                    setScrollIndex(0);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                    activeFilter === tab
                      ? 'bg-[#c5a880] text-[#0e0f12] font-bold shadow-md'
                      : 'text-[#a09a8e] hover:text-white hover:bg-[#1d2027]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={scrollIndex === 0}
                className="p-2.5 rounded-full border border-[#2a2c35] bg-[#14151a] text-[#ded9cf] hover:border-[#c5a880] hover:text-[#c5a880] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Previous Slide"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={scrollIndex >= Math.max(0, filteredProducts.length - 3)}
                className="p-2.5 rounded-full border border-[#2a2c35] bg-[#14151a] text-[#ded9cf] hover:border-[#c5a880] hover:text-[#c5a880] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Next Slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTS CAROUSEL / GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(scrollIndex, scrollIndex + 4).map(product => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-[#131418] border border-[#22242c] rounded-xl overflow-hidden hover:border-[#c5a880]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a880]/10 flex flex-col"
              >
                {/* PRODUCT IMAGE & HOVER ACTIONS */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#181a20]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient bottom shadow for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131418] via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                  {/* BADGES: Discount / New / Best Seller */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.discountPercentage > 0 && (
                      <span className="px-2 py-0.5 bg-[#8b1e1e] text-white text-[10px] font-bold tracking-widest uppercase rounded shadow">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-2 py-0.5 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold tracking-widest uppercase rounded shadow">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#14151a]/80 backdrop-blur-md text-[#d5cfc5] hover:text-[#e05252] hover:bg-[#14151a] transition-all z-10"
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart
                      size={16}
                      className={inWishlist ? 'fill-[#e05252] text-[#e05252]' : ''}
                    />
                  </button>

                  {/* QUICK VIEW TRIGGER (Appears on Hover) */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 z-10">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 py-2.5 px-3 bg-[#171920]/90 backdrop-blur-md hover:bg-[#c5a880] text-white hover:text-[#0e0f12] text-xs font-semibold tracking-wider uppercase rounded flex items-center justify-center space-x-1.5 transition-all shadow-lg"
                    >
                      <Eye size={14} />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-[#c5a880] hover:bg-[#dfc29a] text-[#0e0f12] rounded transition-all shadow-lg"
                      title="Instant Add to Cart"
                    >
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#a09a8e] mb-1">
                      <span className="uppercase tracking-wider font-medium text-[#c5a880]">
                        {product.category}
                      </span>
                      <span>★ {product.rating} ({product.reviewCount})</span>
                    </div>

                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-1"
                    >
                      {language === 'en' ? product.name : product.nameTa || product.name}
                    </h3>

                    <p className="text-xs text-[#9d978d] mt-1 line-clamp-1 font-light">
                      {product.fabric}
                    </p>
                  </div>

                  {/* PRICE & SIZES STRIP */}
                  <div className="pt-2 border-t border-[#1f2129] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-base font-bold text-white font-editorial">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-[#7d7971] line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock badge */}
                    <span className="text-[10px] text-emerald-400 font-medium">
                      In Tex Valley
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM EXPLORE FULL CATALOG CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setActivePage('shop');
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-8 py-3.5 border border-[#3e414f] hover:border-[#c5a880] rounded bg-[#13151a] hover:bg-[#1a1c24] text-xs font-bold tracking-[0.2em] uppercase text-[#e6d5b8] transition-all group"
          >
            <span>{language === 'en' ? 'View Entire EROMEN Catalog (20+ Items)' : 'அனைத்து ஆடைகளையும் காண்க'}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
