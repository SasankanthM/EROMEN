import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { SHOP_CONFIG } from '../data/shopConfig';
import { Product, ProductColor } from '../types';
import {
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    language,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCartOpen,
    showToast
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello EROMEN (Tex Valley, Perundurai)!\n` +
      `I would like to order/inquire about this garment:\n\n` +
      `• Item: ${product.name}\n` +
      `• SKU: ${product.sku}\n` +
      `• Size: ${selectedSize}\n` +
      `• Color: ${selectedColor.name}\n` +
      `• Quantity: ${quantity}\n` +
      `• Price: ${formatPrice(product.price * quantity)}\n\n` +
      `Can you confirm immediate availability at Tex Valley store?`
    );
    window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121419] border border-[#2b2e3b] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#171920]/80 backdrop-blur-md text-[#a09a8e] hover:text-white hover:bg-[#252834] transition-all"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* MODAL SCROLLABLE BODY */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* LEFT: IMAGE GALLERY & ZOOM */}
            <div className="space-y-4">
              <div
                className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#181a22] border border-[#262833] cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                    isZoomed ? 'scale-150' : 'scale-100 hover:scale-105'
                  }`}
                />

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8b1e1e] text-white text-xs font-bold tracking-wider uppercase rounded shadow-lg">
                    {product.discountPercentage}% OFF
                  </span>
                )}

                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-[#ded9cf]">
                  Click to Zoom
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border transition-all ${
                    selectedImage === product.image ? 'border-[#c5a880] ring-2 ring-[#c5a880]/30' : 'border-[#262833] opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail main" className="w-full h-full object-cover" />
                </button>
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border transition-all ${
                      selectedImage === img ? 'border-[#c5a880] ring-2 ring-[#c5a880]/30' : 'border-[#262833] opacity-60'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: DETAILS, SIZE SELECTOR, ADD TO CART */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#c5a880] mb-1 font-semibold tracking-widest uppercase">
                  <span>{product.category} &bull; {product.occasion}</span>
                  <span className="text-[#a09a8e] font-mono text-[11px]">SKU: {product.sku}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white leading-tight">
                  {language === 'en' ? product.name : product.nameTa || product.name}
                </h2>

                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-2xl font-bold text-white font-editorial">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#7d7971] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <span className="px-2 py-0.5 bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 text-[10px] font-bold rounded">
                    Tax Included
                  </span>
                </div>
              </div>

              {/* IN-STORE PICKUP STATUS */}
              <div className="bg-[#171922] border border-[#2b2e3c] rounded-lg p-3 flex items-start space-x-3">
                <MapPin size={18} className="text-[#c5a880] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white">In Stock at Tex Valley Mall Flagship</span>
                  <p className="text-[#a09a8e] mt-0.5">
                    Ready for 2-hour pickup or free express delivery across Tamil Nadu. Free alteration in-store.
                  </p>
                </div>
              </div>

              {/* COLOR SELECTOR */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#a09a8e]">
                  <span>Color: <strong className="text-white">{selectedColor.name}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  {product.colors.map(col => (
                    <button
                      key={col.hex}
                      onClick={() => setSelectedColor(col)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor.hex === col.hex
                          ? 'border-[#c5a880] scale-110 shadow-md ring-2 ring-[#c5a880]/30'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor.hex === col.hex && (
                        <Check size={14} className="text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR WITH SIZE GUIDE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#a09a8e]">
                    Selected Size: <strong className="text-white">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#c5a880] hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <Ruler size={13} />
                    <span>View Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 text-xs font-semibold rounded border transition-all ${
                        selectedSize === size
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880] shadow-md'
                          : 'border-[#2d303b] text-[#d6d0c4] hover:border-[#c5a880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY & ACTIONS */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-[#171922] border border-[#2b2e3c] rounded px-3 py-2">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="text-[#a09a8e] hover:text-white px-1.5 font-bold"
                    >
                      -
                    </button>
                    <span className="mx-3 text-xs font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="text-[#a09a8e] hover:text-white px-1.5 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-[0.18em] rounded flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 bg-[#171922] hover:bg-[#222530] border border-[#2b2e3c] rounded text-[#d6d0c4] hover:text-[#e05252] transition-colors"
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={18} className={inWishlist ? 'fill-[#e05252] text-[#e05252]' : ''} />
                  </button>
                </div>

                {/* DIRECT BUY ON WHATSAPP BUTTON */}
                <button
                  onClick={handleBuyOnWhatsApp}
                  className="w-full py-3 bg-[#1c2e22] hover:bg-[#233a2b] border border-[#2e593a] text-emerald-300 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Buy Direct on WhatsApp (Tex Valley Store)</span>
                </button>
              </div>

              {/* SPECIFICATIONS & ACCORDION */}
              <div className="pt-4 border-t border-[#232631] space-y-3 text-xs text-[#a09a8e]">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#6d6b66] block">Fabric Composition:</span>
                    <span className="text-white font-medium">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="text-[#6d6b66] block">Silhouette / Fit:</span>
                    <span className="text-white font-medium">{product.fit}</span>
                  </div>
                </div>

                <p className="text-[#c7c1b5] leading-relaxed pt-1">
                  {language === 'en' ? product.description : product.descriptionTa || product.description}
                </p>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#232631]">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Complementary Pieces (Complete The Look)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rp => (
                  <div
                    key={rp.id}
                    onClick={() => {
                      setQuickViewProduct(rp);
                      setSelectedImage(rp.image);
                      setSelectedSize(rp.sizes[0]);
                      setSelectedColor(rp.colors[0]);
                    }}
                    className="flex items-center space-x-3 bg-[#171922] hover:bg-[#1e212d] p-3 rounded-lg border border-[#262936] cursor-pointer transition-all"
                  >
                    <img src={rp.image} alt={rp.name} className="w-14 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#c5a880] uppercase tracking-wider">{rp.category}</span>
                      <h5 className="text-xs font-semibold text-white truncate">{rp.name}</h5>
                      <p className="text-xs font-bold text-[#e6d5b8] font-editorial">{formatPrice(rp.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
