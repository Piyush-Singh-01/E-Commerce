import React from 'react'
import { FiArrowRight, FiShield } from 'react-icons/fi'
import usePayment from "../../../hooks/usePayment";
import { useNavigate } from 'react-router-dom';

function CartSummary({ items}) {

  const navigate = useNavigate();

  const { handleCheckout } = usePayment();

  const subtotal = items?.reduce((total, item) => total + item?.product?.discountPrice * item?.quantity, 0)

  const shipping = subtotal >= 400 ? 0 : subtotal <= 0 ? 0 : 99;

  const total = subtotal + shipping

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-900">
        Order Summary
      </h2>


      {/* Price Details */}
      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-medium text-gray-900">
            ₹{subtotal?.toLocaleString('en-IN')}
          </span>
        </div>


        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Shipping
          </span>

          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'Free' : `₹${shipping}`}
          </span>
        </div>

      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-100" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          Total
        </span>

        <span className="text-xl font-bold text-gray-900">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>


      {/* Checkout Button */}
      <button
        type="button"
        onClick={() => handleCheckout(() => navigate("/orders"))}
        className="mt-6 flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
      >
        Proceed to Checkout
        <FiArrowRight size={17} />
      </button>

      {/* Secure Checkout */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <FiShield size={14} />
        Secure checkout
      </div>

    </div>
  )
}

export default CartSummary;