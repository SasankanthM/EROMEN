export type Language = 'en' | 'ta';
export type ThemeMode = 'dark' | 'light';

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
