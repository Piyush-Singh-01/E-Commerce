import { Eye, Package } from "lucide-react";

function OrderTable({ orders = [], loading = false, updatingStatus = false, onStatusChange, onViewOrder}) {
 
    const orderStatuses = [
        "confirmed",
        "processing",
        "shipped",
        "out for delivery",
        "delivered",
        "cancelled",
        "returned",
    ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Products
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500" >
                  Loading orders...
                </td>
              </tr>
            ) : orders.length > 0 ? (
               orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition" >
                  {/* Order */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">
                      #{order._id?.slice(-8)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "-"}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">
                      {order.user?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.user?.email || "-"}
                    </p>
                  </td>

                  {/* Products */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gray-400" />
                      <span>{order.items?.length || 0} item(s)</span>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-semibold">
                    ₹ {order.totalAmount?.toLocaleString("en-IN") || 0}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus?.toLowerCase() === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus?.toLowerCase() === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus || "pending"}
                      onChange={(e) => onStatusChange?.(order._id, e.target.value)}
                      disabled={updatingStatus}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => onViewOrder?.(order)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer transition"
                        title="View Order"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;