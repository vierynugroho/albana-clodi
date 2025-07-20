import {
  FaPrint,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type OrderToolbarProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  selectedCount: number;
  selectedOrderIds: string[];
  onMassPrint: () => void;
};

export default function OrderToolbar({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onSelectAll,
  isAllSelected,
  selectedCount,
  // selectedOrderIds,
  onMassPrint,
}: OrderToolbarProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between items-center px-4 py-4 relative border-t border-gray-200 mt-2">
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
          <span className="font-semibold">Pilih semua</span>
        </label>

        <div className="flex items-center border border-blue-500 rounded-lg overflow-hidden">
          <button
            className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 text-sm font-semibold"
            disabled={selectedCount === 0}
            onClick={onMassPrint}
          >
            <FaPrint className="mr-2" />
            Print {selectedCount} Label Order
          </button>
          <button className="px-2 border-l border-blue-500 text-blue-600">
            <FaChevronDown />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end w-full">
        <nav
          className="flex flex-wrap items-center justify-center gap-1 bg-white rounded-lg shadow-sm px-3 py-2 border border-gray-200"
          aria-label="Pagination"
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <button
            onClick={() => onPageChange(1)}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="First Page"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Previous Page"
          >
            <FaChevronLeft />
          </button>

          {/* Show only a window of pages for better UX */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 7) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 2) return true;
              if (currentPage <= 4 && page <= 6) return true;
              if (currentPage >= totalPages - 3 && page >= totalPages - 5)
                return true;
              return false;
            })
            .map((page, idx, arr) => {
              // Add ellipsis
              if (idx > 0 && page - arr[idx - 1] > 1) {
                return (
                  <span key={`ellipsis-${page}`} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
                  style={{ minWidth: 36 }}
                >
                  {page}
                </button>
              );
            })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Next Page"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Last Page"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  );
}
