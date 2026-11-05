import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // SHIRTS
  // ==========================================
  {
    id: "eromen-sh-01",
    name: "Royal Giza Linen Cutaway Collar Shirt",
    nameTa: "ராயல் எகிப்திய லினன் சொகுசு சட்டை",
    category: "Shirts",
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      { name: "Crisp Champagne", hex: "#F3EAD8" },
      { name: "Onyx Charcoal", hex: "#1D1E20" },
      { name: "Aegean Azure", hex: "#2B4C6F" }
    ],
    description: "Crafted from 100% Egyptian Giza Long-Staple Linen woven for the South Indian climate. Features an Italian spread cutaway collar and mother-of-pearl buttons.",
    descriptionTa: "தென்னிந்திய தட்பவெப்பத்திற்கு உகந்த தூய எகிப்திய லினன் நூல் கொண்டு நெய்யப்பட்டது. நவீன இத்தாலிய காலர் மற்றும் முத்து பொத்தான்கள் கொண்டது.",
    fabric: "100% Egyptian Giza Linen (Pre-shrunk)",
    fit: "Tailored Contemporary Fit",
    occasion: "Casual",
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    sku: "ERO-SH-GIZA01",
    inStockTexValley: true,
    tags: ["Linen", "Breathable", "Premium", "Everyday Luxury"]
  },
  {
    id: "eromen-sh-02",
    name: "Savile Row Twill Double-Cuff Tuxedo Shirt",
    nameTa: "லண்டன் மாடல் ட்வில் இரட்டை கஃப் சட்டை",
    category: "Shirts",
    price: 2899,
    originalPrice: 3899,
    discountPercentage: 26,
    rating: 4.8,
    reviewCount: 24,
    image: "https://images.unsplash.com/photo-1620012253295-c15c429fccf8?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1620012253295-c15c429fccf8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      { name: "Pristine Optical White", hex: "#FFFFFF" },
      { name: "Pale Ivory", hex: "#FAF5EE" }
    ],
    description: "The quintessential formal foundation. High-density 100s two-ply cotton twill with concealed placket and French double cuffs designed for cufflinks.",
    descriptionTa: "திருமண வரவேற்பு மற்றும் மேல்தட்டு நிகழ்ச்சிகளுக்கான தூய வெள்ளை நிற இரட்டை கஃப் கொண்ட பிரீமியம் சட்டை.",
    fabric: "100% 2-Ply Combed Supima Cotton (100s)",
    fit: "Sharp Slim Fit",
    occasion: "Formal",
    isBestSeller: true,
    sku: "ERO-SH-TWL02",
    inStockTexValley: true,
    tags: ["French Cuff", "Formal", "Wedding Ready"]
  },
  {
    id: "eromen-sh-03",
    name: "Textured Sage Oxford Club Button-Down",
    nameTa: "டெக்ஸ்டர்டு சேஜ் ஆக்ஸ்போர்டு சட்டை",
    category: "Shirts",
    price: 2199,
    originalPrice: 2999,
    discountPercentage: 27,
    rating: 4.7,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      { name: "Earthy Sage Green", hex: "#7D8C7C" },
      { name: "Powder Blue", hex: "#A8BDD1" },
      { name: "Terracotta Rust", hex: "#A65B47" }
    ],
    description: "Subtle basketweave oxford cotton washed for zero stiffness. Roll collar with understated buttons suitable for blazer layering or solo styling.",
    descriptionTa: "அன்றாட அலுவலகம் மற்றும் வார இறுதி நாட்களுக்கு ஏற்ற மென்மையான ஆக்ஸ்போர்டு காட்டன் சட்டை.",
    fabric: "100% Pre-washed Heavyweight Oxford Cotton",
    fit: "Regular Modern Fit",
    occasion: "Casual",
    sku: "ERO-SH-OXF03",
    inStockTexValley: true,
    tags: ["Oxford", "Smart Casual", "Kongu Pride"]
  },

  // ==========================================
  // ETHNIC WEAR
  // ==========================================
  {
    id: "eromen-eth-01",
    name: "Pure Mulberry Raw Silk Kurta with Churidhar",
    nameTa: "தூய மல்பெரி பட்டு குர்தா & சுரிதார் செட்",
    category: "Ethnic Wear",
    price: 4999,
    originalPrice: 6999,
    discountPercentage: 28,
    rating: 5.0,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      { name: "Imperial Gold & Cream", hex: "#DFD2AE" },
      { name: "Deep Ruby Maroon", hex: "#5C1D24" },
      { name: "Emerald Forest", hex: "#1C3B2B" }
    ],
    description: "Handwoven pure raw mulberry silk with intricate tonal threadwork along the mandarin neckline. Comes complete with a tailored silk-blend churidhar bottom.",
    descriptionTa: "கைத்தறி பட்டு நூலில் பிரத்யேகமாக உருவான மணமகன் குர்தா. நெக்லைனில் நுண்ணிய வேலைப்பாடுகள் கொண்டது.",
    fabric: "100% Handwoven Mulberry Silk & Chanderi Weave",
    fit: "Royal Festive Silhouette",
    occasion: "Wedding",
    isNewArrival: true,
    isFeatured: true,
    isBestSeller: true,
    sku: "ERO-ETH-SILK01",
    inStockTexValley: true,
    tags: ["Silk", "Wedding", "Festive", "Muhurtham"]
  },
  {
    id: "eromen-eth-02",
    name: "Brocade Bandhgala Heritage Nehru Jacket",
    nameTa: "பாரம்பரிய பனாரஸ் பந்த்கலா நேரு ஜாக்கெட்",
    category: "Ethnic Wear",
    price: 3899,
    originalPrice: 5299,
    discountPercentage: 26,
    rating: 4.9,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      { name: "Antique Gold & Black", hex: "#22201D" },
      { name: "Royal Sapphire Navy", hex: "#1A2536" }
    ],
    description: "Elevate any kurta or shirt instantly. Woven in metallic jacquard with antique brass buttons, silk welt pockets, and breathable inner cupro lining.",
    descriptionTa: "குர்தா அல்லது சட்டையின் மேல் அணியக்கூடிய கம்பீரமான பாரம்பரிய நேரு ஜாக்கெட்.",
    fabric: "Pure Silk Jacquard with Antique Metal Hardware",
    fit: "Structured Slim Cut",
    occasion: "Festive",
    sku: "ERO-ETH-NHR02",
    inStockTexValley: true,
    tags: ["Nehru Jacket", "Groom Wear", "Heritage"]
  },
  {
    id: "eromen-eth-03",
    name: "Bridal Zari Pure Pattu Veshti & Angavastram",
    nameTa: "தூய பட்டு ஜரிகை வேஷ்டி & அ his அங்கவஸ்திரம்",
    category: "Ethnic Wear",
    price: 4499,
    originalPrice: 5999,
    discountPercentage: 25,
    rating: 5.0,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["Standard 8 Muzham (4.0m)", "Standard 9x5 Muzham Set"],
    colors: [
      { name: "Natural Ivory Gold Border", hex: "#FFF8EA" }
    ],
    description: "The pinnacle of Tamil wedding tradition. Pure Kanchipuram woven silk with 2.5-inch real silver-dipped gold zari border and matching angavastram.",
    descriptionTa: "கொங்கு மண்டல முகூர்த்த விழாக்களுக்கான தூய பட்டு வேஷ்டி மற்றும் அங்கவஸ்திரம். 2.5 இன்ச் ஜரிகை கரை.",
    fabric: "100% Pure Mulberry Silk with Certified Zari",
    fit: "Traditional Draped Fit",
    occasion: "Wedding",
    isBestSeller: true,
    sku: "ERO-ETH-VESH03",
    inStockTexValley: true,
    tags: ["Veshti", "Muhurtham", "Pure Silk", "Kongu Wedding"]
  },

  // ==========================================
  // FORMAL WEAR / SUITS
  // ==========================================
  {
    id: "eromen-frm-01",
    name: "Midnight Obsidian Bespoke 3-Piece Italian Suit",
    nameTa: "இத்தாலியன் மெரினோ கம்பளி 3-பீஸ் சூட்",
    category: "Formal Wear",
    price: 11999,
    originalPrice: 16999,
    discountPercentage: 29,
    rating: 5.0,
    reviewCount: 18,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38R (S)", "40R (M)", "42R (L)", "44R (XL)"],
    colors: [
      { name: "Midnight Charcoal", hex: "#161719" },
      { name: "Royal Venetian Navy", hex: "#121A28" }
    ],
    description: "Handcrafted from Super 130s lightweight Italian wool blend with floating canvas chest piece, double vented back, and tapered Gurkha waistband trousers.",
    descriptionTa: "இத்தாலியன் தையல் முறைப்படி வடிவமைக்கப்பட்ட கோட், வெஸ்ட்கோட் மற்றும் பேண்ட் அடங்கிய 3-பீஸ் சூட்.",
    fabric: "Super 130s Merino Wool & Silk Blend with Bemberg Lining",
    fit: "Bespoke Italian Cut",
    occasion: "Formal",
    isFeatured: true,
    isBestSeller: true,
    sku: "ERO-FRM-SUIT01",
    inStockTexValley: true,
    tags: ["3-Piece Suit", "Bespoke", "Reception Suit"]
  },
  {
    id: "eromen-frm-02",
    name: "Cashmere-Touch Textured Camel Double-Breasted Blazer",
    nameTa: "கேமல் நிற டபுள்-பிரஸ்ட்டட் சொகுசு பிளேசர்",
    category: "Formal Wear",
    price: 6499,
    originalPrice: 8999,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 15,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["38R (S)", "40R (M)", "42R (L)", "44R (XL)"],
    colors: [
      { name: "Warm Camel Sand", hex: "#C2A379" },
      { name: "Smoky Graphite", hex: "#35383E" }
    ],
    description: "Peak lapel double-breasted silhouette made for high-impact boardroom entries and destination cocktails. Finished with horn buttons.",
    descriptionTa: "பீக் லேபல் மற்றும் இரட்டை பட்டன்கள் கொண்ட உலகத்தரம் வாய்ந்த மாடர்ன் பிளேசர்.",
    fabric: "Wool-Cashmere Blend with Subtle Herringbone Texture",
    fit: "Slim Peak Lapel",
    occasion: "Formal",
    sku: "ERO-FRM-BLZ02",
    inStockTexValley: true,
    tags: ["Blazer", "Double Breasted", "Executive"]
  },

  // ==========================================
  // TROUSERS
  // ==========================================
  {
    id: "eromen-tr-01",
    name: "Bespoke Gurkha Pleated Sartorial Trousers",
    nameTa: "கூர்கா பிளீட்டட் சர்தோரியல் ட்ரவுசர்",
    category: "Trousers",
    price: 2699,
    originalPrice: 3699,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 33,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["30 Waist", "32 Waist", "34 Waist", "36 Waist", "38 Waist"],
    colors: [
      { name: "Florentine Khaki", hex: "#C7B299" },
      { name: "Deep Charcoal Ash", hex: "#2B2D31" },
      { name: "Olive Moss", hex: "#4E5346" }
    ],
    description: "Double forward pleats, extended Gurkha cross-buckle waistband, and 2-inch turn-up cuffs. Eliminates the need for a belt while creating a razor-sharp drape.",
    descriptionTa: "பெல்ட் அணிய தேவையில்லாத பாரம்பரிய கூர்கா கொக்கி மற்றும் டபுள் பிளீட் கொண்ட ஸ்டைலிஷ் பேண்ட்.",
    fabric: "Wrinkle-Resistant 4-Way Stretch Poly-Viscose Cotton",
    fit: "High-Rise Tapered Sartorial Cut",
    occasion: "Formal",
    isFeatured: true,
    isBestSeller: true,
    sku: "ERO-TR-GURK01",
    inStockTexValley: true,
    tags: ["Gurkha", "Pleated", "Trending", "Italian Style"]
  },
  {
    id: "eromen-tr-02",
    name: "Stretch Flex-Waist Tailored Cotton Chinos",
    nameTa: "ஸ்ட்ரெட்ச் பிளெக்ஸ் காட்டன் சினோஸ்",
    category: "Trousers",
    price: 2199,
    originalPrice: 2899,
    discountPercentage: 24,
    rating: 4.7,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["30 Waist", "32 Waist", "34 Waist", "36 Waist"],
    colors: [
      { name: "Navy Marine", hex: "#1B2838" },
      { name: "Stone Biscuit", hex: "#E3DAC9" },
      { name: "Slate Grey", hex: "#5C6067" }
    ],
    description: "Micro-twill stretch cotton treated with a peach-skin wash for unmatched skin comfort. Built with a concealed flexible waistband for all-day ease.",
    descriptionTa: "அன்றாட பயன்பாட்டிற்கு ஏற்ற மிக மென்மையான ஸ்ட்ரெட்ச் காட்டன் சினோஸ் பேண்ட்.",
    fabric: "98% Pima Cotton, 2% Elastane Flex",
    fit: "Tailored Slim Fit",
    occasion: "Casual",
    sku: "ERO-TR-CHIN02",
    inStockTexValley: true,
    tags: ["Chinos", "Comfort", "Daily Wear"]
  },

  // ==========================================
  // JEANS
  // ==========================================
  {
    id: "eromen-jn-01",
    name: "13.5oz Kuroki Japanese Selvedge Raw Denim",
    nameTa: "குரோகி ஜப்பானிய செல்வெட்ஜ் ரா டெனிம் ஜீன்ஸ்",
    category: "Jeans",
    price: 3499,
    originalPrice: 4799,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["30 Waist", "32 Waist", "34 Waist", "36 Waist"],
    colors: [
      { name: "Deep Indigo Red-Line", hex: "#16203B" }
    ],
    description: "Woven on vintage shuttle looms with the iconic red-line selvedge edge. Unwashed rigid indigo that molds distinctly to the wearer's body over time.",
    descriptionTa: "பாரம்பரிய லூம்களில் நெய்யப்பட்ட உயர்தர ரெட்-லைன் செல்வெட்ஜ் ரா டெனிம் ஜீன்ஸ்.",
    fabric: "100% Ring-Spun Shuttle Loom Cotton (13.5oz)",
    fit: "Clean Tapered Leg",
    occasion: "Casual",
    isNewArrival: true,
    sku: "ERO-JN-SELV01",
    inStockTexValley: true,
    tags: ["Selvedge", "Raw Denim", "Heritage"]
  },
  {
    id: "eromen-jn-02",
    name: "Artisan Washed Grey Fade Stretch Denim",
    nameTa: "கிரே ஃபேட் ஆர்ட்டிசன் ஸ்ட்ரெட்ச் டெனிம்",
    category: "Jeans",
    price: 2799,
    originalPrice: 3699,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["30 Waist", "32 Waist", "34 Waist", "36 Waist", "38 Waist"],
    colors: [
      { name: "Smoked Mineral Grey", hex: "#4A4D54" },
      { name: "Washed Carbon Black", hex: "#222326" }
    ],
    description: "Hand-whiskered and stone washed for a lived-in luxury attitude. Dual-core stretch fiber guarantees form retention without bagging out at the knees.",
    descriptionTa: "அற்புதமான கிரே நிற வாஷ் கொண்ட சொகுசான ஸ்ட்ரெட்ச் டெனிம் ஜீன்ஸ்.",
    fabric: "93% Cotton, 5% Poly, 2% Spandex",
    fit: "Contemporary Slim Fit",
    occasion: "Casual",
    sku: "ERO-JN-GRY02",
    inStockTexValley: true,
    tags: ["Grey Denim", "Stretch", "Urban"]
  },

  // ==========================================
  // T-SHIRTS
  // ==========================================
  {
    id: "eromen-ts-01",
    name: "Luxury Silk-Touch Supima Mercerized Polo",
    nameTa: "மெர்சரைஸ்டு சுபிமா காட்டன் சொகுசு போலோ",
    category: "T-Shirts",
    price: 1899,
    originalPrice: 2599,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 37,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Champagne Sand", hex: "#D9C9B4" },
      { name: "Onyx Black", hex: "#111215" },
      { name: "Forest Olive", hex: "#323E33" }
    ],
    description: "Double-mercerized 100% American Supima cotton gives this polo a silk-like luster, zero fading, and a crisp no-curl ribbed collar.",
    descriptionTa: "பட்டு போன்ற பளபளப்பு கொண்ட மெர்சரைஸ்டு அமெரிக்கன் சுபிமா காட்டன் காலர் டி-சர்ட்.",
    fabric: "100% Double-Mercerized Supima Cotton 240 GSM",
    fit: "Athletic Tailored Fit",
    occasion: "Casual",
    isBestSeller: true,
    sku: "ERO-TS-POLO01",
    inStockTexValley: true,
    tags: ["Supima", "Polo", "Luxury Basics"]
  },
  {
    id: "eromen-ts-02",
    name: "Heavyweight 280 GSM Boxy Drop-Shoulder Tee",
    nameTa: "ஹெவிவெயிட் பாக்ஸி டிராப்-ஷோல்டர் டீ",
    category: "T-Shirts",
    price: 1399,
    originalPrice: 1899,
    discountPercentage: 26,
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Off-White", hex: "#EFECE6" },
      { name: "Dark Walnut Brown", hex: "#3B2E2A" },
      { name: "Washed Plum", hex: "#4B3245" }
    ],
    description: "Thick, substantial combed cotton with structured drape that doesn't cling. Relaxed shoulder drop and reinforced 1-inch rib crewneck.",
    descriptionTa: "இளைஞர்களின் விருப்பமான மாடர்ன் பாக்ஸி கட் ஹெவிவெயிட் காட்டன் டி-சர்ட்.",
    fabric: "100% Combed Heavy Cotton 280 GSM",
    fit: "Relaxed Boxy Fit",
    occasion: "Casual",
    isNewArrival: true,
    sku: "ERO-TS-DROP02",
    inStockTexValley: true,
    tags: ["Oversized", "Drop Shoulder", "Street Luxury"]
  },

  // ==========================================
  // ACCESSORIES
  // ==========================================
  {
    id: "eromen-acc-01",
    name: "Hand-Burnished Full-Grain Leather Dress Belt",
    nameTa: "கைவேலைப்பாடு கொண்ட லெதர் பார்மல் பெல்ட்",
    category: "Accessories",
    price: 1699,
    originalPrice: 2299,
    discountPercentage: 26,
    rating: 4.9,
    reviewCount: 30,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["30-34 Inch", "36-40 Inch", "42-46 Inch"],
    colors: [
      { name: "Espresso Havana Brown", hex: "#3E2723" },
      { name: "Midnight Black", hex: "#121212" }
    ],
    description: "Vegetable-tanned full-grain leather edges beveled and burnished by hand. Equipped with a brushed gold solid brass buckle.",
    descriptionTa: "அசல் தோல் மற்றும் பித்தளை கொக்கி கொண்டு கைவினைஞர்களால் உருவாக்கப்பட்ட பிரீமியம் பெல்ட்.",
    fabric: "100% Full-Grain Vegetable Tanned Leather",
    fit: "35mm Classic Width",
    occasion: "Formal",
    sku: "ERO-ACC-BELT01",
    inStockTexValley: true,
    tags: ["Leather", "Belt", "Accessories"]
  },
  {
    id: "eromen-acc-02",
    name: "Pure Mulberry Silk Paisley Tie & Pocket Square Set",
    nameTa: "பட்டு டை & பாக்கெட் ஸ்கொயர் செட்",
    category: "Accessories",
    price: 1899,
    originalPrice: 2599,
    discountPercentage: 27,
    rating: 5.0,
    reviewCount: 21,
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Royal Wine & Gold", hex: "#721A2E" },
      { name: "Navy & Champagne", hex: "#16284F" }
    ],
    description: "Jacquard woven 100% Italian silk with hand-rolled pocket square edges. Packed in a signature gold-stamped EROMEN wooden presentation box.",
    descriptionTa: "தூய பட்டு டை மற்றும் கைவேலைப்பாடு கொண்ட பாக்கெட் ஸ்கொயர் செட். பரிசு பெட்டியுடன் கிடைக்கிறது.",
    fabric: "100% Woven Mulberry Silk",
    fit: "7.5cm Modern Classic Blade",
    occasion: "Wedding",
    sku: "ERO-ACC-TIE02",
    inStockTexValley: true,
    tags: ["Silk Tie", "Wedding Set", "Groom Gift"]
  },
  {
    id: "eromen-acc-03",
    name: "Architectural 18K Gold Plated Monogram Cufflinks",
    nameTa: "18K தங்க முலாம் பூசிய கஃப்லிங்க்ஸ்",
    category: "Accessories",
    price: 1499,
    originalPrice: 1999,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 17,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Brushed Champagne Gold", hex: "#C5A880" }
    ],
    description: "Geometric bevel cut design with brushed satin finishing and swivel toggle closure. Non-tarnish micro-coating.",
    descriptionTa: "பிரத்யேக ஜியோமெட்ரிக் வடிவமைப்பு கொண்ட 18K தங்க முலாம் பூசிய கஃப்லிங்க்ஸ்.",
    fabric: "Solid Brass with 18K Gold Micro-Plating",
    fit: "Standard French Cuff Closure",
    occasion: "Formal",
    sku: "ERO-ACC-CUFF03",
    inStockTexValley: true,
    tags: ["Cufflinks", "Gold Finish", "Luxury"]
  },

  // ==========================================
  // INNERWEAR
  // ==========================================
  {
    id: "eromen-in-01",
    name: "Micro-Modal Silk Touch Seamless Boxer Briefs (Pack of 3)",
    nameTa: "மைக்ரோ-மாடல் சீம்லெஸ் பாக்ஸர் பிரீஃப் (3 பேக்)",
    category: "Innerwear",
    price: 1299,
    originalPrice: 1799,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S (28-30)", "M (32-34)", "L (36-38)", "XL (40-42)"],
    colors: [
      { name: "Onyx, Navy, Heather Grey Tri-Pack", hex: "#22252A" }
    ],
    description: "3X softer than cotton. Austrian beechwood micro-modal with anti-chafing ergonomic pouch and no-roll brushed waistband.",
    descriptionTa: "அல்ட்ரா சாப்ட் மைக்ரோ-மாடல் துணியினால் ஆன 3 பாக்ஸர் பேண்ட் தொகுப்பு.",
    fabric: "92% Lenzing Micro-Modal, 8% Spandex",
    fit: "Ergonomic Supportive Fit",
    occasion: "All",
    sku: "ERO-IN-MODAL01",
    inStockTexValley: true,
    tags: ["Innerwear", "Micro Modal", "Everyday Comfort"]
  }
];

// OUTFITS FOR THE VIRTUAL WARDROBE MIX-AND-MATCH BUILDER
export const OUTFIT_PRESETS = [
  {
    id: "look-01",
    title: "Kongu Muhurtham Elegance",
    titleTa: "கொங்கு முகூர்த்த கம்பீரம்",
    occasion: "Wedding",
    topId: "eromen-eth-01", // Mulberry Raw Silk Kurta
    bottomId: "eromen-eth-03", // Pure Pattu Veshti
    accessoryId: "eromen-acc-02", // Pure Silk Tie/Pocket square or stole
    discountPercent: 15,
    story: "The quintessential bridegroom aesthetic for Kongu Tamil weddings. Shimmering raw silk paired with pure zari silk veshti."
  },
  {
    id: "look-02",
    title: "The Tex Valley Boardroom Power Look",
    titleTa: "கார்ப்பரேட் நிர்வாகி தோற்றம்",
    occasion: "Formal",
    topId: "eromen-sh-02", // Savile Row Twill Shirt
    bottomId: "eromen-tr-01", // Gurkha Pleated Trousers
    accessoryId: "eromen-acc-01", // Full-Grain Leather Belt
    discountPercent: 12,
    story: "Razor-sharp tailored pleats with French cuffs and burnished leather. Exudes calm authority and refined sophistication."
  },
  {
    id: "look-03",
    title: "Riviera Summer Linen Chill",
    titleTa: "சம்மர் லினன் ரிலாக்ஸ் தோற்றம்",
    occasion: "Casual",
    topId: "eromen-sh-01", // Royal Giza Linen Shirt
    bottomId: "eromen-tr-02", // Tailored Chinos
    accessoryId: "eromen-acc-01",
    discountPercent: 10,
    story: "Unstructured cutaway linen draped effortlessly over stretch cotton chinos. Perfect for breezy Sunday brunches and weekend getaways."
  }
];

