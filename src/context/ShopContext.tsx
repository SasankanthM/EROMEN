
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  ProductCategory,
  Language,
  ThemeMode,
  ProductColor,
  User,
  Order,
  OrderStatus
} from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS, DICTIONARY } from '../data/shopConfig';

interface PlaceOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  pincode?: string;
  paymentMethod: 'cod' | 'upi' | 'store';
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: (key: keyof typeof DICTIONARY['en']) => string;

  activePage: string;
  setActivePage: (page: string) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;

  currentUser: User | null;
  loginIntent: string | null;
  setLoginIntent: (intent: string | null) => void;
  loginRoleTab: 'customer' | 'seller';
  setLoginRoleTab: (role: 'customer' | 'seller') => void;
  login: (
    email: string,
    password: string,
    portalRole?: 'customer' | 'seller'
  ) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  requireAuthForOrder: (intent?: string) => boolean;

  orders: Order[];
  ordersLoading: boolean;
  refreshOrders: () => Promise<void>;
  placeOrder: (
    payload: PlaceOrderPayload
  ) => Promise<{ success: boolean; order?: Order; error?: string }>;
  updateOrderProcedure: (
    orderId: string,
    updates: {
      status?: OrderStatus;
      assignedTailor?: string;
      tailorNotes?: string;
      estimatedReadyTime?: string;
    }
  ) => Promise<{ success: boolean; order?: Order; error?: string }>;

  cart: CartItem[];
  addToCart: (
    product: Product,
    size?: string,
    color?: ProductColor,
    quantity?: number
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    colorHex: string,
    delta: number
  ) => void;
  removeFromCart: (
    productId: string,
    size: string,
    colorHex: string
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  cartCount: number;
  formatPrice: (val: number) => string;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

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

  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'eromen_auth_user';
const TOKEN_STORAGE_KEY = 'eromen_auth_token';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activePage, setActivePage] = useState<string>('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);

      if (!saved || !token) return null;

      return JSON.parse(saved) as User;
    } catch {
      return null;
    }
  });

  const [loginIntent, setLoginIntent] = useState<string | null>(null);
  const [loginRoleTab, setLoginRoleTab] = useState<'customer' | 'seller'>('customer');

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Cart state
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

  const [wishlist, setWishlist] = useState<string[]>([
    'eromen-eth-01',
    'eromen-frm-01'
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStyleQuizOpen, setIsStyleQuizOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filtering and search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);

    setTimeout(() => {
      setToast(null);
    }, 3800);
  }, []);

  // Logout
  const logout = useCallback(() => {
    setCurrentUser(null);
    setOrders([]);

    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    if (activePage === 'client-panel' || activePage === 'my-orders') {
      setActivePage('home');
    }

    showToast('Signed out successfully.');
  }, [activePage, showToast]);

  // Fetch authenticated user's orders
  const refreshOrders = useCallback(async () => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      setOrders([]);
      return;
    }

    setOrdersLoading(true);

    try {
      const res = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data.orders || []);
      } else if (res.status === 401) {
        logout();
      } else {
        console.error('Failed to fetch orders:', data.error);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  }, [currentUser, logout]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  // Login
  const login = async (
    email: string,
    password: string,
    portalRole: 'customer' | 'seller' = 'customer'
  ) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, portalRole })
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }

      if (!data.token || !data.user) {
        return {
          success: false,
          error: 'Authentication token was not received.'
        };
      }

      const loggedInUser = data.user as User;

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));

      setCurrentUser(loggedInUser);

      // Fetch orders immediately after login
      try {
        const ordersRes = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });

        const ordersData = await ordersRes.json();

        if (ordersRes.ok) {
          setOrders(ordersData.orders || []);
        }
      } catch (err) {
        console.error('Unable to load orders after login:', err);
      }

      showToast(`Welcome back, ${loggedInUser.name}!`);

      return {
        success: true,
        user: loggedInUser
      };
    } catch {
      return {
        success: false,
        error: 'Unable to reach authentication server.'
      };
    }
  };

  // Customer registration
  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Registration failed'
        };
      }

      if (!data.token || !data.user) {
        return {
          success: false,
          error: 'Authentication token was not received.'
        };
      }

      const registeredUser = data.user as User;

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(registeredUser));

      setCurrentUser(registeredUser);

      showToast(`Account created! Welcome to EROMEN, ${registeredUser.name}.`);

      return {
        success: true,
        user: registeredUser
      };
    } catch {
      return {
        success: false,
        error: 'Unable to reach registration server.'
      };
    }
  };

  // Authentication requirement before checkout
  const requireAuthForOrder = (intent: string = 'checkout'): boolean => {
    if (!currentUser) {
      setLoginIntent(intent);
      setLoginRoleTab('customer');
      setIsCartOpen(false);
      setQuickViewProduct(null);
      setActivePage('login');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      showToast('Please sign in or register first to place your order.');

      return false;
    }

    return true;
  };

  // Language
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));

    showToast(
      language === 'en'
        ? 'தமிழ் மொழி மாற்றப்பட்டது'
        : 'Switched to English'
    );
  };

  // Theme
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

  // Translation
  const t = (key: keyof typeof DICTIONARY['en']): string => {
    const dict = DICTIONARY[language] || DICTIONARY['en'];

    return (dict as Record<string, string>)[key] || DICTIONARY['en'][key] || key;
  };

  // Price formatting
  const formatPrice = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Add to cart
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
      }

      return [
        ...prev,
        {
          product,
          selectedSize: finalSize,
          selectedColor: finalColor,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" (${finalSize}) to your bag`);
  };

  // Update quantity
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

            return newQty > 0
              ? { ...item, quantity: newQty }
              : null;
          }

          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const removeFromCart = (
    productId: string,
    size: string,
    colorHex: string
  ) => {
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

    showToast('Item removed from bag');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');

        return prev.filter(id => id !== productId);
      }

      showToast('Added to your personal wishlist');

      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const shippingFee = subtotal > 1999 || subtotal === 0 ? 0 : 150;

  let discountAmount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round(
        (subtotal * appliedCoupon.discountPercent) / 100
      );
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Apply coupon
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();

    const found = COUPONS.find(
      c => c.code.toUpperCase() === cleanCode
    );

    if (!found) {
      return {
        success: false,
        message: 'Invalid coupon code. Try EROFIRST or PONGAL2026'
      };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ${formatPrice(found.minSpend)}`
      };
    }

    setAppliedCoupon(found);

    return {
      success: true,
      message: `Applied ${found.code}: ${found.description}`
    };
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Place order
  const placeOrder = async (payload: PlaceOrderPayload) => {
    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to place an order.'
      };
    }

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      return {
        success: false,
        error: 'Please log in again.'
      };
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...payload,
          items: cart.map(c => ({
            productId: c.product.id,
            name: c.product.name,
            sku: c.product.sku,
            image: c.product.image,
            selectedSize: c.selectedSize,
            selectedColorName: c.selectedColor.name,
            selectedColorHex: c.selectedColor.hex,
            quantity: c.quantity,
            unitPrice: c.product.price
          })),
          subtotal,
          discountAmount,
          shippingFee,
          total,
          couponCode: appliedCoupon?.code
        })
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Failed to place order'
        };
      }

      await refreshOrders();

      return {
        success: true,
        order: data.order as Order
      };
    } catch {
      return {
        success: false,
        error: 'Network error while placing order.'
      };
    }
  };

  // Update order procedure (owner only)
  const updateOrderProcedure = async (
    orderId: string,
    updates: {
      status?: OrderStatus;
      assignedTailor?: string;
      tailorNotes?: string;
      estimatedReadyTime?: string;
    }
  ) => {
    if (!currentUser || currentUser.role !== 'seller') {
      return {
        success: false,
        error: 'Only seller/owner accounts can update order procedures.'
      };
    }

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      return {
        success: false,
        error: 'Please log in again.'
      };
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update order.'
        };
      }

      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? (data.order as Order)
            : o
        )
      );

      showToast(`Order ${orderId} procedure updated!`);

      return {
        success: true,
        order: data.order as Order
      };
    } catch {
      return {
        success: false,
        error: 'Network error updating order procedure.'
      };
    }
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
        mobileSidebarOpen,
        setMobileSidebarOpen,
        currentUser,
        loginIntent,
        setLoginIntent,
        loginRoleTab,
        setLoginRoleTab,
        login,
        register,
        logout,
        requireAuthForOrder,
        orders,
        ordersLoading,
        refreshOrders,
        placeOrder,
        updateOrderProcedure,
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
