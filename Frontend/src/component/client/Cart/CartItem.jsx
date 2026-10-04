import React, { useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import useCart from '../../../hooks/useCart';
import { toast } from 'react-toastify';

function CartItem({ item, Quantity }) {

  const {handleUpdateCartQuantity, handleRemoveFromCart} = useCart();
 

  const [quantity, setQuantity] = useState(Quantity);

  const increaseQuantity = ()=>{

        if(item.stock <= quantity){
           toast.error(`Only ${item.stock} stock is present`);
           return;
        }

        const newQuantity = quantity + 1;

        setQuantity(newQuantity);

        handleUpdateCartQuantity({productId: item._id, quantity: newQuantity});

  }

  const decreaseQuantity = ()=>{

        if(quantity <= 1) return;

        const newQuantity = quantity - 1;

        setQuantity(newQuantity);

        handleUpdateCartQuantity({productId: item._id, quantity: newQuantity});

  }

  const itemTotal = item?.discountPrice * Quantity;

  return (
    <div className="flex gap-4 p-5 sm:p-6">

      {/* Product Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
        <img
          src={item?.images?.[0]?.url}
          alt={item?.productName}
          className="h-full w-full object-cover"
        />
      </div>


      {/* Product Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">

        <div>

          <div className="flex items-start justify-between gap-3">

            <div>
              <h3 className="line-clamp-1 font-medium text-gray-900">
                {item?.productName}
              </h3>

              <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                {item?.description}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={()=> handleRemoveFromCart(item._id)}
              type="button"
              className="shrink-0 rounded-lg p-2 cursor-pointer text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              aria-label={`Remove ${item?.productName}`}
            >
              <FiTrash2 size={17} />
            </button>

          </div>

          <div className='flex gap-4'>
            <p className="mt-2 font-semibold text-gray-500 line-through">
            ₹{item?.price.toLocaleString('en-IN')}
          </p>

          <p className="mt-2 font-semibold text-gray-900">
            ₹{item?.discountPrice.toLocaleString('en-IN')}
          </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-4 flex items-center justify-between gap-4">

          {/* Quantity */}
          <div className="flex items-center rounded-lg border border-gray-200">

            <button
              onClick={decreaseQuantity}
              type="button"
              className="flex h-8 w-8 items-center justify-center cursor-pointer text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="Decrease quantity"
            >
              <FiMinus size={14} />
            </button>

            <span className="flex h-8 min-w-8 items-center justify-center border-x border-gray-200 px-2 text-sm font-medium text-gray-900">
              {quantity}
            </span>

            <button
              onClick={increaseQuantity}
              type="button"
              className="flex h-8 w-8 items-center justify-center cursor-pointer text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="Increase quantity"
            >
              <FiPlus size={14} />
            </button>

          </div>


          {/* Item Total */}
          <p className="font-semibold text-gray-900">
            ₹{itemTotal?.toLocaleString('en-IN')} 
          </p>

        </div>

      </div>

    </div>
  )
}

export default CartItem