import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  LogIn,
  User as UserIcon,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    t,
    cartCount,
    wishlist,
    setIsCartOpen,
    setActivePage,
    searchQuery,
    setSearchQuery,
    currentUser,
    setLoginRoleTab,
    setMobileSidebarOpen
  } = useShop();

  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full">
      {/* 1. TOP ANNOUNCEMENT TICKER BANNER */}
      <div className="bg-[#141518] border-b border-[#2a2c32] text-[11px] font-medium tracking-widest text-[#c5a880] overflow-hidden py-1.5 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] inline-block animate-pulse"></span>
            <span>EXCLUSIVELY FOR MEN • TEX VALLEY MALL, PERUNDURAI OPEN 7 DAYS A WEEK</span>
          </span>
          <span className="text-[#a09a8e]">•</span>
          <span>
            FESTIVE PONGAL & WEDDING SAVINGS: FLAT 20% OFF WITH CODE:{' '}
            <strong className="text-white bg-[#c5a880]/20 px-1.5 py-0.5 rounded border border-[#c5a880]/40">
              EROFIRST
            </strong>
          </span>
          <span className="text-[#a09a8e]">•</span>
          <span>COMPLIMENTARY EXPRESS IN-STORE ALTERATIONS WITHIN 45 MINUTES</span>
          <span className="text-[#a09a8e]">•</span>
          <span>DRESS THE MAN YOU ARE BECOMING</span>
        </div>
      </div>

      {/* 2. SLIM TOP UTILITY BAR (NO DASHBOARD LINKS HERE — MOVED TO LEFT SIDEBAR) */}
      <div className="w-full px-4 sm:px-6 py-3 bg-[#0e0f12]/95 backdrop-blur-md border-b border-[#1f2026]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Mobile Left Sidebar Toggle + Compact Mobile Brand */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-[#161820] border border-[#2a2d38] text-[#e6d5b8] hover:text-white"
              aria-label="Open Left Navigation"
            >
              <Menu size={20} />
            </button>
            <div
              onClick={() => setActivePage('home')}
              className="cursor-pointer font-editorial font-bold tracking-[0.2em] text-lg text-white"
            >
              ERO<span className="text-[#c5a880]">MEN</span>
            </div>
          </div>

          {/* LIVE SEARCH INPUT */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a09a8e]" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setActivePage('shop');
                }
              }}
              placeholder="Search Men's Linen Shirts, Silk Veshtis, Suits..."
              className="w-full bg-[#15171e] border border-[#2b2e3a] rounded-lg pl-9 pr-16 py-2 text-xs text-white placeholder-[#787a82] focus:outline-none focus:border-[#c5a880]"
            />
            {searchQuery && (
              <button
                onClick={() => setActivePage('shop')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold uppercase rounded"
              >
                Go
              </button>
            )}

            {/* Quick suggestions dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#14161d] border border-[#2c2f3b] rounded-lg p-2.5 shadow-2xl z-40">
                <span className="text-[10px] uppercase tracking-wider text-[#8c8982] block mb-1.5">
                  Trending Men's Searches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Giza Linen', 'Pattu Veshti', 'Gurkha Trousers', '3-Piece Suit', 'Supima Polo'].map(term => (
                    <button
                      key={term}
                      onMouseDown={() => {
                        setSearchQuery(term);
                        setActivePage('shop');
                      }}
                      className="px-2 py-1 bg-[#1c1f29] hover:bg-[#c5a880] text-[#d1ccc4] hover:text-[#0e0f12] rounded text-[11px] font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT UTILITY ACTIONS */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 ml-auto">
            {/* Mobile Search shortcut */}
            <button
              onClick={() => setActivePage('shop')}
              className="sm:hidden p-2 text-[#d5cfc5] hover:text-[#c5a880]"
              aria-label="Search Catalog"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActivePage('shop')}
              className="p-2 text-[#d5cfc5] hover:text-[#c5a880] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Auth Status / Login Pill */}
            {!currentUser ? (
              <button
                onClick={() => {
                  setLoginRoleTab('customer');
                  setActivePage('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#323542] bg-[#15171e] hover:border-[#c5a880] text-xs font-semibold text-[#e6d5b8] transition-all"
              >
                <LogIn size={14} className="text-[#c5a880]" />
                <span>Sign In</span>
              </button>
            ) : currentUser.role === 'seller' ? (
              <button
                onClick={() => setActivePage('client-panel')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#c5a880]/60 bg-[#1a1814] text-xs font-bold text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0e0f12] transition-all"
              >
                <LayoutDashboard size={14} />
                <span className="hidden sm:inline">Owner Panel</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('my-orders')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#2c2f3b] bg-[#15171e] hover:border-[#c5a880] text-xs font-semibold text-white transition-all"
              >
                <UserIcon size={14} className="text-[#c5a880]" />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-[#c5a880] hover:bg-[#d8bd98] text-[#0e0f12] rounded font-semibold text-xs transition-all shadow-md active:scale-95"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline uppercase tracking-wider">{t('cart')}</span>
              <span className="w-5 h-5 bg-[#0e0f12] text-[#c5a880] text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
