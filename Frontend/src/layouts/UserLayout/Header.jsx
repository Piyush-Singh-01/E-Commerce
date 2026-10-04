import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart, MdMenu } from 'react-icons/md';
import { FiShoppingBag, FiUser, FiLogOut, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {user, isAuthenticated} = useAuth();

    const cart = useSelector((state) => state.cart.cart);
    
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const { logout } = useAuth();
    const {fetchCart} = useCart();

    const currentSearch = new URLSearchParams(location.search).get('search') || '';
    const products = useSelector((store) => store.product.products) || [];

    const suggestions = products.filter((product) => {
            const query = searchQuery.trim().toLowerCase();
            if (!query) return false;

            return (
                product.productName?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query) ||
                product.brand?.toLowerCase().includes(query)
            );
        }) .slice(0, 5);

    useEffect(() =>{
        
    if(isAuthenticated){
         fetchCart();
    }
    }, []);

    useEffect(() => {
        setSearchQuery(currentSearch);
    }, [currentSearch]);

    // Close profile dropdown & search suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;

        setShowSuggestions(false);
        setIsSearchOpen(false);

        navigate(`/product?search=${encodeURIComponent(query)}`);
    };

    const handleSuggestionClick = (productId) => {
        setSearchQuery('');
        setIsSearchOpen(false);
        setShowSuggestions(false);
        navigate(`/product/${productId}`);
    };

    const logoutUser = async () => {
            const response = await logout();
            if (response?.success) {
                toast.success(response.message || 'Logged out successfully');
                setIsProfileOpen(false);
            }
    };

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'PRODUCT', path: '/product' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                
                {/* Left: Mobile Menu Toggle & Logo */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className="rounded-lg p-1.5 cursor-pointer text-2xl text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <IoCloseOutline /> : <MdMenu />}
                    </button>

                    <Link
                        to="/"
                        className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent"
                    >
                        Cartify
                    </Link>
                </div>

                {/* Center: Desktop Navigation Links */}
                <nav className="hidden items-center gap-8 text-xs font-bold tracking-wider text-gray-600 md:flex">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative transition-colors duration-200 hover:text-indigo-600 ${
                                    isActive ? 'font-semibold text-indigo-600' : 'text-gray-600'
                                } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 ${
                                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Search Bar (Desktop) */}
                <div ref={searchRef} className="relative hidden max-w-md flex-1 md:block">
                    <form onSubmit={handleSearch} className="relative flex w-full items-center">
                        <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="Search products..."
                            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-9 text-sm outline-none transition duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setShowSuggestions(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 transition hover:text-gray-600"
                            >
                                <IoCloseOutline />
                            </button>
                        )}
                    </form>

                    {/* Suggestions Dropdown (Desktop) */}
                    {showSuggestions && searchQuery.trim() && (
                        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                            {suggestions.length > 0 ? (
                                <>
                                    {suggestions.map((product) => (
                                        <button
                                            key={product._id}
                                            type="button"
                                            onClick={() => handleSuggestionClick(product._id)}
                                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                                        >
                                            <img
                                                src={product.images?.[0]?.url || '/placeholder.png'}
                                                alt={product.productName}
                                                className="h-10 w-10 rounded-lg bg-gray-50 object-contain"
                                            />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {product.productName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {product.brand || product.category}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        className="w-full cursor-pointer border-t border-gray-100 px-4 py-3 text-left text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                    >
                                        View all results for "{searchQuery}"
                                    </button>
                                </>
                            ) : (
                                <p className="px-4 py-3 text-center text-sm text-gray-500">No products found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Actions (Mobile Search Toggle, Cart, Profile/Auth) */}
                <div className="flex items-center gap-3 text-gray-700">
                    {/* Mobile Search Toggle */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSearchOpen((prev) => !prev);
                            setShowSuggestions(false);
                        }}
                        className="rounded-full p-1.5 text-2xl cursor-pointer text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 md:hidden"
                        aria-label="Toggle search"
                    >
                        <IoSearchOutline />
                    </button>

                    {/* Cart Icon */}
                    <button
                        type="button"
                        onClick={() =>{
                            if(isAuthenticated){
                                navigate("/cart")
                            }else{
                                navigate("/login?redirect=/cart");
                            }
                          }
                        }
                        className="relative rounded-full p-2 cursor-pointer text-2xl text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600"
                        aria-label="View Cart"
                    >
                        <MdOutlineShoppingCart />
                        <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white shadow-sm">
                            {cart ? cart?.items?.length : 0}
                        </span>
                    </button>

                    {/* Profile Dropdown or Login Button */}
                    {isAuthenticated ? (
                        <div ref={profileRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsProfileOpen((prev) => !prev)}
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md transition hover:opacity-90"
                            >
                                {user?.username ? user?.username.charAt(0).toUpperCase() : 'U'}
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5">
                                    {/* User Details */}
                                    <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white">
                                            {user?.username ? user?.username.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {user?.username}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100" />

                                    {/* Menu Links */}
                                    <div className="p-1.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate('/orders');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <FiShoppingBag className="text-lg text-gray-500" />
                                            <span>My Orders</span>
                                        </button>

                                        {/* <button
                                            type="button"
                                            onClick={() => {
                                                navigate('/profile');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <FiUser className="text-lg text-gray-500" />
                                            <span>My Profile</span>
                                        </button> */}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate('/wishlist');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <FiHeart className="text-lg text-gray-500" />
                                            <span>My Wishlist</span>
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-100" />

                                    {/* Logout Action */}
                                    <div className="p-1.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                logoutUser();
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                        >
                                            <FiLogOut className="text-lg" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="cursor-pointer rounded-full bg-gray-900 px-5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-95"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Expandable Search Bar */}
            {isSearchOpen && (
                <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
                    <div className="relative">
                        <form onSubmit={handleSearch} className="relative">
                            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                placeholder="Search products..."
                                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setShowSuggestions(false);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-600"
                                >
                                    <IoCloseOutline />
                                </button>
                            )}
                        </form>

                        {/* Mobile Suggestions Dropdown */}
                        {showSuggestions && searchQuery.trim() && (
                            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                                {suggestions.length > 0 ? (
                                    <>
                                        {suggestions.map((product) => (
                                            <button
                                                key={product._id}
                                                type="button"
                                                onClick={() => handleSuggestionClick(product._id)}
                                                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                                            >
                                                <img
                                                    src={product.images?.[0]?.url || '/placeholder.png'}
                                                    alt={product.productName}
                                                    className="h-10 w-10 rounded-lg bg-gray-50 object-contain"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                        {product.productName}
                                                    </p>
                                                    <p className="text-xs font-semibold text-indigo-600">
                                                        {product.brand || product.category}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={handleSearch}
                                            className="w-full cursor-pointer border-t border-gray-100 px-4 py-3 text-left text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                        >
                                            View all results for "{searchQuery}"
                                        </button>
                                    </>
                                ) : (
                                    <p className="px-4 py-3 text-center text-sm text-gray-500">
                                        No products found
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white px-6 py-4 shadow-xl md:hidden">
                    <nav className="flex flex-col gap-3">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`border-b border-gray-50 pb-2 text-sm font-semibold transition hover:text-indigo-600 ${
                                        isActive ? 'text-indigo-600' : 'text-gray-700'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;