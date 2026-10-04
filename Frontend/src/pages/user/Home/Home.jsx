import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Star } from "lucide-react";
import Electronic from '../../../assets/Electronics.webp'
import Mobile from '../../../assets/Mobile.jpg'
import Sports from '../../../assets/Sports.jpg'
import Fashion from '../../../assets/Fashion.jpg'
import Appliances from '../../../assets/Appliances.jpg'
import Beauty from '../../../assets/Beauty.webp'
import Watch from '../../../assets/Watch.webp'
import Laptop from '../../../assets/Laptop.webp'
import { useSelector } from "react-redux";
import useProduct from "../../../hooks/useProduct";
import { useEffect } from "react";
import { ProductCard } from "../../../component/client/Home/ProductCard";

function Home() {
  
  const { getAllProducts } = useProduct();

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getAllProducts();
  }, []);

  const categories = [
    { name: "Mobile", value: "mobile", image: Mobile },
    { name: "Laptop", value: "laptop", image: Laptop },
    { name: "shoes", value: "shoes", image: Sports },
    { name: "Fashion", value: "fashion", image: Fashion },
    { name: "Watch", value: "watch", image: Watch },
    { name: "Electronics", value: "electronics", image: Electronic },
    { name: "Beauty", value: "beauty", image: Beauty },
    { name: "Appliances", value: "appliances", image: Appliances },
  ];

  const getDiscount = (price, discountPrice) => {
    if (!price || !discountPrice || price <= discountPrice) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const SectionHeader = ({ eyebrow, title, linkTo }) => (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
          {eyebrow}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900">
          {title}
        </h2>
      </div>

      <Link
        to='/product'
        className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 group"
      >
        View All
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );

  return (
    <main className="bg-white text-gray-900">

      <section className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 items-center gap-16">

            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full mb-6">
                New Collection 2026
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Discover Your
                <span className="block text-gray-900">Perfect Style.</span>
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
                Explore our latest collection of premium products, carefully
                selected to bring quality and style to your everyday life.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  to="/product"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/product"
                  className="inline-flex items-center px-7 py-3.5 rounded-xl border border-gray-300 font-medium bg-white hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Explore Collection
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-2xl font-bold">10k+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-gray-500">Premium Products</p>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div>
                  <p className="text-2xl font-bold">4.8★</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gray-900/5 rounded-3xl -z-10 hidden lg:block" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                alt="Shopping collection"
                className="w-full h-[420px] lg:h-[520px] object-cover rounded-2xl shadow-xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
              { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeader eyebrow="Browse" title="Shop by Category" linkTo="/categories" />

        <div className="flex overflow-x-auto gap-5 pb-2 scrollbar-none">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/product?category=${category.value}`}
              className="group relative flex-none overflow-hidden rounded-2xl w-48 h-64 shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <h3 className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                {category.name}
              </h3>
              <span className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-white" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionHeader eyebrow="Popular" title="Trending Products" linkTo="/products" />

          <div className="flex overflow-x-auto gap-5 pb-2 scrollbar-none">
            {products.slice(0, 10).map((product) => (
              <ProductCard  product={product} getDiscount={getDiscount} />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeader eyebrow="Recent" title="Latest Products" linkTo="/products" />

        <div className="flex overflow-x-auto gap-5 pb-2 scrollbar-none">
          {[...products].reverse().slice(0, 10).map((product) => (
            <ProductCard product={product} getDiscount={getDiscount} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gray-900 text-white rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">

            <div className="p-10 lg:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                Limited Time Offer
              </p>

              <h2 className="text-3xl lg:text-4xl font-bold mt-4 leading-tight">
                Up to 40% Off
                <span className="block text-gray-400 text-lg font-normal mt-2">
                  On selected items, this week only.
                </span>
              </h2>

              <Link
                to="/product"
                className="inline-flex items-center gap-2 mt-8 bg-white text-gray-900 px-7 py-3.5 rounded-xl font-medium hover:bg-gray-200 active:scale-95 transition-all"
              >
                Shop Sale
                <ArrowRight size={18} />
              </Link>
            </div>

            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=80"
              alt="Sale collection"
              className="w-full h-80 md:h-full object-cover"
            />

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;