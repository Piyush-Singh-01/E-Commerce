import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Filter, ChevronDown, X } from "lucide-react";
import { toast } from "react-toastify";
import useProduct from "../../../hooks/useProduct";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const normalizeValue = (value) => {
  return value?.trim().toLowerCase();
};

const CATEGORY_OPTIONS = [
  { label: "Mobile", value: "mobile" },
  { label: "Fashion", value: "fashion" },
  { label: "Laptop", value: "laptop" },
  { label: "Watch", value: "watch" },
  { label: "Shoes", value: "shoes" },
  { label: "Beauty", value: "beauty" },
];

const PRICE_RANGES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000+", min: 100000, max: null },
];

function Product() {
  const products = useSelector((store) => store.product.products) || [];
  const { getAllProducts } = useProduct();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Filter Values
  const searchQuery = searchParams.get("search") || "";
  const categories = searchParams.get("category")
    ? searchParams.get("category").split(",").map(normalizeValue).filter(Boolean)
    : [];
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const sortOption = searchParams.get("sort") || "";

  const updateSearchParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else {
        params.set(key, Array.isArray(value) ? value.join(",") : value);
      }
    });
    setSearchParams(params);
  };

  const handlePriceRangeChange = (min, max) => {
    updateSearchParams({
      minPrice: min > 0 ? min : null,
      maxPrice: max !== null ? max : null,
    });
  };

  const handleSortChange = (e) => {
    updateSearchParams({
      sort: e.target.value || null,
    });
  };

  const handleCategoryChange = (e) => {
    const category = normalizeValue(e.target.value);
    const newCategories = e.target.checked
      ? [...new Set([...categories, category])]
      : categories.filter((item) => item !== category);

    updateSearchParams({ category: newCategories });
  };

  const removeFilter = (key, value = null) => {
    const params = new URLSearchParams(searchParams);
    if (key === "category" && value) {
      const newCategories = categories.filter((category) => category !== value);
      if (newCategories.length > 0) {
        params.set("category", newCategories.join(","));
      } else {
        params.delete("category");
      }
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };
  
  // FILTER & SROT PRODUCTS
  const matchesSearch = (product, query) => {
    if (!query) return true;
    const normalizedQuery = normalizeValue(query);
    return (
      normalizeValue(product.productName)?.includes(normalizedQuery) ||
      normalizeValue(product.brand)?.includes(normalizedQuery) ||
      normalizeValue(product.category)?.includes(normalizedQuery)
    );
  };

  const filterData = products.filter((product) => {
    const matchSearch = matchesSearch(product, searchQuery);
    const matchCategory =
      categories.length === 0 ||
      categories.some((category) => normalizeValue(category) === normalizeValue(product.category));
    const productPrice = product.discountPrice || product.price;
    const matchPrice = productPrice >= minPrice && (maxPrice === null || productPrice <= maxPrice);

    return matchSearch && matchCategory && matchPrice;
  });

  const sortedProducts = [...filterData];
  if (sortOption === "price-low") {
    sortedProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sortOption === "price-high") {
    sortedProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        await getAllProducts();
      } catch (error) {
        toast.error(error?.response?.data?.response || "Something went wrong in fetching data");
      }
    };
    getProducts();
  }, []);

   useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-12 font-sans pb-24">
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Explore Products
        </h1>
        <p className="mt-3 text-base text-slate-500 md:text-lg">
          Discover the latest premium devices and find what you love.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row max-w-7xl mx-auto">
        {/* Mobile Backdrop */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:shadow-none ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto p-6 lg:sticky lg:top-24 lg:h-auto lg:overflow-visible lg:rounded-3xl lg:border lg:border-slate-200 lg:bg-white lg:p-6 lg:shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden p-2 cursor-pointer text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Categories
              </h3>
              <div className="space-y-3">
                {CATEGORY_OPTIONS.map((category) => (
                  <label
                    key={category.value}
                    className="group flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      value={category.value}
                      checked={categories.includes(category.value)}
                      onChange={handleCategoryChange}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    {category.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Price Range
              </h3>
              <div className="space-y-3">
                {PRICE_RANGES.map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={minPrice === range.min && maxPrice === range.max}
                      onChange={() => handlePriceRangeChange(range.min, range.max)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-600">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 lg:hidden">
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Active Filters */}
          {(searchQuery || categories.length > 0 || minPrice > 0 || maxPrice !== null || sortOption) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">Active filters:</span>

              {searchQuery && (
                <button
                  onClick={() => removeFilter("search")}
                  className="flex items-center cursor-pointer gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Search: {searchQuery}
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {categories.map((category) => {
                const categoryLabel = CATEGORY_OPTIONS.find((item) => item.value === category)?.label || category;
                return (
                  <button
                    key={category}
                    onClick={() => removeFilter("category", category)}
                    className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Category: {categoryLabel}
                    <X className="h-3.5 w-3.5" />
                  </button>
                );
              })}

              {(minPrice > 0 || maxPrice !== null) && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("minPrice");
                    params.delete("maxPrice");
                    setSearchParams(params);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Price
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {sortOption && (
                <button
                  onClick={() => removeFilter("sort")}
                  className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  {sortOption === "price-low" ? "Price: Low to High" : "Price: High to Low"}
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              <button
                onClick={handleClearFilters}
                className="ml-1 text-xs cursor-pointer font-bold text-red-500 bg-red-50 py-1 px-2 rounded-2xl hover:bg-red-100 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Controls Bar */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <p className="text-sm font-medium text-slate-500 hidden sm:block">
                Showing <span className="font-bold text-slate-900">{sortedProducts.length}</span>{" "}
                {sortedProducts.length === 1 ? "product" : "products"}
              </p>

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex w-full justify-center items-center gap-2 cursor-pointer bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-200 transition-colors sm:w-auto"
              >
                <Filter className="w-4 h-4 text-indigo-600" />
                Filters
              </button>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-4 py-2.5 text-sm font-semibold text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:w-auto cursor-pointer"
              >
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Filter className="h-7 w-7 text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No products found</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find any products matching your current search and filters. Try removing a filter or changing your search.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 cursor-pointer text-sm font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sortedProducts.map((product) => {
                const hasDiscount = product.discountPrice && product.discountPrice < product.price;
                const discountPercent = hasDiscount
                  ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                  : 0;

                return (
                  <div
                    key={product._id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 p-6 sm:aspect-square cursor-pointer block"
                    >
                      {hasDiscount && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                          -{discountPercent}%
                        </span>
                      )}
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.productName}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {product.brand || product.category}
                      </span>
                      <Link
                        to={`/product/${product._id}`}
                        className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors min-h-[40px]"
                      >
                        {product.productName}
                      </Link>

                      <div className="mt-auto pt-4 flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-slate-900">
                            {formatPrice(product.discountPrice || product.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs font-medium text-slate-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-[11px] font-bold tracking-wide uppercase ${
                            product.stock === 0
                              ? "text-red-500"
                              : product.stock > 10
                              ? "text-emerald-500"
                              : "text-amber-500"
                          }`}
                        >
                          {product.stock > 10
                            ? "In Stock"
                            : product.stock === 0
                            ? "Out Of Stock"
                            : `Only ${product.stock} left`}
                        </p>
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
  );
}

export default Product;