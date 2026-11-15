import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import { ProductCategory } from '../types';
import {
  Home,
  ShoppingBag,
  Sparkles,
  Compass,
  Percent,
  BookOpen,
  MapPin,
  LayoutDashboard,
  LogIn,
  LogOut,
  User as UserIcon,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Languages,
  Phone,
  X,
  ShieldCheck
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const {
    t,
    language,
    toggleLanguage,
    activePage,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    setIsStyleQuizOpen,
    setIsWardrobeOpen,
    currentUser,
    logout,
    setLoginRoleTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    orders
  } = useShop();

  const [shopExpanded, setShopExpanded] = useState(true);

  const navCategories: ProductCategory[] = [
    'All',
    'Shirts',
    'Ethnic Wear',
    'Formal Wear',
    'Trousers',
    'Jeans',
    'T-Shirts',
    'Accessories',
    'Innerwear'
  ];

  const handleNavigate = (page: string, category?: ProductCategory) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenClientPanel = () => {
    if (
      currentUser?.role === 'seller' &&
      currentUser.email.toLowerCase() === 'eromen20@gmail.com'
    ) {
      handleNavigate('client-panel');
    } else {
      setLoginRoleTab('seller');
      handleNavigate('login');
    }
  };

  const pendingOrdersCount = orders.filter(
    o => o.status === 'Order Received' || o.status === 'In Tailoring & Alteration'
  ).length;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#0b0c0f] border-r border-[#1f2129] text-[#dcd7ce] select-none">
      {/* TOP BRAND HEADER */}
      <div className="p-5 border-b border-[#1d1f27] flex items-center justify-between">
        <div
          onClick={() => handleNavigate('home')}
          className="cursor-pointer group flex flex-col"
        >
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-bold tracking-[0.22em] text-white font-editorial group-hover:text-[#c5a880] transition-colors">
              ERO<span className="text-[#c5a880]">MEN</span>
            </span>
            <span className="text-xs text-[#c5a880] group-hover:rotate-45 transition-transform">✦</span>
          </div>
          <span className="text-[9px] tracking-[0.22em] text-[#a09a8e] uppercase mt-0.5">
            MEN'S ATELIER • TEX VALLEY
          </span>
        </div>

        {/* Close button on mobile */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-[#a09a8e] hover:text-white hover:bg-[#191b22]"
          aria-label="Close Sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* SCROLLABLE NAVIGATION LIST */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* SECTION 1: STOREFRONT & EXPERIENCES */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#787a82]">
            Menswear Storefront
          </div>

          <button
            onClick={() => handleNavigate('home')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activePage === 'home'
                ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
            }`}
          >
            <Home size={16} />
            <span>{t('home')}</span>
          </button>

          {/* Shop Collection with expandable sub-categories */}
          <div>
            <div
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activePage === 'shop'
                  ? 'bg-[#1b1d26] text-[#c5a880] border border-[#c5a880]/40'
                  : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
              }`}
            >
              <button
                onClick={() => handleNavigate('shop', 'All')}
                className="flex items-center space-x-3 flex-1 text-left"
              >
                <ShoppingBag size={16} />
                <span>{t('shop')}</span>
              </button>
              <button
                onClick={() => setShopExpanded(!shopExpanded)}
                className="p-0.5 text-[#8c8982] hover:text-white"
                aria-label="Toggle Categories"
              >
                {shopExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>

            {shopExpanded && (
              <div className="mt-1 ml-4 pl-3 border-l border-[#232530] space-y-0.5">
                {navCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleNavigate('shop', cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] transition-colors flex items-center justify-between ${
                      activePage === 'shop' && selectedCategory === cat
                        ? 'text-[#c5a880] font-bold bg-[#171922]'
                        : 'text-[#9d978d] hover:text-white hover:bg-[#14161d]'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Menswear' : cat}</span>
                    {activePage === 'shop' && selectedCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleNavigate('wardrobe');
              setIsWardrobeOpen(true);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activePage === 'wardrobe'
                ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Sparkles size={16} className={activePage === 'wardrobe' ? 'text-[#0e0f12]' : 'text-[#c5a880]'} />
              <span>{t('virtualWardrobe')}</span>
            </div>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                activePage === 'wardrobe'
                  ? 'bg-[#0e0f12]/20 text-[#0e0f12]'
                  : 'bg-[#c5a880]/15 text-[#c5a880]'
              }`}
            >
              Mix
            </span>
          </button>

          <button
            onClick={() => {
              setMobileSidebarOpen(false);
              setIsStyleQuizOpen(true);
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880] transition-all"
          >
            <Compass size={16} className="text-[#c5a880]" />
            <span>{t('styleMeQuiz')}</span>
          </button>

          <button
            onClick={() => handleNavigate('offers')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activePage === 'offers'
                ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                : 'text-[#e6c17e] hover:bg-[#161820]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Percent size={16} />
              <span>{t('offers')}</span>
            </div>
            <span className="text-[9px] bg-[#8b1e1e] text-white px-1.5 py-0.5 rounded font-bold">
              SALE
            </span>
          </button>

          <button
            onClick={() => handleNavigate('about')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activePage === 'about'
                ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
            }`}
          >
            <BookOpen size={16} />
            <span>{t('about')}</span>
          </button>

          <button
            onClick={() => handleNavigate('store')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activePage === 'store'
                ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
            }`}
          >
            <MapPin size={16} className={activePage === 'store' ? 'text-[#0e0f12]' : 'text-[#c5a880]'} />
            <span>{t('store')}</span>
          </button>
        </div>

        {/* SECTION 2: ACCOUNT & SELLER DASHBOARDS */}
        <div className="pt-4 border-t border-[#1c1e26] space-y-1.5">
          <div className="px-3 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#787a82]">
            Dashboards & Access
          </div>

          {/* CLIENT PANEL DASHBOARD (OWNER / SELLER) */}
          <button
            onClick={handleOpenClientPanel}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all border ${
              activePage === 'client-panel'
                ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] shadow-lg'
                : 'bg-[#14161e] text-[#e6d5b8] border-[#2d303d] hover:border-[#c5a880]'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <LayoutDashboard size={16} className={activePage === 'client-panel' ? 'text-[#0e0f12]' : 'text-[#c5a880]'} />
              <span>Client Panel Dashboard</span>
            </div>
            {currentUser?.role === 'seller' && pendingOrdersCount > 0 ? (
              <span className="px-1.5 py-0.5 bg-[#8b1e1e] text-white text-[10px] rounded-full font-bold">
                {pendingOrdersCount}
              </span>
            ) : (
              <span className="text-[9px] uppercase tracking-wider opacity-75">Seller</span>
            )}
          </button>

          {/* CUSTOMER MY ORDERS (IF LOGGED IN AS CUSTOMER) */}
          {currentUser && currentUser.role === 'customer' && (
            <button
              onClick={() => handleNavigate('my-orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activePage === 'my-orders'
                  ? 'bg-[#c5a880] text-[#0e0f12] shadow-lg'
                  : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ClipboardList size={16} />
                <span>My Orders</span>
              </div>
              {orders.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#242733] text-[#c5a880]">
                  {orders.length}
                </span>
              )}
            </button>
          )}

          {/* LOGIN / LOGOUT PANEL */}
          {!currentUser ? (
            <button
              onClick={() => {
                setLoginRoleTab('customer');
                handleNavigate('login');
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activePage === 'login'
                  ? 'bg-[#c5a880] text-[#0e0f12]'
                  : 'text-[#d5cfc5] hover:bg-[#161820] hover:text-[#c5a880]'
              }`}
            >
              <LogIn size={16} className={activePage === 'login' ? 'text-[#0e0f12]' : 'text-[#c5a880]'} />
              <span>Login / Register</span>
            </button>
          ) : (
            <div className="mt-2 p-3 rounded-xl bg-[#13151c] border border-[#242734] space-y-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 flex items-center justify-center text-[#c5a880] shrink-0">
                  {currentUser.role === 'seller' ? <ShieldCheck size={15} /> : <UserIcon size={15} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                    {currentUser.role === 'seller' ? 'Owner / Seller' : 'Verified Customer'}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full py-1.5 px-2.5 rounded bg-[#1b1d26] hover:bg-[#2a1a1d] text-[11px] font-semibold text-[#d1ccc3] hover:text-[#f28b82] flex items-center justify-center space-x-1.5 transition-colors"
              >
                <LogOut size={12} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM UTILITIES: LANGUAGE & CALL */}
      <div className="p-4 border-t border-[#1d1f27] space-y-2.5 bg-[#090a0c]">
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[#2a2d38] bg-[#13151b] text-xs font-medium text-[#ded9cf] hover:border-[#c5a880] hover:text-[#c5a880] transition-all"
        >
          <span className="flex items-center space-x-2">
            <Languages size={14} className="text-[#c5a880]" />
            <span>Language</span>
          </span>
          <span className="font-bold text-[#c5a880]">{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        <a
          href={`tel:${SHOP_CONFIG.phone}`}
          className="flex items-center justify-center space-x-2 text-[11px] text-[#a09a8e] hover:text-[#c5a880] py-1"
        >
          <Phone size={12} className="text-[#c5a880]" />
          <span>{SHOP_CONFIG.phone}</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* MOBILE SLIDE-OVER SIDEBAR DRAWER */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <aside className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
