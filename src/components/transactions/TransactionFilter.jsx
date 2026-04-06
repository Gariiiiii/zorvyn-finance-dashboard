import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BsPlus } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

function TransactionFilters({ filter, setFilter, transactions, showAdd, onAdd }) {
  const { darkMode } = useContext(ThemeContext);

  const categories = [...new Set(transactions.map((t) => t.category))];

  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(transactions, null, 2));

    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "transactions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"
      } px-2 py-2 rounded-xl text-gray-700 border-t-4 border-r-4 border-teal-900 shadow-sm`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

        <input
          type="text"
          placeholder="Search category..."
          value={filter.search}
          onChange={(e) =>
            setFilter({ ...filter, search: e.target.value })
          }
          className="col-span-1 sm:col-span-1 px-3 py-2 rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none text-sm bg-transparent"
        />

        {showAdd && (
          <button
            onClick={onAdd}
            className="sm:hidden px-3 py-2 text-sm rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary)]/70 text-white flex items-center justify-center gap-2"
          >
            <BsPlus size={20} /> Add Transaction
          </button>
        )}

        <select
          value={filter.type}
          onChange={(e) =>
            setFilter({ ...filter, type: e.target.value })
          }
          className="px-2 py-1 rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none text-sm bg-transparent"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value })
          }
          className="px-2 py-1 rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none text-sm bg-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={exportCSV}
          className="px-3 py-2 text-sm rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer bg-transparent flex items-center justify-center gap-2"
        >
          <FaDownload size={16} />
          CSV
        </button>

        <button
          onClick={exportJSON}
          className="px-3 py-2 text-sm rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer bg-transparent flex items-center justify-center gap-2"
        >
          <FaDownload size={16} />
          JSON
        </button>

        {showAdd && (
          <button
            onClick={onAdd}
            className="hidden sm:flex px-3 py-2 text-sm rounded-lg border border-gray-400 hover:border-gray-500 transition-colors duration-500 ease-in-out cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary)]/70 text-white items-center justify-center gap-2"
          >
            <BsPlus size={18} />
            Add Transaction
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionFilters;