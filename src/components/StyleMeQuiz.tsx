import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, X, Check, ArrowRight, RotateCcw, ShoppingBag, Eye } from 'lucide-react';

export const StyleMeQuiz: React.FC = () => {
  const {
    isStyleQuizOpen,
    setIsStyleQuizOpen,
    language,
    formatPrice,
    addToCart,
    setQuickViewProduct
  } = useShop();

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('Wedding');
  const [fit, setFit] = useState<string>('Italian Slim Fit');
  const [palette, setPalette] = useState<string>('Royal Gold & Ivory');
  const [budget, setBudget] = useState<string>('₹2,500 - ₹6,000');
  const [showResults, setShowResults] = useState(false);

  if (!isStyleQuizOpen) return null;

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
  };

  // Algorithm to pick 3 matching products based on user selections
  const getRecommendations = (): { personaTitle: string; advice: string; items: Product[] } => {
    let items: Product[] = [];
    let personaTitle = "The Modern Kongu Gentleman";
    let advice = "A balanced symphony of handloom purity and sharp contemporary lines.";

    if (occasion === 'Wedding') {
      personaTitle = "The Muhurtham Dignitary";
      advice = "Draped in certified mulberry silks and antique zari borders, commanding reverence at any wedding canopy.";
      items = PRODUCTS.filter(p => p.occasion === 'Wedding' || p.category === 'Ethnic Wear').slice(0, 3);
    } else if (occasion === 'Formal') {
      personaTitle = "The Boardroom Visionary";
      advice = "Crisp double-cuff twills and high-rise Gurkha pleats designed for confident command and effortless authority.";
      items = PRODUCTS.filter(p => p.occasion === 'Formal' || p.category === 'Formal Wear' || p.category === 'Trousers').slice(0, 3);
    } else {
      personaTitle = "The Unstructured Minimalist";
      advice = "Breezy Egyptian Giza linen coupled with stretch flex chinos for an understated, worldly nonchalance.";
      items = PRODUCTS.filter(p => p.occasion === 'Casual' || p.category === 'Shirts' || p.category === 'Jeans').slice(0, 3);
    }

    if (items.length < 3) {
      items = PRODUCTS.slice(0, 3);
    }

    return { personaTitle, advice, items };
  };

  const results = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#13151b] border border-[#2d303d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* TOP MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232631] bg-[#101116]">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-[#c5a880]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#c5a880]">
              EROMEN PERSONAL STYLIST
            </span>
          </div>
          <button
            onClick={() => setIsStyleQuizOpen(false)}
            className="p-1.5 rounded-full text-[#a09a8e] hover:text-white hover:bg-[#1f222b] transition-all"
            aria-label="Close Quiz"
          >
            <X size={18} />
          </button>
        </div>

        {/* PROGRESS STEPPER (IF NOT IN RESULTS) */}
        {!showResults && (
          <div className="w-full bg-[#171920] px-6 py-3 border-b border-[#232631] flex items-center justify-between text-xs text-[#a09a8e]">
            <span className="font-semibold text-white">Step {step} of 4</span>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`w-8 h-1 rounded-full transition-all ${
                    s <= step ? 'bg-[#c5a880]' : 'bg-[#2b2e3a]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">
          {!showResults ? (
            <div className="space-y-6">
              {/* STEP 1: OCCASION */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-editorial">
                      What occasion are you preparing for?
                    </h3>
                    <p className="text-xs text-[#a09a8e]">
                      Every garment at EROMEN is cut with a distinct ceremonial or professional poise.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'Wedding', title: 'Wedding & Muhurtham', desc: 'Reception suits, pure silk veshtis & sherwanis' },
                      { id: 'Formal', title: 'Corporate & Boardroom', desc: 'Bespoke slacks, twill shirts & tailored blazers' },
                      { id: 'Casual', title: 'Weekend Luxury / Cafe', desc: 'Breezy Giza linen, polos & selvedge denim' },
                      { id: 'Festive', title: 'Festival & Celebrations', desc: 'Pongal silk kurtas & embroidered jackets' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setOccasion(opt.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          occasion === opt.id
                            ? 'bg-[#1e222c] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-[#15171e] border-[#262833] hover:border-[#3d4150]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-white">{opt.title}</h4>
                          {occasion === opt.id && <Check size={16} className="text-[#c5a880]" />}
                        </div>
                        <p className="text-xs text-[#a09a8e]">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: SILHOUETTE */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-editorial">
                      What fit matches your physique & comfort?
                    </h3>
                    <p className="text-xs text-[#a09a8e]">
                      Our Tex Valley atelier offers on-site custom adjustments for any shape.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'Italian Slim Fit', title: 'Sharp Italian Slim Fit', desc: 'Tapered waist, clean lines, hugging the silhouette' },
                      { id: 'Tailored Contemporary', title: 'Tailored Contemporary', desc: 'Balanced drape with ease of movement through the chest' },
                      { id: 'Royal Traditional', title: 'Royal Traditional Draped', desc: 'Classic generous cuts in pure silk and natural weaves' },
                      { id: 'Relaxed Boxy', title: 'Modern Relaxed Boxy', desc: 'Street-inspired drop shoulder and comfortable flex' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setFit(opt.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          fit === opt.id
                            ? 'bg-[#1e222c] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-[#15171e] border-[#262833] hover:border-[#3d4150]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-white">{opt.title}</h4>
                          {fit === opt.id && <Check size={16} className="text-[#c5a880]" />}
                        </div>
                        <p className="text-xs text-[#a09a8e]">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: COLOR PALETTE */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-editorial">
                      Select your preferred color harmony
                    </h3>
                    <p className="text-xs text-[#a09a8e]">
                      Harmonious shades curated for South Indian skin undertones.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'Royal Gold & Ivory', title: 'Royal Gold & Champagne', colors: ['#DFD2AE', '#FFF8EA', '#C5A880'] },
                      { id: 'Midnight Onyx & Navy', title: 'Midnight Obsidian & Venetian Navy', colors: ['#121212', '#1A2536', '#2A2C31'] },
                      { id: 'Earthy Olive & Terracotta', title: 'Earthy Sage, Olive & Terracotta', colors: ['#7D8C7C', '#4E5346', '#A65B47'] },
                      { id: 'Monochrome Minimalist', title: 'Architectural Charcoal & Pure White', colors: ['#FFFFFF', '#3A3D44', '#161719'] }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPalette(opt.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          palette === opt.id
                            ? 'bg-[#1e222c] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-[#15171e] border-[#262833] hover:border-[#3d4150]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white">{opt.title}</h4>
                          {palette === opt.id && <Check size={16} className="text-[#c5a880]" />}
                        </div>
                        <div className="flex items-center space-x-1.5">
                          {opt.colors.map(c => (
                            <span
                              key={c}
                              className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: BUDGET RANGE */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-editorial">
                      What is your anticipated ensemble budget?
                    </h3>
                    <p className="text-xs text-[#a09a8e]">
                      We craft perfection at accessible price points directly from Tex Valley.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'Under ₹2,500', title: 'Under ₹2,500', note: 'Everyday Luxury Shirts & Polos' },
                      { id: '₹2,500 - ₹6,000', title: '₹2,500 - ₹6,000', note: 'Bespoke Trousers & Silk Kurtas' },
                      { id: '₹6,000+', title: '₹6,000 - ₹15,000+', note: '3-Piece Suits & Bridal Veshtis' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setBudget(opt.id)}
                        className={`text-center p-4 rounded-xl border transition-all ${
                          budget === opt.id
                            ? 'bg-[#1e222c] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-[#15171e] border-[#262833] hover:border-[#3d4150]'
                        }`}
                      >
                        <h4 className="text-sm font-bold text-[#c5a880] font-editorial">{opt.title}</h4>
                        <p className="text-[11px] text-[#a09a8e] mt-1">{opt.note}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* RESULTS VIEW */
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#181a22] border border-[#2e313f] p-5 rounded-xl space-y-2 text-center">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#c5a880]">
                  ✦ YOUR CURATED STYLIST DOSSIER ✦
                </span>
                <h3 className="text-2xl font-bold text-white font-editorial">
                  {results.personaTitle}
                </h3>
                <p className="text-xs text-[#d1ccc4] max-w-lg mx-auto font-light leading-relaxed">
                  "{results.advice}"
                </p>
              </div>

              {/* RECOMMENDED PRODUCT CARDS */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#a09a8e]">
                  Handpicked Garments For You
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {results.items.map(product => (
                    <div
                      key={product.id}
                      className="bg-[#16181f] border border-[#252834] rounded-lg p-3 flex flex-col justify-between"
                    >
                      <div className="aspect-[3/4] rounded overflow-hidden mb-2 bg-[#0e0f12]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h5 className="text-xs font-semibold text-white line-clamp-1">{product.name}</h5>
                      <p className="text-xs font-bold text-[#c5a880] font-editorial mt-1">
                        {formatPrice(product.price)}
                      </p>

                      <div className="mt-3 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            setIsStyleQuizOpen(false);
                          }}
                          className="flex-1 py-1.5 bg-[#c5a880] hover:bg-[#dfc29a] text-[#0e0f12] text-[10px] font-bold uppercase rounded flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag size={12} />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => {
                            setQuickViewProduct(product);
                          }}
                          className="p-1.5 bg-[#20232c] hover:bg-[#2b2e3b] text-white rounded text-[10px]"
                          title="Quick View"
                        >
                          <Eye size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION FOOTER */}
        <div className="px-6 py-4 border-t border-[#232631] bg-[#101116] flex items-center justify-between">
          {!showResults ? (
            <>
              <button
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="text-xs text-[#a09a8e] hover:text-white disabled:opacity-30 disabled:pointer-events-none uppercase tracking-wider font-semibold"
              >
                Back
              </button>

              <button
                onClick={() => {
                  if (step < 4) {
                    setStep(prev => prev + 1);
                  } else {
                    setShowResults(true);
                  }
                }}
                className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-2 transition-all"
              >
                <span>{step === 4 ? 'Reveal Recommendations' : 'Next Question'}</span>
                <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-xs text-[#a09a8e] hover:text-[#c5a880] uppercase tracking-wider"
              >
                <RotateCcw size={14} />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => setIsStyleQuizOpen(false)}
                className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
