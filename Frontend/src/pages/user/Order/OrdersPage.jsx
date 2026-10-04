import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOrder from "../../../hooks/useOrder";

const OrdersPage = () => {
  const {orders, attempts, ordersLoading, fetchOrders} = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Status badge helper
  const getStatusBadge = (status) => {
    const styles = {
      paid: "bg-green-100 text-green-800 border-green-300",
      confirmed: "bg-blue-100 text-blue-800 border-blue-300",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
      pending: "bg-orange-100 text-orange-800 border-orange-300",
      failed: "bg-red-100 text-red-800 border-red-300",
      delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
      shipped: "bg-purple-100 text-purple-800 border-purple-300",
      "out for delivery": "bg-indigo-100 text-indigo-800 border-indigo-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      returned: "bg-gray-100 text-gray-800 border-gray-300",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
          styles[status] || "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </span>
    );
  };

  // Loading state
  if (ordersLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Empty state
  if (orders.length === 0 && attempts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center my-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Orders Found
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't placed any orders yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Orders Section */}
      {orders.length > 0 && (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Your Orders
          </h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="text-sm font-semibold text-gray-800 break-all">
                        {order._id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Date Placed</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-sm font-bold text-gray-900">
                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div>
                        <span className="text-xs text-gray-500 mr-1">
                          Payment:
                        </span>
                        {getStatusBadge(order.paymentStatus)}
                      </div>

                      <div>
                        <span className="text-xs text-gray-500 mr-1">
                          Order:
                        </span>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 divide-y divide-gray-100">
                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {item.product?.images?.[0]?.url ? (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.productName}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                            No Image
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {item.product?.productName || "Product Unavailable"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ₹
                            {Number(item.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-800">
                          ₹{(item.quantity * item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {order.razorpayPaymentId && (
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-xs text-gray-500 flex flex-wrap justify-between gap-2">
                    <span>Payment ID: {order.razorpayPaymentId}</span>
                    <span>
                      Source:{" "}
                      {order.source === "buy_now"
                        ? "Direct Buy"
                        : "Cart Checkout"}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Payment Attempts Section */}
      {attempts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Payment Attempts
          </h2>

          <div className="space-y-6">
            {attempts.map((attempt) => (
              <div
                key={attempt._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Payment Attempt</p>
                      <p className="text-sm font-semibold text-gray-800 break-all">
                        {attempt.razorpayOrderId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(attempt.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-bold text-gray-900">
                        ₹
                        {Number(attempt.totalAmount || 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>{getStatusBadge(attempt.status)}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 divide-y divide-gray-100">
                  {attempt.items?.map((item) => (
                    <div
                      key={item._id}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {item.product?.images?.[0]?.url ? (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.productName}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                            No Image
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {item.product?.productName || "Product Unavailable"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ₹
                            {Number(item.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-800">
                          ₹{(item.quantity * item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex flex-wrap justify-between gap-3 text-xs text-gray-500">
                    <span>
                      Source:{" "}
                      {attempt.source === "buy_now"
                        ? "Direct Buy"
                        : "Cart Checkout"}
                    </span>

                    {attempt.status === "failed" && attempt.failureReason && (
                      <span className="text-red-600">
                        Reason: {attempt.failureReason}
                      </span>
                    )}

                    {attempt.status === "pending" && (
                      <span className="text-orange-600">
                        Payment not completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;