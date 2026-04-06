import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

export default function AddTransactionModal({
  show,
  onClose,
  newTransaction,
  setNewTransaction,
  onAdd,
  transactions,
  isEditing,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[380px] bg-white rounded-2xl shadow-2xl border-t-4 border-r-4 border-emerald-600 p-6 flex flex-col gap-5 relative"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold text-gray-700">
              {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  max={new Date().toISOString().split("T")[0]}   
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      date: e.target.value,
                    })
                  }
                  className="input-style"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                  className="input-style"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value,
                    })
                  }
                  className="input-style"
                >
                  <option value="">Select category</option>
                  {[...new Set(transactions.map((t) => t.category))].map(
                    (cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-gray-600">Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: e.target.value,
                      })
                    }
                    className="input-style"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-gray-600">Amount</label>
                  <div className="relative">
                    <BsCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: e.target.value,
                        })
                      }
                      className="input-style !pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none"
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={onAdd}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none"
              >
                {isEditing ? "Update" : "Add"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
