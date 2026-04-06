import React from "react";

function Pagination({ total, perPage, page, setPage }) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="flex justify-between items-center mt-3 text-xs sm:text-sm">
      <div className="text-gray-500">
        Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2 sm:px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-500 ease-in-out cursor-pointer"
        >
          Prev
        </button>

        <span className="px-2">{page} / {totalPages}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-2 sm:px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-500 ease-in-out cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;