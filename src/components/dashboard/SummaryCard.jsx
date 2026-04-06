import React, { useContext } from "react";
import {
  LuReceiptIndianRupee,
  LuTrendingUp,
  LuTrendingDown,
  LuPiggyBank,
} from "react-icons/lu";
import { ThemeContext } from "../../context/ThemeContext";
import useCountUp from "../../hooks/useCountUp";

function SummaryCard({ title, amount, type }) {
  const { darkMode } = useContext(ThemeContext);

  const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;

  const animatedValue = useCountUp(numericValue || 0, 1000);

  const displayValue =
    type === "saving"
      ? `${animatedValue.toFixed(1)}%`
      : animatedValue.toLocaleString();

  // Text color based on type
  const color =
    type === "income"
      ? "text-green-600"
      : type === "expense"
        ? "text-red-700"
        : type === "saving"
          ? "text-blue-600"
          : "text-teal-900";

  // Border colors based on type
  const borderTop =
    type === "income"
      ? "border-t-4 border-green-600"
      : type === "expense"
        ? "border-t-4 border-red-700"
        : type === "saving"
          ? "border-t-4 border-blue-600"
          : "border-t-4 border-teal-900";

  const borderRight =
    type === "income"
      ? "border-r-4 border-green-700"
      : type === "expense"
        ? "border-r-4 border-red-700"
        : type === "saving"
          ? "border-r-4 border-blue-700"
          : "border-r-4 border-teal-900";

  // Choose icon based on type
  const Icon =
    type === "income"
      ? LuTrendingUp
      : type === "expense"
        ? LuTrendingDown
        : type === "saving"
          ? LuPiggyBank
          : LuReceiptIndianRupee;

  return (
    <div
      className={` ${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} p-4 rounded-xl ${borderTop} ${borderRight} flex justify-between items-center shadow-sm`}
    >
      <div>
        <p className="text-gray-700 text-sm">{title}</p>

        <h2 className={`text-lg font-bold mt-1 ${color}`}>
          {type === "saving" ? "" : "₹ "} {displayValue}
        </h2>
      </div>

      <div
        className={`p-2 rounded-full ${
          type === "income"
            ? "bg-green-100"
            : type === "expense"
              ? "bg-red-100"
              : type === "saving"
                ? "bg-blue-100"
                : "bg-teal-100"
        }`}
      >
        <Icon className={`text-xl ${color}`} />
      </div>
    </div>
  );
}

export default SummaryCard;
