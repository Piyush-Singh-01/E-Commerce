import React, { useEffect, useMemo, useState } from "react";
import OrderStats from "../../../component/admin/order/OrderStats";
import OrderFilters from "../../../component/admin/order/OrderFilters";
import OrderTable from "../../../component/admin/order/OrderTable";
import OrderDetailsModal from "../../../component/admin/order/OrderDetailsModal";
import useOrder from "../../../hooks/useOrder";

function OrderPage() {
  const { allOrders, allOrdersLoading, updateStatusLoading, fetchAllOrders, updateOrderStatus } = useOrder();

  const [search, setSearch] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Filter Orders
  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return (allOrders || []).filter((order) => {
      const matchSearch = !searchValue ||
                          order?._id?.toLowerCase().includes(searchValue) ||
                          order?.user?.username?.toLowerCase().includes(searchValue) ||
                          order?.user?.email?.toLowerCase().includes(searchValue);

      const matchOrderStatus =  orderStatus === "all" || order?.orderStatus?.toLowerCase() === orderStatus.toLowerCase();

      const matchPaymentStatus =  paymentStatus === "all" || order?.paymentStatus?.toLowerCase() === paymentStatus.toLowerCase();

      return matchSearch && matchOrderStatus && matchPaymentStatus;
    });
  }, [allOrders, search, orderStatus, paymentStatus]);

  // --------------------------------
  // Pagination Calculations
  // --------------------------------
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = useMemo(() => {
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, startIndex, ordersPerPage]);


  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleOrderStatusChange = (value) => {
    setOrderStatus(value);
    setCurrentPage(1);
  };

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">
          Manage and track all customer orders
        </p>
      </div>

      {/* Statistics */}
      <OrderStats orders={allOrders} />

      {/* Filters */}
      <OrderFilters
        search={search}
        orderStatus={orderStatus}
        paymentStatus={paymentStatus}
        onSearchChange={handleSearchChange}
        onOrderStatusChange={handleOrderStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
      />

      {/* Orders Table */}
      <OrderTable
        orders={currentOrders}
        loading={allOrdersLoading}
        updatingStatus={updateStatusLoading}
        onStatusChange={updateOrderStatus}
        onViewOrder={setSelectedOrder}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}-
            {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="px-3 py-2 border rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="px-3 py-2 border rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

export default OrderPage;