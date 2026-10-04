import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  confirmed: "#3b82f6",
  processing: "#f59e0b",
  shipped: "#7c3aed",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

const getColor = (status) => COLORS[status?.toLowerCase()] || "#94a3b8";

export default function OrdersChart({ ordersData = [] }) {
  
  const total = ordersData.reduce((acc, item) => acc + Number(item.value || 0), 0);

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Orders Overview</h2>
        <p className="text-sm text-gray-500">Orders by current status</p>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ordersData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
              stroke="none"
            >
              {ordersData.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={getColor(entry.name)}
                />
              ))}
            </Pie>

            {/* Center Total */}
            <text
              x="50%"
              y="46%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-900 text-2xl font-bold"
            >
              {total}
            </text>

            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-500 text-xs"
            >
              Total Orders
            </text>

            <Tooltip
              formatter={(value, name) => [
                value,
                name?.charAt(0).toUpperCase() + name?.slice(1),
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Status List */}
      <div className="mt-2 space-y-3">
        {ordersData.map((item, index) => {
          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;

          return (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-between"
            >
              {/* Status Indicator & Name */}
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getColor(item.name) }}
                />
                <span className="text-sm capitalize text-gray-600">
                  {item.name}
                </span>
              </div>

              {/* Count & Percentage */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">
                  {item.value}
                </span>
                <span className="w-12 text-right text-xs text-gray-400">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}