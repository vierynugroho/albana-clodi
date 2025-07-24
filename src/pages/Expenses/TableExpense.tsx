import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { ExpenseItem } from "../../service/expense";
import SpinnerLoading from "../../components/produk/loading/SpinnerLoading";

type Props = {
  expenses: ExpenseItem[];
  loading: boolean;
  setEditExpense: (id: string) => void;
  deleteExpense: (id: string) => void;
};

export default function TablExpense({
  expenses,
  loading,
  setEditExpense,
  deleteExpense,
}: Props) {
  function toDateOnly(dateString: string): string {
    return new Date(dateString).toISOString().split("T")[0];
  }

  // Dinamis page size
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((expenses?.length || 0) / pageSize);

  // Calculate the expenses to show on the current page
  const paginatedExpenses = expenses
    ? expenses.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  // Handler for page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handler for page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Helper for page number rendering (like the image)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400 w-1"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Tanggal
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Nama pengeluaran
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Harga/Biaya
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                jumlah
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Subtotal
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-end text-theme-sm dark:text-gray-400 "
              >
                <div className="flex justify-end items-center">
                  <IoSettings size={15} />
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  <SpinnerLoading />
                </TableCell>
              </TableRow>
            ) : expenses && expenses.length >= 1 ? (
              paginatedExpenses.map((expense, index) => (
                <TableRow key={expense.id || index}>
                  <TableCell className="py-4 px-3 sm:px-6 text-start text-gray-500">
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {toDateOnly(expense.createdAt)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {expense.itemName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp.{expense.itemPrice.toLocaleString("IND")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {expense.qty}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp.{(expense.itemPrice * expense.qty).toLocaleString("IND")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                    <div className="flex gap-5 justify-end">
                      <CiEdit
                        size={30}
                        className="text-amber-500 cursor-pointer"
                        onClick={() => setEditExpense(expense.id)}
                      />
                      <TiDelete
                        size={30}
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteExpense(expense.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  Data Pengeluaran Tidak Ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls ala gambar */}
      {!loading && expenses && expenses.length > 0 && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 bg-white dark:bg-white/[0.03] border-t border-gray-200 dark:border-white/[0.05] gap-2">
          {/* Left: Info */}
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 md:mb-0">
            Menampilkan {(currentPage - 1) * pageSize + 1}
            {" - "}
            {Math.min(currentPage * pageSize, expenses.length)} dari{" "}
            {expenses.length} data
          </div>
          {/* Center: Pagination */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="px-2 py-1 rounded border text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={idx} className="px-2 text-gray-400 select-none">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    currentPage === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300"
                  }`}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="px-2 py-1 rounded border text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          {/* Right: Jumlah baris per halaman */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Tampilkan
            </span>
            <select
              id="page-size-select-bottom"
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              baris
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
