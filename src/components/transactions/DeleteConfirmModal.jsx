import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash } from "react-icons/fa";

export default function DeleteConfirmModal({
  show,
  onClose,
  onConfirm,
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
            className="w-[350px] bg-white rounded-2xl shadow-2xl border-t-4 border-r-4 border-red-600 p-6 flex flex-col gap-5 relative"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors duration-500 ease-in-out cursor-pointer"
            >
              <FaTimes />
            </button>

            <h2 className="text-lg font-semibold text-gray-700">
              Delete Transaction
            </h2>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this transaction?
            </p>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <FaTrash size={14} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}