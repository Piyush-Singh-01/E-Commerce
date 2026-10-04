import React, { useMemo } from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

function OrderStats({ orders = [] }) {
  // Compute counts efficiently using a single memoized loop
  const statsCounts = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];

    return safeOrders.reduce((acc, order) => {
        acc.total += 1;
        const status = order?.orderStatus?.toLowerCase();

        if (status === "processing") acc.processing += 1;
        else if (status === "shipped") acc.shipped += 1;
        else if (status === "delivered") acc.delivered += 1;

        return acc;
      },
      { total: 0, processing: 0, shipped: 0, delivered: 0 }
    );
  }, [orders]);

  const stats = [
    {
      title: "Total Orders",
      value: statsCounts.total,
      icon: Package,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Processing",
      value: statsCounts.processing,
      icon: Clock,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Shipped",
      value: statsCounts.shipped,
      icon: Truck,
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      title: "Delivered",
      value: statsCounts.delivered,
      icon: CheckCircle,
      iconClass: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ title, value, icon: Icon, iconClass }) => (
        <div
          key={title}
          className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {value}
              </h2>
            </div>

            <div className={`p-3 rounded-lg ${iconClass}`}>
              <Icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStats;