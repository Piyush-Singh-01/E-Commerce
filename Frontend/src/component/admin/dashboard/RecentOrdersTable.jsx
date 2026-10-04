import React from "react";

function RecentOrdersTable({ recentOrders = [] }) {
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-600";

      case "processing":
        return "bg-yellow-100 text-yellow-600";

      case "shipped":
        return "bg-indigo-100 text-indigo-600";

      case "delivered":
        return "bg-green-100 text-green-600";

      case "cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600";

      case "pending":
        return "bg-yellow-100 text-yellow-600";

      case "failed":
        return "bg-red-100 text-red-600";

      case "refunded":
        return "bg-purple-100 text-purple-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-white p-6 shadow [scrollbar-width:none]">

      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold text-gray-800">
          Recent Orders
        </h1>

        <span className="text-sm text-gray-500">
          Latest {recentOrders?.length}
        </span>
      </div>


      <table className="min-w-[900px] w-full table-auto">

        <thead>
          <tr className="border-b text-gray-500">

            <th className="p-4 text-left">Order ID </th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Products</th>

            <th className="p-4 text-left">Amount</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-center">Order Status</th>

            <th className="p-4 text-center">Payment</th>

          </tr>
        </thead>

        <tbody>

          {recentOrders.length > 0 ? (

            recentOrders.map((order) => (

              <tr key={order._id} className="border-b transition hover:bg-gray-50">
               
                {/* Order ID */}
                <td className="p-4">

                  <span className="font-medium text-blue-600">
                    #{order._id?.slice(-6).toUpperCase()}
                  </span>

                </td>

                {/* Customer */}
                <td className="p-4">

                  <div>
                    <p className="font-medium text-gray-800">
                      {order.user?.username || "Unknown"}
                    </p>

                    <p className="text-xs text-gray-400">
                      {order.user?.email || ""}
                    </p>
                  </div>

                </td>

                {/* Products */}
                <td className="p-4">

                  <div className="max-w-[220px]">

                    {order.items?.slice(0, 2).map((item) => (

                      <p
                        key={item._id}
                        className="truncate text-sm text-gray-700"
                      >
                        {item.product?.productName || "Product"}

                        <span className="ml-1 text-gray-400">
                          × {item.quantity}
                        </span>
                      </p>

                    ))}

                    {order.items?.length > 2 && (
                      <p className="mt-1 text-xs text-gray-400">
                        +{order.items.length - 2} more
                      </p>
                    )}

                  </div>

                </td>

                {/* Amount */}
                <td className="p-4 font-semibold text-gray-800">
                  ₹{order.totalAmount?.toLocaleString("en-IN")}
                </td>


                {/* Date */}
                <td className="p-4 whitespace-nowrap text-gray-500">

                  {new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </td>

                {/* Order Status */}
                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getOrderStatusStyle(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                {/* Payment Status */}
                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getPaymentStatusStyle(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={7}
                className="p-10 text-center text-gray-500"
              >
                No recent orders found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentOrdersTable;