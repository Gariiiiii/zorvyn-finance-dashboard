import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LuGitCompare } from "react-icons/lu";
import useCountUp from "../../hooks/useCountUp";

const MonthlyComparison = ({ transactions = [] }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} p-3 sm:p-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm mx-2`}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-4">
        <LuGitCompare className="text-xl text-gray-700" />
        <h3 className="font-semibold text-gray-700 uppercase text-lg">
          MONTHLY COMPARISON
        </h3>
      </div>
      <div className="w-full overflow-x-auto custom-scroll">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-400">
              <th className="py-2 px-3 sm:px-4">Month</th>
              <th className="py-2 px-3 sm:px-4">Income</th>
              <th className="py-2 px-3 sm:px-4">Expenses</th>
              <th className="py-2 px-3 sm:px-4">Net Balance</th>
              <th className="py-2 px-3 sm:px-4">Savings %</th>
              <th className="py-2 px-3 sm:px-4">Expenses %</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {transactions.map((item, index) => {
              const income = item?.income || 0;
              const expenses = item?.expenses || 0;
              const month = item?.month || "-";

              const netBalance = income - expenses;
              const savingsPercent = income
                ? ((netBalance / income) * 100).toFixed(1)
                : 0;
              const expensesPercent = income
                ? ((expenses / income) * 100).toFixed(1)
                : 0;

              const animatedNetBalance = useCountUp(netBalance, 1000);

              return (
                <tr
                  key={index}
                  className={`transition-colors ${
                    index % 2 === 0
                      ? darkMode
                        ? "bg-gray-100/30"
                        : "bg-gray-100/50"
                      : darkMode
                        ? "bg-gray-300/50"
                        : "bg-gray-300/30"
                  } hover:bg-gray-200/50`}
                >
                  <td className="py-2 px-3 sm:px-4 text-gray-500 font-semibold">
                    {month}
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-green-400 text-sm">
                    ₹{income.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-red-400 text-sm">
                    ₹{expenses.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-green-400 font-bold text-sm">
                    +₹{animatedNetBalance.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 sm:px-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                      {savingsPercent}%
                    </span>
                  </td>
                  <td className="py-2 px-3 sm:px-4">
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
                      {expensesPercent}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
};

export default MonthlyComparison;
