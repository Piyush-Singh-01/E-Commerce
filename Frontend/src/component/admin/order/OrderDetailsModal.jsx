import React from "react";
import { X } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderDetailsModal({ order = {}, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-bold">
              Order #{order._id?.slice(-8) || "N/A"}
            </h2>
            <p className="text-sm text-gray-500">
              {order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN")  : "-"}
            </p>
          </div>

          <button
            onClick={() => onClose?.()}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Customer Information */}
        <div className="p-5 border-b">
          <h3 className="font-semibold mb-3">Customer Information</h3>
          <p className="text-sm">{order.user?.username || "Unknown"}</p>
          <p className="text-sm text-gray-500">{order.user?.email || "-"}</p>
        </div>

        {/* Order Items */}
        <div className="p-5 border-b">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="flex flex-col gap-3">
            {order.items?.length > 0 ? (
              order.items.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {item.product?.images?.[0]?.url && (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.productName || "Product"}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {item.product?.productName || "Unknown Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity || 0}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price?.toLocaleString("en-IN") || 0}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No items in this order.</p>
            )}
          </div>
        </div>

        {/* Order Information */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="font-semibold mt-1">
              {order.paymentStatus || "Pending"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Order Status</p>
            <div className="mt-1">
              <OrderStatusBadge status={order.orderStatus} />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-bold text-lg mt-1">
              ₹{order.totalAmount?.toLocaleString("en-IN") || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;