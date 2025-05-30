import React from "react";

type PropPaginationNavigation = {
  currentPage: number;
  loading: boolean;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationNavigation({
  currentPage,
  loading,
  setCurrentPage,
  totalPages,
}: PropPaginationNavigation) {
  return (
    <div className="flex items-center gap-4 justify-end pr-5 pb-5 pt-2">
      <button
        disabled={currentPage <= 1 || loading}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors duration-200
      ${
        currentPage <= 1 || loading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800"
      }
    `}
      >
        Prev
      </button>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {currentPage}/ {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages || loading}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors duration-200
      ${
        currentPage >= totalPages || loading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800"
      }
    `}
      >
        Next
      </button>
    </div>
  );
}
