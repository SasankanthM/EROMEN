import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Eye,
  Heart,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const {
    language,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(17000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');

  const categories: ProductCategory[] = [
    'All',
    'Shirts',
    'Ethnic Wear',
    'Formal Wear',
    'Trousers',
    'Jeans',
    'T-Shirts',
    'Accessories',
    'Innerwear'
  ];

  const allSizes = ['All', '38 (S)', '40 (M)', '42 (L)', '44 (XL)', '30 Waist', '32 Waist', '34 Waist', '36 Waist'];
  const allOccasions = ['All', 'Wedding', 'Formal', 'Casual', 'Festive'];

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesFabric && !matchesTags) {
          return false;
        }
      }

      // Size match
      if (selectedSize !== 'All') {
        const hasSize = product.sizes.some(s => s.toLowerCase().includes(selectedSize.toLowerCase().split(' ')[0]));
        if (!hasSize) return false;
      }

      // Price match
      if (product.price > maxPrice) {
        return false;
      }

      // Occasion match
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion && product.occasion !== 'All') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedSize, maxPrice, selectedOccasion, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedSize('All');
    setSelectedColor('All');
    setMaxPrice(17000);
    setSelectedOccasion('All');
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (maxPrice < 17000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="w-full min-h-screen bg-[#0c0d10] text-[#f4efe6] py-10 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP TITLE & BREADCRUMB */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#c5a880] mb-1">
            <span>ATELIER CATALOG</span>
            <span>•</span>
            <span>{selectedCategory}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            {selectedCategory === 'All' ? 'Complete EROMEN Collection' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#a09a8e] mt-1 max-w-xl">
            Exquisite fabrics tailored for the discerning South Indian gentleman. All pieces eligible for complimentary in-store alteration at Tex Valley, Perundurai.
          </p>
        </div>

        {/* SEARCH & CONTROLS TOOLBAR */}
        <div className="bg-[#121419] border border-[#232630] rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a09a8e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by fabric, fit, style..."
              className="w-full bg-[#181a22] border border-[#303340] rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-[#7a7d88] focus:outline-none focus:border-[#c5a880]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a09a8e] hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick results count & sorting */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-4">
            <span className="text-xs text-[#a09a8e]">
              Showing <strong className="text-white">{filteredProducts.length}</strong> creations
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-2 bg-[#1a1c24] border border-[#323543] rounded text-xs font-semibold text-[#c5a880]"
            >
              <SlidersHorizontal size={14} />
              <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-xs text-[#a09a8e]">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#181a22] border border-[#303340] rounded px-3 py-2 text-xs text-[#dcd7ce] focus:outline-none focus:border-[#c5a880] cursor-pointer"
              >
                <option value="featured">Featured Editorial</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: DESKTOP SIDEBAR (4 COLS) + PRODUCT GRID (8 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-[#121419] border border-[#232630] rounded-xl p-5 space-y-6 sticky top-28">
              {/* Filter Header & Reset */}
              <div className="flex items-center justify-between pb-3 border-b border-[#20222a]">
                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-[#c5a880]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Refine By</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#c5a880] hover:underline flex items-center space-x-1"
                  >
                    <RotateCcw size={12} />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* 1. Category Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e]">Category</span>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold'
                          : 'text-[#d5cfc5] hover:bg-[#1b1d24] hover:text-[#c5a880]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] opacity-75">
                        {cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Occasion Filter */}
              <div className="space-y-2 pt-3 border-t border-[#20222a]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e]">Occasion</span>
                <div className="flex flex-wrap gap-1.5">
                  {allOccasions.map(occ => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-2.5 py-1 text-xs rounded border transition-all ${
                        selectedOccasion === occ
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303b] text-[#c7c2b6] hover:border-[#c5a880]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Size Filter */}
              <div className="space-y-2 pt-3 border-t border-[#20222a]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e]">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 py-1 text-xs rounded border transition-all ${
                        selectedSize === size
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303b] text-[#c7c2b6] hover:border-[#c5a880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Price Slider */}
              <div className="space-y-2 pt-3 border-t border-[#20222a]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#a09a8e]">Max Budget</span>
                  <span className="font-bold text-[#c5a880] font-editorial text-sm">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={17000}
                  step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#c5a880] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#787a82]">
                  <span>₹1,000</span>
                  <span>₹17,000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCT CARDS GRID (3 COLS ON LARGE) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#121419] border border-[#232630] rounded-xl p-12 text-center space-y-4">
                <Sparkles size={32} className="text-[#c5a880] mx-auto opacity-70" />
                <h3 className="text-xl font-bold font-editorial text-white">No Creations Matched Your Filters</h3>
                <p className="text-xs text-[#a09a8e] max-w-sm mx-auto">
                  Try widening your price range, clearing selected sizes, or resetting all filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const inWishlist = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group bg-[#131418] border border-[#22242c] rounded-xl overflow-hidden hover:border-[#c5a880]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a880]/10 flex flex-col justify-between"
                    >
                      {/* PRODUCT IMAGE & HOVER ACTIONS */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#181a20]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                          {product.discountPercentage > 0 && (
                            <span className="px-2 py-0.5 bg-[#8b1e1e] text-white text-[10px] font-bold tracking-widest uppercase rounded shadow">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="px-2 py-0.5 bg-[#c5a880] text-[#0e0f12] text-[10px] font-bold tracking-widest uppercase rounded shadow">
                              FEATURED
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-[#14151a]/80 backdrop-blur-md text-[#d5cfc5] hover:text-[#e05252] hover:bg-[#14151a] transition-all z-10"
                          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart
                            size={16}
                            className={inWishlist ? 'fill-[#e05252] text-[#e05252]' : ''}
                          />
                        </button>

                        {/* Quick View Hover Strip */}
                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 z-10">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="flex-1 py-2 px-3 bg-[#171920]/90 backdrop-blur-md hover:bg-[#c5a880] text-white hover:text-[#0e0f12] text-xs font-semibold tracking-wider uppercase rounded flex items-center justify-center space-x-1.5 transition-all shadow-lg"
                          >
                            <Eye size={13} />
                            <span>Quick View</span>
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-2 bg-[#c5a880] hover:bg-[#dfc29a] text-[#0e0f12] rounded transition-all shadow-lg"
                            title="Instant Add to Cart"
                          >
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                      </div>

                      {/* PRODUCT TEXT & SPECS */}
                      <div className="p-4 flex flex-col flex-1 justify-between space-y-2.5">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-[#a09a8e] mb-1">
                            <span className="uppercase tracking-wider font-semibold text-[#c5a880]">
                              {product.category}
                            </span>
                            <span>★ {product.rating}</span>
                          </div>

                          <h3
                            onClick={() => setQuickViewProduct(product)}
                            className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-1"
                          >
                            {language === 'en' ? product.name : product.nameTa || product.name}
                          </h3>

                          <p className="text-xs text-[#9d978d] mt-1 line-clamp-1 font-light">
                            {product.fabric}
                          </p>

                          {/* Color swatches preview */}
                          <div className="flex items-center space-x-1 mt-2">
                            {product.colors.map(col => (
                              <span
                                key={col.hex}
                                className="w-3 h-3 rounded-full border border-white/20"
                                style={{ backgroundColor: col.hex }}
                                title={col.name}
                              />
                            ))}
                          </div>
                        </div>

                        {/* PRICE & ADD BUTTON */}
                        <div className="pt-2 border-t border-[#1f2129] flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-base font-bold text-white font-editorial">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-xs text-[#7d7971] line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1.5 bg-[#1e2029] hover:bg-[#c5a880] text-[#c5a880] hover:text-[#0e0f12] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121419] border border-[#232630] rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#20222a]">
              <span className="text-sm font-bold uppercase tracking-wider text-white">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#a09a8e] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6 overflow-y-auto flex-1">
              {/* Category */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block mb-2">Category</span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 text-xs rounded border text-left transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303b] text-[#c7c2b6]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block mb-2">Occasion</span>
                <div className="flex flex-wrap gap-2">
                  {allOccasions.map(occ => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-3 py-1.5 text-xs rounded border ${
                        selectedOccasion === occ
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303b] text-[#c7c2b6]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a09a8e] block mb-2">Size</span>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs rounded border ${
                        selectedSize === size
                          ? 'bg-[#c5a880] text-[#0e0f12] font-bold border-[#c5a880]'
                          : 'border-[#2d303b] text-[#c7c2b6]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#20222a] flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-[#373a46] rounded text-xs font-bold uppercase tracking-wider text-[#a09a8e]"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#c5a880] rounded text-xs font-bold uppercase tracking-wider text-[#0e0f12]"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
