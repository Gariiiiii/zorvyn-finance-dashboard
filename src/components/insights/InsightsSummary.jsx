import React, { useContext } from "react";
import {
  LuReceiptIndianRupee,
  LuTrendingUp,
  LuTrendingDown,
  LuPiggyBank,
} from "react-icons/lu";
import { ThemeContext } from "../../context/ThemeContext";
import useCountUp from "../../hooks/useCountUp";

function InsightsSummary({
  title,
  amount,
  subtext,
  type = "default",
  disableAnimation = false,
}) {
  const { darkMode } = useContext(ThemeContext);

  const styles = {
    income: {
      color: "text-green-600",
      border: "border-t-4 border-green-600 border-r-4",
      bg: "bg-green-100",
      Icon: LuTrendingUp,
    },
    expense: {
      color: "text-red-600",
      border: "border-t-4 border-red-600 border-r-4",
      bg: "bg-red-100",
      Icon: LuTrendingDown,
    },
    saving: {
      color: "text-green-700",
      border: "border-t-4 border-green-700 border-r-4 ",
      bg: "bg-green-100",
      Icon: LuPiggyBank,
    },
    default: {
      color: "text-red-700",
      border: "border-t-4 border-r-4 border-red-700",
      bg: "bg-red-100",
      Icon: LuReceiptIndianRupee,
    },
  };

  const s = styles[type];
  const Icon = s.Icon;

  const numericValue =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^\d.-]/g, ""))
      : amount;

  const animatedValue = disableAnimation
    ? numericValue
    : useCountUp(numericValue || 0, 1000);
  let displayValue = "";

  if (disableAnimation) {
    displayValue = amount; 
  } else if (title.toLowerCase().includes("rate") || type === "saving") {
    displayValue = `${animatedValue.toFixed(1)}%`;
  } else {
    displayValue = `₹ ${animatedValue.toLocaleString()}`;
  }

  return (
    <div
      className={`p-4 rounded-xl shadow-sm flex justify-between items-center 
      ${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} 
      ${s.border}`}
    >
      <div>
        <p className="text-gray-700 text-sm">{title}</p>
        <h2 className={`text-lg font-bold mt-1 ${s.color}`}>{displayValue}</h2>
        {subtext && <p className="text-xs text-gray-700">{subtext}</p>}
      </div>
      <div
        className={`p-2 rounded-full ${
          type === "income"
            ? "bg-green-100"
            : type === "expense"
              ? "bg-red-100"
              : type === "saving"
                ? "bg-green-100"
                : "bg-red-100"
        }`}
      >
        <Icon
          size={20}
          className={`text-xl ${
            type === "income"
              ? "text-green-600"
              : type === "expense"
                ? "text-red-600"
                : type === "saving"
                  ? "text-green-600"
                  : "text-red-700"
          }`}
        />
      </div>{" "}
    </div>
  );
}

export default InsightsSummary;
