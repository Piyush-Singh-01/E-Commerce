import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

function SalesChart({ salesData = [] }) {

  const totalSales = salesData.reduce((total, item) => total + Number(item.sales || 0), 0);

  // Format large numbers for Y-axis
  const formatYAxis = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }

    return `₹${value}`;
  };

  // Format tooltip value
  const formatTooltip = (value) => {
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h2>

          <p className="text-sm text-gray-500">
            Sales performance this year
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Total Sales
          </p>

          <p className="text-lg font-bold text-gray-900">
            ₹{totalSales.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* Chart */}
      <div className="h-[270px] w-full">

        {salesData.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
              data={salesData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              {/* X Axis */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={formatYAxis}
                width={65}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{
                  stroke: "#94a3b8",
                  strokeDasharray: "4 4",
                }}
                formatter={(value) => [
                  formatTooltip(value),
                  "Sales",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />

              {/* Sales Area */}
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#salesGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        ) : (

          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No sales data available
          </div>

        )}

      </div>

    </div>
  );
}

export default SalesChart;