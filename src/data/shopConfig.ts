/**
 * EROMEN STORE CONFIGURATION & EDITABLE DATA
 * =========================================================================
 * Teachers & Shop Owner: You can easily customize any of the details below
 * (Phone, WhatsApp, Store Hours, Address, Instagram, and Coupons).
 * =========================================================================
 */

export const SHOP_CONFIG = {
  name: "EROMEN",
  tagline: "Dress the Man You Are Becoming",
  taglineTa: "நீங்கள் மாறவிருக்கும் ஆளுமைக்கான ஆடை அலங்காரம்",
  establishedYear: 2021,
  
  // ==========================================
  // EDITABLE CONTACT INFORMATION
  // ==========================================
  phone: "+91 98427 54321", // REPLACE WITH REAL PHONE NUMBER
  phoneFormatted: "+91 98427 54321",
  whatsappNumber: "919842754321", // Phone number without '+' or spaces for WhatsApp API
  email: "orders@eromen.in", // REPLACE WITH REAL EMAIL
  instagramHandle: "@eromen_menswear",
  instagramUrl: "https://instagram.com",
  
  // ==========================================
  // EDITABLE STORE LOCATION & TIMINGS
  // ==========================================
  location: {
    name: "Tex Valley Mall Flagship Store",
    complex: "Tex Valley (Integrated Textile Mall)",
    shopNo: "Shop #G-42 & G-43, Ground Floor, Luxury Boulevard",
    street: "NH 544, Bhavani Main Road, Gangapuram / Perundurai Bypass",
    city: "Perundurai, Erode District",
    state: "Tamil Nadu",
    pincode: "638052",
    landmarks: "Opposite to Tex Valley Central Atrium, 10 Mins from Perundurai Bus Stand",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.2339891285496!2d77.6256569750505!3d11.390884888800109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fb296adba73%3A0x6b876fc6d6910609!2sTexvalley!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Texvalley+Perundurai+Erode"
  },

  openingHours: {
    weekdays: "10:00 AM – 09:30 PM",
    weekends: "10:00 AM – 10:00 PM",
    days: "Open 7 Days a Week (Including Festivals)"
  },

  services: [
    { title: "Bespoke Master Tailoring", desc: "Expert on-site suit, kurta & trouser fittings" },
    { title: "Free Express Alteration", desc: "Ready-to-wear alterations completed in under 45 mins" },
    { title: "VIP Groom Consultation", desc: "Dedicated stylist suite for wedding entourages" },
    { title: "Handloom & Silk Verification", desc: "Authentic certified natural fibers and pure mul silks" }
  ]
};

export const COUPONS = [
  {
    code: "EROFIRST",
    discountPercent: 20,
    minSpend: 1999,
    description: "20% OFF on your first purchase above ₹1,999"
  },
  {
    code: "PONGAL2026",
    discountPercent: 15,
    minSpend: 2499,
    description: "15% Festive discount on ethnic wear & shirts"
  },
  {
    code: "WEDDINGVIP",
    discountAmount: 1000,
    minSpend: 4999,
    description: "Flat ₹1,000 OFF on wedding suits & sherwanis above ₹4,999"
  }
];

export const FESTIVAL_DEAL = {
  badge: "PONGAL & WEDDING SEASON 2026",
  badgeTa: "பொங்கல் & திருமண சீசன் சிறப்பு தள்ளுபடி 2026",
  title: "The Regal Kongu Collection",
  titleTa: "கொங்கு பாரம்பரிய & நவீன திருமண ஆடைகள்",
  description: "Up to 30% OFF on Pure Mulberry Silk Kurtas, Royal Zari Veshtis, and Savile Row Inspired Italian Suits. Free bespoke in-store alterations at Tex Valley.",
  code: "PONGAL2026",
  // Target date set for current festive countdown
  targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 14).toISOString()
};

export const STORE_TESTIMONIALS = [
  {
    id: 1,
    name: "Karthik Sundaram",
    role: "Groom & Textile Entrepreneur",
    location: "Perundurai, Erode",
    quote: "Got my entire wedding reception tux and Muhurtham silk veshti set from EROMEN Tex Valley. The tailoring precision and fabric quality rival high-end Chennai and Bangalore boutiques. Proud to have this in our town!",
    rating: 5,
    verifiedPurchase: true
  },
  {
    id: 2,
    name: "Dr. Arvind Natarajan",
    role: "Professor, Engineering College",
    location: "Thindal, Erode",
    quote: "Their Giza cotton shirts and tailored Gurkha trousers have completely elevated my everyday formal wardrobe. Breathable, sharp, and durable through long lecture days.",
    rating: 5,
    verifiedPurchase: true
  },
  {
    id: 3,
    name: "M. Vignesh",
    role: "Software Architect",
    location: "Coimbatore / Perundurai",
    quote: "Ordered via WhatsApp using their lookbook, picked it up altered perfectly 2 hours later at Tex Valley. The mix-and-match styling is genuinely world-class.",
    rating: 5,
    verifiedPurchase: true
  }
];

