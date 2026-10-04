import React, { useEffect } from 'react'
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import CartItem from '../../../component/client/Cart/CartItem'
import CartSummary from '../../../component/client/Cart/CartSummary'
import useCart from '../../../hooks/useCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Cart() {

  const navigate = useNavigate();

  const cart = useSelector((state)=> state.cart.cart);

  const cartItems = cart?.items || [];

  const {fetchCart, handleClearCart} = useCart();
 
  useEffect(() => {
        fetchCart();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">

          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">
              <FiShoppingBag size={20} />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Shopping Cart
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            {cartItems?.length} items in your cart
          </p>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-gray-200 bg-white">

              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <h2 className="font-semibold text-gray-900">
                  Cart Items
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems && cartItems?.map((item) => (
                  <CartItem
                    key={item.product?._id}
                    item={item?.product}
                    Quantity={item?.quantity}
                  />
                ))}
              </div>

            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate('/product')}
              type="button"
              className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </button>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary 
                 items={cartItems} 
                 quantity={cartItems} />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart