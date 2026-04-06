import React, { useContext } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import useCountUp from "../../hooks/useCountUp";

function InsightsCard({ title, value, message, type, icon: Icon }) {
  const styles = {
    warning: {
      border: "border-red-600",
      icon: <FaExclamationTriangle className="text-red-600" />,
    },
    success: {
      border: "border-green-500",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    info: {
      border: "border-blue-500",
      icon: <FaInfoCircle className="text-blue-500" />,
    },
  };

  const s = styles[type];
  const DefaultIcon = FaInfoCircle;
  const RenderIcon = Icon || DefaultIcon;

  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
      : value;

  const isNumber = !isNaN(numericValue);
  const animatedValue = isNumber
    ? useCountUp(numericValue, 1000)
    : numericValue;

  let displayValue = value;

  if (isNumber) {
    if (typeof value === "string" && value.includes("%")) {
      displayValue = `${animatedValue.toFixed(1)}%`;
    } else if (typeof value === "string" && value.includes("₹")) {
      displayValue = `₹ ${animatedValue.toLocaleString()}`;
    } else {
      displayValue = animatedValue.toLocaleString();
    }
  }

  return (
    <div
      className={`px-2 py-4 rounded-xl shadow-md border-l-4 ${s.border} bg-[var(--secondary)]/30`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-0.5">
          <div className="p-0.5 rounded-full ">
            <RenderIcon
              className={`text-lg ${
                type === "success"
                  ? "text-green-600"
                  : type === "warning"
                    ? "text-red-600"
                    : "text-blue-600"
              }`}
            />
          </div>{" "}
          <h4 className=" font-semibold text-gray-800">{title}</h4>
        </div>
        {value && (
          <span className="text-sm font-bold text-gray-600">
            {displayValue}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-600">{message}</p>
    </div>
  );
}

export default InsightsCard;