// CATEGORIES FOR TILES & FILTERING
export const CATEGORIES_DATA = [
  {
    id: "Shirts",
    name: "Bespoke Shirts",
    nameTa: "சொகுசு சட்டைகள்",
    count: "40+ Styles",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    desc: "Giza Linen, Supima Oxford & French Cuff Twills"
  },
  {
    id: "Ethnic Wear",
    name: "Ethnic & Wedding",
    nameTa: "பாரம்பரிய & முகூர்த்த உடைகள்",
    count: "25+ Styles",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    desc: "Pure Mulberry Silk Kurtas, Zari Veshtis & Sherwanis"
  },
  {
    id: "Formal Wear",
    name: "Suits & Blazers",
    nameTa: "சூட் & பிளேசர்கள்",
    count: "18+ Styles",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    desc: "Italian 3-Piece Tuxedos & Double-Breasted Blazers"
  },
  {
    id: "Trousers",
    name: "Gurkha & Chinos",
    nameTa: "கூர்கா & சினோஸ் பேண்ட்கள்",
    count: "22+ Styles",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    desc: "High-Rise Pleated Trousers & All-Day Flex Chinos"
  },
  {
    id: "Jeans",
    name: "Selvedge Denim",
    nameTa: "செல்வெட்ஜ் டெனிம்",
    count: "15+ Styles",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop",
    desc: "Japanese Shuttle Loom & Artisan Stone Washes"
  },
  {
    id: "T-Shirts",
    name: "Polos & Oversized",
    nameTa: "போலோ & டீ-சர்ட்கள்",
    count: "30+ Styles",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    desc: "Mercerized Supima Cotton & 280 GSM Boxy Cuts"
  },
  {
    id: "Accessories",
    name: "Leather & Silk",
    nameTa: "லெதர் & ஆக்சஸரீஸ்",
    count: "35+ Items",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
    desc: "Full-Grain Belts, Silk Ties, Pocket Squares & Cufflinks"
  },
  {
    id: "Innerwear",
    name: "Luxe Loungewear",
    nameTa: "இன்னர்வேர் & லவுஞ்ச்வேர்",
    count: "12+ Items",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    desc: "Micro-Modal Silk Touch Boxers & Bamboo Loungewear"
  }
];
