import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { RxActivityLog } from "react-icons/rx";

function RecentActivities({ transactions, top = 6 }) {
  const { darkMode } = useContext(ThemeContext);

  const recentActivities = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, top);

  return (
    <div
      className={`${
        darkMode
          ? "bg-[var(--card)]/90"
          : "bg-[var(--primary-light)]"
      } p-3 sm:p-5 rounded-xl text-gray-800 border-t-3 border-r-3 border-teal-900 shadow-sm`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <RxActivityLog  className="text-xl text-gray-700" />
          <h3 className="font-semibold text-gray-700 uppercase">
            Recent Activities
          </h3>
        </div>
        <span className="bg-[var(--primary)] text-white px-3 py-1 rounded-xl text-xs transition-colors ease-in-out duration-500 cursor-pointer">Top {top}</span>
      </div>

      {/* List */}
      <ul className="flex flex-col gap-2 mt-2">
        {recentActivities.map((t, i) => (
          <li
            key={i}
            className="flex justify-between items-center text-sm border-b border-gray-400"
          >
            <span className="opacity-80 pl-2 sm:pl-4 font-medium">
              {t.category}
            </span>


            <div className="flex flex-col gap-0.5 pr-3 sm:pr-4"><span
              className={`font-semibold ${
                t.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {t.type === "income" ? "+" : "-"} ₹{" "}
              {t.amount.toLocaleString()} {" "}  

            </span>
            <span className="text-gray-500">{new Date(t.date).toLocaleDateString()}</span> </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;