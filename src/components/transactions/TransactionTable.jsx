import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaEdit, FaTrash } from "react-icons/fa";

function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  userRole,
  startIndex,
}) {
  const { darkMode } = useContext(ThemeContext);

  const categoryStyles = {
    Salary: "bg-blue-500/20 text-blue-600",
    Rent: "bg-purple-500/20 text-purple-600",
    Freelance: "bg-indigo-500/20 text-indigo-600",
    Shopping: "bg-pink-500/20 text-pink-600",
    Travel: "bg-yellow-500/20 text-yellow-600",
    Stocks: "bg-green-500/20 text-green-600",
    Dining: "bg-orange-500/20 text-orange-600",
    Groceries: "bg-teal-500/20 text-teal-600",
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg custom-scroll">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 font-semibold">
            <th className="py-2 px-2 sm:px-3 text-left border-b border-gray-400">
              Date
            </th>
            <th className="py-2 px-2 sm:px-3 text-left border-b border-gray-400">
              Description
            </th>
            <th className="py-2 px-2 sm:px-3 text-left border-b border-gray-400">
              Category
            </th>
            <th className="py-2 px-2 sm:px-3 text-left border-b border-gray-400">
              Type
            </th>
            <th className="py-2 px-2 sm:px-3 text-left border-b border-gray-400">
              Amount
            </th>

            <th className="py-2 px-2 sm:px-3 text-center border-b border-gray-400">
              {userRole === "admin" ? "Actions" : ""}
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {transactions.map((t, i) => {
            const realIndex = startIndex + i;

            return (
              <tr
                key={realIndex}
                className={`transition-colors ${
                  i % 2 === 0
                    ? darkMode
                      ? "bg-gray-100/30"
                      : "bg-gray-100/50"
                    : darkMode
                      ? "bg-gray-300/50"
                      : "bg-gray-300/30"
                } hover:bg-gray-200/50`}
              >
                <td className="py-2 px-2 sm:px-3 text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td className="py-2 px-2 sm:px-3 text-gray-700 font-medium">
                  {t.description}
                </td>

                <td className="py-2 px-2 sm:px-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      categoryStyles[t.category] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.category}
                  </span>
                </td>

                <td className="py-2 px-2 sm:px-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td
                  className={`py-2 px-2 sm:px-3 text-left font-semibold ${
                    t.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} ₹ {t.amount}
                </td>

                <td className="py-2 px-2 sm:px-3 text-center">
                  {userRole === "admin" && (
                    <div className="flex justify-center gap-2 sm:gap-6">
                      <button
                        onClick={() => onEdit(realIndex)}
                        className="text-teal-800 hover:text-teal-950 transition-colors duration-500 ease-in-out cursor-pointer"
                      >
                        <FaEdit size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(realIndex)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out cursor-pointer"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