export const DICTIONARY = {
  en: {
    home: "Home",
    shop: "Shop Collection",
    virtualWardrobe: "Virtual Wardrobe",
    styleMeQuiz: "Style Me",
    offers: "Festive Offers",
    about: "Our Story",
    store: "Visit Store",
    cart: "Cart",
    wishlist: "Wishlist",
    quickView: "Quick View",
    addToCart: "Add to Cart",
    buyOnWhatsApp: "Buy on WhatsApp",
    orderViaWhatsApp: "Order via WhatsApp",
    filterByCategory: "Category",
    allProducts: "All Products",
    sortBy: "Sort By",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    newest: "Newest Arrivals",
    featured: "Featured Editorial",
    freeShippingNotice: "Free Alterations & Express Delivery across Tamil Nadu on orders above ₹2,000",
    inStockTexValley: "In Stock at Tex Valley Store",
    availableSizes: "Select Size",
    sizeGuide: "Size Guide",
    colors: "Available Colors",
    completeTheLook: "Complete The Look",
    viewAll: "View All Products",
    styleMeHeader: "Personal Stylist Quiz",
    styleMeSub: "Find your signature look in 4 quick questions",
    wardrobeHeader: "Virtual Wardrobe Mix & Match",
    wardrobeSub: "Assemble your bespoke outfit with live pricing & styling preview",
    readyToWear: "Ready to Wear",
    bespokeTailoring: "Bespoke Tailoring Available"
  },
  ta: {
    home: "முகப்பு",
    shop: "ஆடைத் தொகுப்பு",
    virtualWardrobe: "மெய்நிகர் அலமாரி",
    styleMeQuiz: "ஆடை தேர்வு வழிகாட்டி",
    offers: "சிறப்பு சலுகைகள்",
    about: "எங்கள் கதை",
    store: "கடைக்கு வருகை",
    cart: "கூடை",
    wishlist: "விருப்பப்பட்டியல்",
    quickView: "துரித பார்வை",
    addToCart: "கூடையில் சேர்க்க",
    buyOnWhatsApp: "வாட்ஸ்அப்பில் வாங்க",
    orderViaWhatsApp: "வாட்ஸ்அப் வழி ஆர்டர்",
    filterByCategory: "வகைப்பாடு",
    allProducts: "அனைத்து ஆடைகளும்",
    sortBy: "வரிசைப்படுத்து",
    priceLowToHigh: "விலை: குறைவு முதல் அதிகம்",
    priceHighToLow: "விலை: அதிகம் முதல் குறைவு",
    newest: "புதிய வரவுகள்",
    featured: "சிறப்பு ஆடைகள்",
    freeShippingNotice: "டெக்ஸ் வேலி கிளையில் இலவச தையல் திருத்தம் & ₹2,000-க்கு மேல் இலவச டெலிவரி",
    inStockTexValley: "டெக்ஸ் வேலி கிளையில் இருப்பு உள்ளது",
    availableSizes: "அளவு தேர்வு",
    sizeGuide: "அளவு வழிகாட்டி",
    colors: "வண்ணங்கள்",
    completeTheLook: "பொருத்தமான பிற ஆடைகள்",
    viewAll: "அனைத்தையும் காண்க",
    styleMeHeader: "தனிப்பயன் ஆடை தேர்வு வழிகாட்டி",
    styleMeSub: "4 எளிய கேள்விகளில் உங்களுக்கான பிரத்யேக தோற்றம்",
    wardrobeHeader: "மெய்நிகர் ஆடை ஜோடி தேர்வு",
    wardrobeSub: "சட்டை மற்றும் பேண்ட்டை எளிதாக பொருத்திப் பார்த்து வாங்குங்கள்",
    readyToWear: "உடனடி ஆடை",
    bespokeTailoring: "சிறப்பு தையல் வசதி உண்டு"
  }
};
