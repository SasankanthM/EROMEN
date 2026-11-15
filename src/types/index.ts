export type Language = 'en' | 'ta';
export type ThemeMode = 'dark' | 'light';
export type UserRole = 'customer' | 'seller';

export type ProductCategory =
  | 'All'
  | 'Shirts'
  | 'T-Shirts'
  | 'Trousers'
  | 'Jeans'
  | 'Ethnic Wear'
  | 'Formal Wear'
  | 'Innerwear'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  nameTa?: string;
  category: ProductCategory;
  price: number; // in INR
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  sizes: string[];
  colors: ProductColor[];
  description: string;
  descriptionTa?: string;
  fabric: string;
  fit: string;
  occasion: 'Wedding' | 'Formal' | 'Casual' | 'Festive' | 'All';
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  sku: string;
  inStockTexValley: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  description: string;
}

export interface FilterState {
  category: ProductCategory;
  size: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
  occasion: string;
}

export interface OutfitLook {
  id: string;
  title: string;
  titleTa: string;
  occasion: string;
  top: Product;
  bottom: Product;
  accessory?: Product;
  discountPercent: number;
  story: string;
}

export interface StyleQuizResult {
  vibe: string;
  recommendationNote: string;
  recommendedProducts: Product[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt?: string;
}

export type OrderStatus =
  | 'Order Received'
  | 'In Tailoring & Alteration'
  | 'Quality Check & Packed'
  | 'Ready at Tex Valley / Dispatched'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  image: string;
  selectedSize: string;
  selectedColorName: string;
  selectedColorHex: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  pincode?: string;
  paymentMethod: 'cod' | 'upi' | 'store';
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  assignedTailor: string;
  tailorNotes: string;
  estimatedReadyTime: string;
  createdAt: string;
  updatedAt: string;
}
