import React from "react";

const statusConfig = {
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    "out for delivery": "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    returned: "bg-gray-100 text-gray-700",
};

function OrderStatusBadge({ status }) {

    const key = status?.toLowerCase();

    return (
        <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                statusConfig[key] ||
                "bg-gray-100 text-gray-700"
            }`}
        >
            {status || "Unknown"}
        </span>
    );
}

export default OrderStatusBadge;