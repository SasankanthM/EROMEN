import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  MapPin,
  Menu,
  X,
  Languages,
  ChevronDown,
  Percent,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    toggleLanguage,
    cartCount,
    wishlist,
    setIsCartOpen,
    activePage,
    setActivePage,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setIsStyleQuizOpen,
    setIsWardrobeOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories: ProductCategory[] = [
    'Shirts',
    'Ethnic Wear',
    'Formal Wear',
    'Trousers',
    'Jeans',
    'T-Shirts',
    'Accessories'
  ];

  const handleNavClick = (page: string, category?: ProductCategory) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT TICKER BANNER */}
      <div className="bg-[#141518] border-b border-[#2a2c32] text-xs font-medium tracking-widest text-[#c5a880] overflow-hidden py-1.5 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] inline-block animate-pulse"></span>
            <span>TEX VALLEY MALL, PERUNDURAI FLAGSHIP STORE OPEN 7 DAYS A WEEK</span>
          </span>
          <span className="text-[#a09a8e]">•</span>
          <span>FESTIVE PONGAL & WEDDING SAVINGS: FLAT 20% OFF WITH CODE: <strong className="text-white bg-[#c5a880]/20 px-1.5 py-0.5 rounded border border-[#c5a880]/40">EROFIRST</strong></span>
          <span className="text-[#a09a8e]">•</span>
          <span>COMPLIMENTARY EXPRESS IN-STORE ALTERATIONS WITHIN 45 MINUTES</span>
          <span className="text-[#a09a8e]">•</span>
          <span>DIRECT WHATSAPP CONCIERGE & LOCAL PICKUP AT TEX VALLEY</span>
          <span className="text-[#a09a8e]">•</span>
          <span>DRESS THE MAN YOU ARE BECOMING</span>
        </div>
      </div>

      {/* 2. MAIN LUXURY NAV BAR */}
      <nav
        className={`w-full px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0f12]/95 backdrop-blur-md shadow-2xl border-b border-[#24262c]'
            : 'bg-[#0e0f12]/90 backdrop-blur-sm border-b border-[#1f2026]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#e6d5b8] hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* BRAND LOGO */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex flex-col items-center lg:items-start text-center select-none"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl sm:text-3xl font-bold tracking-[0.22em] text-white font-editorial group-hover:text-[#c5a880] transition-colors">
                ERO<span className="text-[#c5a880]">MEN</span>
              </span>
              <span className="text-xs text-[#c5a880] transform group-hover:rotate-45 transition-transform duration-300">
                ✦
              </span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-[#a09a8e] uppercase -mt-1 font-sans">
              TEX VALLEY • PERUNDURAI
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase text-[#d5cfc5]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#c5a880] transition-colors py-1 ${
                activePage === 'home' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
              }`}
            >
              {t('home')}
            </button>

            {/* Shop Collection Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('shop')}
                className={`flex items-center space-x-1 hover:text-[#c5a880] transition-colors py-1 ${
                  activePage === 'shop' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
                }`}
              >
                <span>{t('shop')}</span>
                <ChevronDown size={14} className="opacity-70" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#14161a] border border-[#2b2d35] rounded-lg shadow-2xl py-3 px-2 backdrop-blur-xl">
                    <div className="text-[10px] uppercase text-[#a09a8e] px-3 pb-2 border-b border-[#23252d] tracking-widest font-semibold">
                      Curated Categories
                    </div>
                    {navCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleNavClick('shop', cat)}
                        className="w-full text-left px-3 py-2 text-xs rounded hover:bg-[#20222a] hover:text-[#c5a880] text-[#ded9cf] flex items-center justify-between transition-colors"
                      >
                        <span>{cat}</span>
                        <span className="text-[10px] text-[#7d7971]">Explore →</span>
                      </button>
                    ))}
                    <div className="mt-2 pt-2 border-t border-[#23252d] px-3">
                      <button
                        onClick={() => handleNavClick('shop', 'All')}
                        className="text-[11px] text-[#c5a880] hover:underline font-bold"
                      >
                        {t('allProducts')} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Virtual Wardrobe */}
            <button
              onClick={() => {
                setActivePage('wardrobe');
                setIsWardrobeOpen(true);
              }}
              className={`flex items-center space-x-1.5 hover:text-[#c5a880] transition-colors py-1 ${
                activePage === 'wardrobe' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
              }`}
            >
              <Sparkles size={14} className="text-[#c5a880]" />
              <span>{t('virtualWardrobe')}</span>
              <span className="text-[9px] bg-[#c5a880]/20 text-[#c5a880] px-1.5 py-0.2 rounded-full border border-[#c5a880]/40">
                Mix & Match
              </span>
            </button>

            {/* Style Me Quiz */}
            <button
              onClick={() => setIsStyleQuizOpen(true)}
              className="flex items-center space-x-1 hover:text-[#c5a880] transition-colors py-1 group"
            >
              <Compass size={14} className="text-[#c5a880] group-hover:rotate-45 transition-transform" />
              <span>{t('styleMeQuiz')}</span>
            </button>

            {/* Offers */}
            <button
              onClick={() => handleNavClick('offers')}
              className={`flex items-center space-x-1 hover:text-[#c5a880] transition-colors py-1 ${
                activePage === 'offers' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
              }`}
            >
              <Percent size={13} className="text-[#e27d60]" />
              <span className="text-[#e6c17e]">{t('offers')}</span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#c5a880] transition-colors py-1 ${
                activePage === 'about' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
              }`}
            >
              {t('about')}
            </button>

            {/* Store & Contact */}
            <button
              onClick={() => handleNavClick('store')}
              className={`flex items-center space-x-1 hover:text-[#c5a880] transition-colors py-1 ${
                activePage === 'store' ? 'text-[#c5a880] border-b-2 border-[#c5a880]' : ''
              }`}
            >
              <MapPin size={13} className="text-[#c5a880]" />
              <span>{t('store')}</span>
            </button>
          </div>

          {/* RIGHT UTILITIES */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Language Toggle: EN | தமிழ் */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-[#343740] bg-[#16181d] text-xs font-medium text-[#ded9cf] hover:border-[#c5a880] hover:text-[#c5a880] transition-all"
              title="Switch language between English and தமிழ்"
            >
              <Languages size={13} className="text-[#c5a880]" />
              <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#d5cfc5] hover:text-[#c5a880] transition-colors relative"
              aria-label="Search Catalog"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('shop')}
              className="p-2 text-[#d5cfc5] hover:text-[#c5a880] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-[#c5a880] hover:bg-[#d8bd98] text-[#0e0f12] rounded font-semibold text-xs transition-all shadow-md active:scale-95"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline uppercase tracking-wider">{t('cart')}</span>
              <span className="w-5 h-5 bg-[#0e0f12] text-[#c5a880] text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE LIVE SEARCH BAR */}
        {searchOpen && (
          <div className="max-w-3xl mx-auto mt-3 pt-3 border-t border-[#23252d] pb-2">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3.5 text-[#a09a8e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleNavClick('shop');
                    setSearchOpen(false);
                  }
                }}
                placeholder="Search Linen Shirts, Silk Veshti, Gurkha Trousers, Suits, Polo..."
                className="w-full bg-[#181a20] border border-[#353844] rounded-lg pl-10 pr-24 py-2.5 text-sm text-white placeholder-[#787a82] focus:outline-none focus:border-[#c5a880]"
                autoFocus
              />
              <button
                onClick={() => {
                  handleNavClick('shop');
                  setSearchOpen(false);
                }}
                className="absolute right-2 px-3 py-1 bg-[#c5a880] text-[#0e0f12] text-xs font-bold rounded uppercase tracking-wider hover:bg-[#e6d5b8]"
              >
                Search
              </button>
            </div>
            {/* Quick suggested chips */}
            <div className="flex flex-wrap gap-1.5 mt-2 text-[11px] text-[#a09a8e]">
              <span className="py-0.5">Popular:</span>
              {['Giza Linen', 'Pattu Veshti', 'Gurkha Trousers', 'Wedding Suit', 'Supima Polo'].map(term => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    handleNavClick('shop');
                    setSearchOpen(false);
                  }}
                  className="px-2 py-0.5 bg-[#1e2027] hover:bg-[#2b2e38] hover:text-[#c5a880] rounded text-[#d1ccc4] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SLIDE-DOWN DRAWER MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#22242c] space-y-3 pb-4">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#1a1c22] rounded"
            >
              {t('home')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#1a1c22] rounded"
            >
              {t('shop')} (All Categories)
            </button>

            {/* Mobile Categories grid */}
            <div className="grid grid-cols-2 gap-2 pl-3 pr-2 py-1">
              {navCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleNavClick('shop', cat)}
                  className="text-left text-xs text-[#a09a8e] hover:text-[#c5a880] py-1"
                >
                  • {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActivePage('wardrobe');
                setIsWardrobeOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-[#c5a880] hover:bg-[#1a1c22] rounded"
            >
              <Sparkles size={16} />
              <span>{t('virtualWardrobe')}</span>
            </button>
            <button
              onClick={() => {
                setIsStyleQuizOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#1a1c22] rounded"
            >
              <Compass size={16} />
              <span>{t('styleMeQuiz')} (Outfit Wizard)</span>
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className="flex items-center space-x-2 w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-[#e27d60] hover:bg-[#1a1c22] rounded"
            >
              <Percent size={16} />
              <span>{t('offers')}</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#1a1c22] rounded"
            >
              {t('about')}
            </button>
            <button
              onClick={() => handleNavClick('store')}
              className="flex items-center space-x-2 w-full text-left py-2 px-3 text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#1a1c22] rounded"
            >
              <MapPin size={16} />
              <span>Tex Valley Store & Directions</span>
            </button>

            <div className="pt-3 border-t border-[#22242c] flex items-center justify-between px-3">
              <span className="text-xs text-[#a09a8e]">Tex Valley, Perundurai</span>
              <a
                href={`tel:${SHOP_CONFIG.phone}`}
                className="text-xs text-[#c5a880] font-bold underline"
              >
                Call: {SHOP_CONFIG.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
