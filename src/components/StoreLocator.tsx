import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
  Send,
  Calendar,
  Compass,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const { language, showToast } = useShop();

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'VIP Fitting Consultation',
    message: ''
  });

  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      showToast('Please enter your name and phone number');
      return;
    }
    setAppointmentBooked(true);
    showToast('Your request has been received! Our stylist will call you shortly.');
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello EROMEN Stylist!\nI would like to schedule a visit / personal fitting consultation at your Tex Valley, Perundurai store.`
    );
    window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="store-locator" className="w-full py-16 sm:py-24 bg-[#0d0e12] text-[#f4efe6] px-4 sm:px-8 border-b border-[#1c1e26]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880] mb-2">
            <MapPin size={14} />
            <span>{language === 'en' ? 'FLAGSHIP BOUTIQUE & ATELIER' : 'முதன்மை ஆடை மையம் & தொடர்பு'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            {language === 'en' ? 'Visit Our Tex Valley Store' : 'எங்கள் டெக்ஸ் வேலி கிளையை காண்க'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#a09a8e] font-light max-w-xl mx-auto">
            Experience our fabrics in person, meet our master tailor, and enjoy a complimentary tea while your garments are fitted to perfection.
          </p>
        </div>

        {/* 3-COLUMN CONTACT & HOURS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Address & Landmarks */}
          <div className="bg-[#13151b] border border-[#232632] rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1c1f29] border border-[#2e3240] flex items-center justify-center text-[#c5a880]">
                <MapPin size={20} />
              </div>
              <h3 className="text-base font-bold text-white font-editorial">Flagship Address</h3>
              <div className="text-xs text-[#a09a8e] space-y-1">
                <p className="text-white font-medium">{SHOP_CONFIG.location.complex}</p>
                <p>{SHOP_CONFIG.location.shopNo}</p>
                <p>{SHOP_CONFIG.location.street}</p>
                <p>{SHOP_CONFIG.location.city} - {SHOP_CONFIG.location.pincode}</p>
                <p className="text-[#c5a880] text-[11px] pt-1">★ Landmark: {SHOP_CONFIG.location.landmarks}</p>
              </div>
            </div>

            <a
              href={SHOP_CONFIG.location.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center space-x-1.5 text-xs text-[#c5a880] hover:underline font-bold"
            >
              <span>Get Google Maps Directions</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Card 2: Operating Timings */}
          <div className="bg-[#13151b] border border-[#232632] rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1c1f29] border border-[#2e3240] flex items-center justify-center text-[#c5a880]">
                <Clock size={20} />
              </div>
              <h3 className="text-base font-bold text-white font-editorial">Atelier Hours</h3>
              <div className="text-xs text-[#a09a8e] space-y-2">
                <div>
                  <span className="text-white font-medium block">Monday – Sunday</span>
                  <span>{SHOP_CONFIG.openingHours.weekdays}</span>
                </div>
                <div>
                  <span className="text-white font-medium block">Weekends & Festivals</span>
                  <span>{SHOP_CONFIG.openingHours.weekends}</span>
                </div>
                <p className="text-emerald-400 text-[11px]">
                  ● Open 7 Days a Week (Festival Shopping Ready)
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#1e2029] text-[11px] text-[#787a82]">
              On-site master tailor available from 10:30 AM to 9:00 PM daily.
            </div>
          </div>

          {/* Card 3: Instant Concierge */}
          <div className="bg-[#13151b] border border-[#232632] rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1c1f29] border border-[#2e3240] flex items-center justify-center text-[#c5a880]">
                <Phone size={20} />
              </div>
              <h3 className="text-base font-bold text-white font-editorial">Direct Concierge</h3>
              <div className="text-xs text-[#a09a8e] space-y-2">
                <div>
                  <span className="text-[#6d6b66] block">Phone (Click to Call):</span>
                  <a href={`tel:${SHOP_CONFIG.phone}`} className="text-white font-bold hover:text-[#c5a880] text-sm">
                    {SHOP_CONFIG.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#6d6b66] block">WhatsApp Inquiries:</span>
                  <a
                    href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    +91 98427 54321 (Instant Reply)
                  </a>
                </div>
                <div>
                  <span className="text-[#6d6b66] block">Email:</span>
                  <a href={`mailto:${SHOP_CONFIG.email}`} className="text-[#ded9cf] hover:underline">
                    {SHOP_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={`tel:${SHOP_CONFIG.phone}`}
                className="flex-1 py-2 bg-[#20232e] hover:bg-[#2b2e3c] text-white text-xs font-semibold uppercase rounded text-center transition-colors"
              >
                Call Store
              </a>
              <button
                onClick={handleWhatsAppInquiry}
                className="flex-1 py-2 bg-[#1b3d26] hover:bg-[#225032] text-emerald-300 text-xs font-semibold uppercase rounded text-center transition-colors"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SPLIT: EMBEDDED GOOGLE MAP & VIP CONSULTATION FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* EMBEDDED GOOGLE MAP (7 COLS) */}
          <div className="lg:col-span-7 bg-[#121419] border border-[#232630] rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#21232d] flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                <Compass size={16} className="text-[#c5a880]" />
                <span>Interactive Map & Highway Access (NH 544)</span>
              </div>
              <span className="text-[11px] text-[#a09a8e]">Tex Valley, Bhavani Road</span>
            </div>

            <div className="relative aspect-[16/10] w-full bg-[#181a20]">
              <iframe
                title="Tex Valley Perundurai EROMEN Location"
                src={SHOP_CONFIG.location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.15)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Travel Directions Guide */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#a09a8e] bg-[#0e1014]">
              <div>
                <strong className="text-white block mb-0.5">From Perundurai:</strong>
                <span>10 mins drive via NH 544 Bhavani Road bypass.</span>
              </div>
              <div>
                <strong className="text-white block mb-0.5">From Erode Junction:</strong>
                <span>20 mins via Perundurai main road.</span>
              </div>
              <div>
                <strong className="text-white block mb-0.5">From Coimbatore / Tirupur:</strong>
                <span>Easy 45-60 mins drive along Salem-Kochi National Highway.</span>
              </div>
            </div>
          </div>

          {/* VIP CONSULTATION & INQUIRY FORM (5 COLS) */}
          <div className="lg:col-span-5 bg-[#14161c] border border-[#272a36] rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 space-y-1">
              <div className="flex items-center space-x-2 text-[#c5a880] text-xs font-bold tracking-widest uppercase">
                <Sparkles size={14} />
                <span>VIP ATELIER APPOINTMENT</span>
              </div>
              <h3 className="text-xl font-bold font-editorial text-white">
                Book Personal Fitting Suite
              </h3>
              <p className="text-xs text-[#a09a8e]">
                Reserve a private room with our master tailor for wedding, reception, or corporate wardrobe consultations.
              </p>
            </div>

            {!appointmentBooked ? (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label className="text-[11px] text-[#a09a8e] block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Anandha Kumar"
                    className="w-full bg-[#181a22] border border-[#2d303d] rounded px-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="98427 00000"
                      className="w-full bg-[#181a22] border border-[#2d303d] rounded px-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">Service Required</label>
                    <select
                      value={contactForm.service}
                      onChange={e => setContactForm({ ...contactForm, service: e.target.value })}
                      className="w-full bg-[#181a22] border border-[#2d303d] rounded px-2.5 py-2.5 text-xs text-[#d1ccc3] focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="Groom Wedding Wardrobe">Groom Wedding Wardrobe</option>
                      <option value="Bespoke Suit Fitting">Bespoke Suit Fitting</option>
                      <option value="Festive / Silk Veshti Set">Festive Silk Veshti Set</option>
                      <option value="Express 45-Min Alteration">Express 45-Min Alteration</option>
                      <option value="Corporate Bulk Order">Corporate Bulk Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#a09a8e] block mb-1">Preferred Date / Note</label>
                  <textarea
                    rows={2}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="e.g. Visiting this Saturday at 4 PM for Muhurtham suits"
                    className="w-full bg-[#181a22] border border-[#2d303d] rounded px-3 py-2 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
                >
                  <Send size={14} />
                  <span>Request VIP Fitting Appointment</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3 bg-[#171922] rounded-xl border border-[#2b2e3c] p-6">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-editorial">
                  Appointment Request Confirmed!
                </h4>
                <p className="text-xs text-[#a09a8e]">
                  We have reserved your consultation for {contactForm.service}. Our Tex Valley boutique team will confirm the slot with you via WhatsApp.
                </p>
                <button
                  onClick={() => setAppointmentBooked(false)}
                  className="text-xs text-[#c5a880] hover:underline uppercase tracking-wider font-semibold pt-2"
                >
                  Book Another Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
