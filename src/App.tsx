/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FestivalOfferStrip } from './components/FestivalOfferStrip';
import { CategoryGrid } from './components/CategoryGrid';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { VirtualWardrobe } from './components/VirtualWardrobe';
import { AboutSection } from './components/AboutSection';
import { LookbookGallery } from './components/LookbookGallery';
import { Testimonials } from './components/Testimonials';
import { StoreLocator } from './components/StoreLocator';
import { ShopCatalog } from './components/ShopCatalog';
import { OffersPage } from './components/OffersPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StyleMeQuiz } from './components/StyleMeQuiz';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f4efe6] flex flex-col font-sans selection:bg-[#c5a880] selection:text-[#0c0d10]">
      {/* 1. STICKY LUXURY NAVIGATION & TICKER */}
      <Navbar />

      {/* 2. DYNAMIC PAGE CONTENT */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <FestivalOfferStrip />
            <CategoryGrid />
            <NewArrivalsCarousel />
            <VirtualWardrobe />
            <AboutSection />
            <LookbookGallery />
            <Testimonials />
            <StoreLocator />
          </>
        )}

        {activePage === 'shop' && <ShopCatalog />}

        {activePage === 'wardrobe' && (
          <div className="pt-6">
            <VirtualWardrobe />
          </div>
        )}

        {activePage === 'offers' && <OffersPage />}

        {activePage === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <LookbookGallery />
            <Testimonials />
          </div>
        )}

        {activePage === 'store' && (
          <div className="pt-6">
            <StoreLocator />
          </div>
        )}
      </main>

      {/* 3. LUXURY FOOTER */}
      <Footer />

      {/* 4. GLOBAL INTERACTIVE OVERLAYS & MODALS */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <StyleMeQuiz />
      <SizeGuideModal />
      <FloatingWidgets />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
