import { useState } from "react";
import {
  FaPrint,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function OrderToolbar() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex justify-between items-center px-4 py-2  relative">
      {/* Kiri */}
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="font-semibold">Pilih semua</span>
        </label>

        <div className="flex items-center border border-blue-500 rounded-lg overflow-hidden">
          <button className="flex items-center px-3 py-3 text-blue-600">
            <FaPrint className="mr-2" />
            Print 0 Label Order
          </button>
          <button className="px-2 border-l border-blue-500 text-blue-600">
            <FaChevronDown />
          </button>
        </div>
      </div>

      {/* Kanan (Pagination) */}
      <div className="flex items-center space-x-1">
        <button className="px-2 py-1 rounded text-gray-400">&laquo;</button>
        <button className="px-2 py-1 rounded text-gray-400">
          <FaChevronLeft />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}>
            {page}
          </button>
        ))}
        <button className="px-2 py-1 rounded-lg text-gray-400">
          <FaChevronRight />
        </button>
        <button className="px-2 py-1 rounded-lg text-gray-400">&raquo;</button>
      </div>
    </div>
  );
}
