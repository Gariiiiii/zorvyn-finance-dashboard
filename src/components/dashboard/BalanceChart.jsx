import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";
import { FaChartLine } from "react-icons/fa";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
        <p className="text-teal-900">
          Balance: ₹ <strong>{data.balance.toLocaleString()}</strong>
        </p>

        <p className="text-green-600">
          Income: ₹ <strong>{data.income.toLocaleString()}</strong>
        </p>

        <p className="text-red-700">
          Expense: ₹ <strong>{data.expense.toLocaleString()}</strong>
        </p>
      </div>
    );
  }

  return null;
};

function BalanceChart({ data, viewType, setViewType }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} p-3 sm:p-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm flex flex-col gap-4 lg:gap-6`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-xl text-gray-700" />
          <h3 className="font-semibold text-gray-700 uppercase">
            Balance Trend
          </h3>
        </div>
        <div className="flex justify-end px-2">
          <div className="flex bg-[var(--card)] rounded-full p-1">
            <button
              onClick={() => setViewType("monthly")}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors ease-in-out duration-500 cursor-pointer ${
                viewType === "monthly"
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setViewType("yearly")}
              className={`px-3 py-1 rounded-full text-xs transition-colors ease-in-out duration-500 cursor-pointer ${
                viewType === "yearly"
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-600"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#255267" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#255267" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="label"
            stroke="#64748b"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#64748b" />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <Area
            type="monotone"
            dataKey="balance"
            stroke="#255267"
            strokeWidth={3}
            fill="url(#balanceGradient)"
            dot={{ r: 4, stroke: "#091a21", strokeWidth: 2, fill: "white" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;
