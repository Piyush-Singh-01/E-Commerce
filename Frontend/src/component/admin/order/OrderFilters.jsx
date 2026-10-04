import React from "react";
import { Search } from "lucide-react";

function OrderFilters({
  search = "",
  orderStatus = "all",
  paymentStatus = "all",
  onSearchChange,
  onOrderStatusChange,
  onPaymentStatusChange,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:w-[400px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">

          <select
            value={orderStatus}
            onChange={(e) => onOrderStatusChange?.(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All Order Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange?.(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default OrderFilters;