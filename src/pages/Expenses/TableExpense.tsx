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

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-end px-4 pt-4 my-3">
        <label
          htmlFor="page-size-select"
          className="mr-2 text-sm text-gray-600 dark:text-gray-300"
        >
          Tampilkan
        </label>
        <select
          id="page-size-select"
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-gray-800 dark:text-white !m-0"
          style={{ margin: 0 }} // Ensure no margin
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} baris
            </option>
          ))}
        </select>
      </div>
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
      {/* Pagination Controls */}
      {/* Always show pagination, even if only 1 page */}
      {!loading && expenses && expenses.length > 0 && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 bg-white dark:bg-white/[0.03] border-t border-gray-200 dark:border-white/[0.05] gap-2">
          <button
            className="px-3 py-1 rounded border text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 max-w-full overflow-x-auto">
            {/* Show first page and ellipsis if needed */}
            {totalPages > 7 && currentPage > 4 && (
              <>
                <button
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    currentPage === 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300"
                  }`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
                {currentPage > 5 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
              </>
            )}

            {/* Dynamic page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 7) return true;
                if (currentPage <= 4) return page <= 6;
                if (currentPage >= totalPages - 3)
                  return page >= totalPages - 5;
                return Math.abs(page - currentPage) <= 2;
              })
              .map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    currentPage === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

            {/* Show last page and ellipsis if needed */}
            {totalPages > 7 && currentPage < totalPages - 3 && (
              <>
                {currentPage < totalPages - 4 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                <button
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300"
                  }`}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            className="px-3 py-1 rounded border text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
