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

  hasNext?: boolean;
  hasPrev?: boolean;
  totalPagesOverride?: number;
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
  hasNext,
  hasPrev,
  totalPagesOverride,
}: OrderToolbarProps) {
  const computedTotalPages = Math.ceil(totalItems / itemsPerPage);

  const totalPages =
    typeof totalPagesOverride === "number" && totalPagesOverride > 0
      ? totalPagesOverride
      : computedTotalPages;

  const prevDisabled = typeof hasPrev === "boolean" ? !hasPrev : currentPage === 1;
  const nextDisabled =
    typeof hasNext === "boolean" ? !hasNext : currentPage === totalPages;

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
            title="Halaman pertama"
          >
            &laquo;
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={prevDisabled}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Previous Page"
            title="Sebelumnya"
          >
            <FaChevronLeft />
          </button>

          <span className="px-3 py-1 text-sm font-semibold text-gray-700">
            Page {currentPage}
            {Number.isFinite(totalPages) && totalPages > 0 ? ` / ${totalPages}` : ""}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={nextDisabled}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Next Page"
            title="Berikutnya"
          >
            <FaChevronRight />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 py-1 text-gray-400 hover:text-blue-600 rounded transition"
            aria-label="Last Page"
            disabled={currentPage === totalPages || nextDisabled}
            title="Halaman terakhir"
          >
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  );
}