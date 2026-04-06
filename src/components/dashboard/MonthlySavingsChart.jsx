import React, { useContext, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";
import { LuReceiptIndianRupee } from "react-icons/lu";

function MonthlyIncomeChart({ transactions }) {
  const { darkMode } = useContext(ThemeContext);
  const [viewType, setViewType] = useState("6M");

  // Prepare monthly income data
  const monthlyData = {};
  transactions.forEach((t) => {
    if (t.type !== "income") return;
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0 };
    monthlyData[monthKey].income += t.amount;
  });

  // Convert to array and sort
  const sortedData = Object.entries(monthlyData)
    .sort(([a], [b]) => {
      const [yearA, monthA] = a.split("-").map(Number);
      const [yearB, monthB] = b.split("-").map(Number);
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    })
    .map(([month, m]) => {
      const [year, monthIndex] = month.split("-").map(Number);
      const monthName = new Date(year, monthIndex - 1).toLocaleString(
        "default",
        {
          month: "short",
        },
      );
      return {
        monthFull: `${monthName} ${year}`,
        monthShort: monthName,
        income: m.income,
      };
    });

  // Slice chart data based on viewType
  const monthsToShow = viewType === "6M" ? 6 : 12;
  const chartData = sortedData.slice(-monthsToShow);

  return (
    <div
      className={`${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} py-3 sm:py-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-4 px-3 ms:px-4">
        <div className="flex items-center gap-2">
          <LuReceiptIndianRupee className="text-xl text-gray-700" />
          <h3 className="font-semibold text-gray-700 uppercase">
            Monthly Income
          </h3>
        </div>
        <div className="flex justify-end px-2">
          <div className="flex bg-[var(--card)] rounded-full p-1">
            <button
              onClick={() => setViewType("6M")}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors ease-in-out duration-500 cursor-pointer ${
                viewType === "6M"
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-600"
              }`}
            >
              6M
            </button>
            <button
              onClick={() => setViewType("12M")}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors ease-in-out duration-500 cursor-pointer ${
                viewType === "12M"
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-600"
              }`}
            >
              12M
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis
            dataKey={viewType === "12M" ? "monthShort" : "monthFull"}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
          <Bar dataKey="income" fill="#f59e0b" name="Income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyIncomeChart;
