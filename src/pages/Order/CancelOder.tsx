import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
// import CancelOrderCard from "../../components/order/card/CancelOrderCard";
// import FilterBarCancelOrder from "../../components/order/filter/FilterBarCancelOrder";
import { getOrders, OrderItem } from "../../service/order";
import OrderPageBreadcrumb from "./OrderPageBreadcrumb";
import OrderCard from "../../components/order/card/OrderCard";

const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

// Helper for compact pagination
function getPagination(current: number, total: number, maxLength = 7) {
  // Always show first, last, current, and neighbors, with ellipsis as needed
  if (total <= maxLength) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const result: (number | "...")[] = [];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  result.push(1);
  if (left > 2) result.push("...");
  for (let i = left; i <= right; i++) {
    result.push(i);
  }
  if (right < total - 1) result.push("...");
  result.push(total);
  return result;
}

export default function CancelOrderPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);

  useEffect(() => {
    async function fetchFilteredOrders() {
      const result = await getOrders();
      if (result.success && Array.isArray(result.responseObject)) {
        const filteredOrders = result.responseObject.filter(
          (order) => order.OrderDetail.paymentStatus === "CANCEL"
        );
        setOrders(filteredOrders);
      } else {
        setOrders([]);
      }
    }

    fetchFilteredOrders();
  }, []);

  // Reset to page 1 if ordersPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [ordersPerPage]);

  // Hitung index untuk slicing data
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Selalu tampilkan pagination, minimal 1 halaman
  const totalPages = Math.max(1, Math.ceil(orders.length / ordersPerPage));

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdersPerPage(Number(e.target.value));
  };

  // Pagination logic for compact display
  const paginationItems = getPagination(currentPage, totalPages, 7);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <OrderPageBreadcrumb pageTitle="Cancel Order" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* <FilterBarCancelOrder /> */}
        <div />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Tampilkan</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={ordersPerPage}
            onChange={handlePerPageChange}
          >
            {PER_PAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">data per halaman</span>
        </div>
      </div>
      <div>
        {/* <CancelOrderCard /> */}
        <OrderCard variant="cancel" orders={currentOrders} />
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
        <div className="text-sm text-gray-600">
          Menampilkan{" "}
          <span className="font-semibold">
            {orders.length === 0 ? 0 : indexOfFirstOrder + 1}
          </span>
          {" - "}
          <span className="font-semibold">
            {Math.min(indexOfLastOrder, orders.length)}
          </span>
          {" dari "}
          <span className="font-semibold">{orders.length}</span> data
        </div>
        <nav
          className="inline-flex rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-l-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>
          {paginationItems.map((item, idx) =>
            item === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-400 select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => handlePageChange(Number(item))}
                className={`px-3 py-1 border-t border-b border-gray-300 ${
                  currentPage === item
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
                aria-current={currentPage === item ? "page" : undefined}
              >
                {item}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded-r-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
