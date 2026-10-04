import { RxCross2 } from "react-icons/rx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function InventoryHistory({ product, history, onClose, onDelete }) {
  const getStatusBadge = (operation) => {
    switch (operation) {
      case "Added":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <FaArrowUp className="text-xs" />,
          sign: "+",
          color: "text-emerald-600",
        };
      case "Removed":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <FaArrowDown className="text-xs" />,
          sign: "-",
          color: "text-rose-600",
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-700 border-gray-200",
          icon: null,
          sign: "",
          color: "text-gray-600",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Inventory Logs</h2>
            <p className="text-xs text-gray-500">Track stock additions and deductions</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>

        {/* Product Details Header */}
        <div className="mx-6 mt-4 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
          <img
            className="h-14 w-14 rounded-lg border border-gray-200 object-cover bg-white"
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.productName || "Product"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {product?.productName || "Product Name"}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              Category: {product?.category || "N/A"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-gray-500 block">Current Stock</span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {product?.stock ?? 0} units
            </span>
          </div>
        </div>

        {/* History Table Container */}
        <div className="m-6 flex-1 overflow-y-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="sticky top-0 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5">Date & Time</th>
                <th className="px-4 py-3.5">Operation</th>
                <th className="px-4 py-3.5 text-center">Before</th>
                <th className="px-4 py-3.5 text-center">Qty</th>
                <th className="px-4 py-3.5 text-center">After</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {history?.length > 0 ? (
                history.map((item) => {
                  const status = getStatusBadge(item.operation);
                  const dateTime = new Date(item.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs font-medium text-gray-600 whitespace-nowrap">
                        {dateTime}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.bg}`}
                        >
                          {status.icon}
                          {item.operation}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center text-xs font-medium text-gray-500">
                        {item.previousStock}
                      </td>

                      <td
                        className={`px-4 py-3 text-center text-xs font-bold ${status.color}`}
                      >
                        {status.sign}
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 text-center text-xs font-semibold text-gray-900">
                        {item.newStock}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onDelete(item._id)}
                          title="Delete record"
                          className="rounded-md p-1.5 cursor-pointer text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition"
                        >
                          <RiDeleteBin5Line className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-xs font-medium text-gray-400"
                  >
                    No inventory history recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t border-gray-100 bg-gray-50/50 px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-lg border cursor-pointer border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default InventoryHistory;