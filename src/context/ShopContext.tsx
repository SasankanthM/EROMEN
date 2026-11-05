import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, ProductCategory, Language, ThemeMode, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS, DICTIONARY } from '../data/shopConfig';

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: (key: keyof typeof DICTIONARY['en']) => string;
  
  // Navigation & View state
  activePage: string;
  setActivePage: (page: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number) => void;
  updateQuantity: (productId: string, size: string, colorHex: string, delta: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Coupons & Pricing
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  cartCount: number;
  formatPrice: (val: number) => string;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Modals & Tools
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStyleQuizOpen: boolean;
  setIsStyleQuizOpen: (open: boolean) => void;
  isWardrobeOpen: boolean;
  setIsWardrobeOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  // Filtering & Search
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Notification Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activePage, setActivePage] = useState<string>('home');

  // Cart state initialized with 1 luxury item so user sees active cart ready to go
  const [cart, setCart] = useState<CartItem[]>(() => {
    const initialItem = PRODUCTS[0];
    return [
      {
        product: initialItem,
        selectedSize: initialItem.sizes[0],
        selectedColor: initialItem.colors[0],
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['eromen-eth-01', 'eromen-frm-01']);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStyleQuizOpen, setIsStyleQuizOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
    showToast(language === 'en' ? 'தமிழ் மொழி மாற்றப்பட்டது' : 'Switched to English');
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }
      return next;
    });
  };

  const t = (key: keyof typeof DICTIONARY['en']): string => {
    const dict = DICTIONARY[language] || DICTIONARY['en'];
    return (dict as Record<string, string>)[key] || DICTIONARY['en'][key] || key;
  };

  const formatPrice = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Cart actions
  const addToCart = (
    product: Product,
    size?: string,
    color?: ProductColor,
    quantity: number = 1
  ) => {
    const finalSize = size || product.sizes[0];
    const finalColor = color || product.colors[0];

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedSize === finalSize &&
          item.selectedColor.hex === finalColor.hex
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: finalSize,
            selectedColor: finalColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${finalSize}) to your cart`);
  };

  const updateQuantity = (
    productId: string,
    size: string,
    colorHex: string,
    delta: number
  ) => {
    setCart(prev =>
      prev
        .map(item => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          )
      )
    );
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your personal wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Totals calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal > 1999 || subtotal === 0 ? 0 : 150;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find(c => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try EROFIRST or PONGAL2026' };
    }
    if (found.minSpend && subtotal < found.minSpend) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ${formatPrice(found.minSpend)}`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Applied ${found.code}: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        t,
        activePage,
        setActivePage,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        cartCount,
        formatPrice,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStyleQuizOpen,
        setIsStyleQuizOpen,
        isWardrobeOpen,
        setIsWardrobeOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
