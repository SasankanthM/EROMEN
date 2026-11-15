import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Scissors
} from 'lucide-react';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, showToast, language } = useShop();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    showToast('Welcome to the EROMEN Gentlemen’s Club. You have been subscribed.');
    setEmailInput('');
  };

  const footerCategories: ProductCategory[] = [
    'Shirts',
    'Ethnic Wear',
    'Formal Wear',
    'Trousers',
    'Jeans',
    'Accessories'
  ];

  return (
    <footer className="w-full bg-[#08090b] text-[#f4efe6] border-t border-[#1d1f27] pt-16 pb-28 lg:pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* TOP ROW: BRAND STATEMENT & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#1c1e27] items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-[0.22em] text-white font-editorial">
              ERO<span className="text-[#c5a880]">MEN</span> ✦
            </span>
            <p className="text-xs sm:text-sm text-[#a09a8e] max-w-md font-light leading-relaxed">
              "{SHOP_CONFIG.tagline}" &bull; The luxury menswear boutique at Tex Valley Mall, Perundurai. Certified handwoven silks and bespoke European tailoring.
            </p>
          </div>

          {/* VIP NEWSLETTER */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Join the EROMEN Private Circle
              </span>
              <p className="text-[11px] text-[#787a82]">
                Receive private invitations to seasonal trunk shows, festive silk arrivals, and tailor consultations.
              </p>
              <div className="flex gap-2 max-w-md pt-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#12141a] border border-[#2d303c] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded transition-all"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* MIDDLE 4-COLUMN LINKS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-[#a09a8e]">
          {/* Col 1: Store Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tex Valley Flagship</h4>
            <div className="space-y-1.5 leading-relaxed">
              <p className="text-white font-medium">{SHOP_CONFIG.location.complex}</p>
              <p>{SHOP_CONFIG.location.shopNo}</p>
              <p>{SHOP_CONFIG.location.street}</p>
              <p>{SHOP_CONFIG.location.city} - {SHOP_CONFIG.location.pincode}</p>
            </div>
            <div className="pt-1 text-[#c5a880]">
              <p>Mon - Sun: {SHOP_CONFIG.openingHours.weekdays}</p>
            </div>
          </div>

          {/* Col 2: Atelier Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Collections</h4>
            <ul className="space-y-2">
              {footerCategories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#c5a880] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Concierge & Bespoke Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Client Services</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActivePage('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  45-Minute In-Store Alteration
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Wedding Groom Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('wardrobe');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Virtual Wardrobe Mix & Match
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('offers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Pongal & Wedding Festive Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contacts</h4>
            <div className="space-y-2">
              <p>
                <span className="text-[#686a74] block">Direct Phone:</span>
                <a href={`tel:${SHOP_CONFIG.phone}`} className="text-white hover:text-[#c5a880]">
                  {SHOP_CONFIG.phone}
                </a>
              </p>
              <p>
                <span className="text-[#686a74] block">WhatsApp:</span>
                <a
                  href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Chat with Stylist (+91 98427 54321)
                </a>
              </p>
              <p>
                <span className="text-[#686a74] block">Email:</span>
                <a href={`mailto:${SHOP_CONFIG.email}`} className="text-[#d0cac0] hover:underline">
                  {SHOP_CONFIG.email}
                </a>
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-white">
              <a
                href={SHOP_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-[#161820] hover:bg-[#c5a880] hover:text-[#0e0f12] transition-colors"
                title="Follow EROMEN on Instagram"
              >
                <Instagram size={15} />
              </a>
              <span className="text-[11px] text-[#a09a8e]">{SHOP_CONFIG.instagramHandle}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & REPLACE DATA NOTICE */}
        <div className="pt-8 border-t border-[#181a22] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6d6f7a] gap-3">
          <p>
            © {new Date().getFullYear()} EROMEN Menswear Atelier. All Rights Reserved. Tex Valley, Perundurai, Tamil Nadu.
          </p>
          <div className="flex items-center space-x-4">
            <span>Perundurai • Erode • Coimbatore</span>
            <span>•</span>
            <span className="text-[#c5a880]">Tailored with Pride</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
