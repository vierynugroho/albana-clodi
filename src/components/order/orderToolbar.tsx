import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type OrderToolbarProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function OrderToolbar({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: OrderToolbarProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2  relative">
      {/* Kiri */}
      <div className="flex items-center space-x-4">
        {/* <label className="inline-flex items-center space-x-2">
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
        </div> */}
      </div>

      {/* Kanan (Pagination) */}
      <div className="flex items-center space-x-1">
        <button onClick={() => onPageChange(1)} className="px-2 py-1 text-gray-400">&laquo;</button>
        <button onClick={handlePrev} className="px-2 py-1 text-gray-400">
          <FaChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}>
            {page}
          </button>
        ))}

        <button onClick={handleNext} className="px-2 py-1 text-gray-400">
          <FaChevronRight />
        </button>
        <button onClick={() => onPageChange(totalPages)} className="px-2 py-1 text-gray-400">&raquo;</button>
      </div>
    </div>
  );
}
