import { useCallback, useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { FaFilter } from "react-icons/fa";
import TableCustomer from "../../components/customer/TableCustomer";
import { Link } from "react-router";
import ModalCustomerKategory from "../../components/customer/modal/ModalFilterCustomer";
import {
  Customer,
  deleteCustomer,
  downloadExcelCustomer,
  getCustomers,
} from "../../service/customer";
import toast from "react-hot-toast";
import { FilterState } from "../../service/customer";

export default function AllCustomerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const search = useRef<HTMLInputElement>(null);
  const hasFetched = useRef(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Query Filter
  const [query, setQuery] = useState<FilterState>({
    category: null,
    status: null,
  });

  function handleSearch() {
    setIsSearching(true);
    const keyword = search.current?.value;
    setCurrentPage(1);
    fetchCustomers(keyword, query, 1).finally(() => setIsSearching(false));
  }

  const fetchCustomers = useCallback(
    async (search = "", query?: FilterState, page = currentPage) => {
      setIsLoading(true);
      const result = await getCustomers(search, query, page);
      if (result.success && result.responseObject) {
        setCustomers(result.responseObject.data);
        setTotalPages(result.responseObject.meta.totalPages);
        if (!hasFetched.current) {
          toast.success(result.message);
        }
      } else {
        if (!hasFetched.current) {
          toast.error(result.message);
        }
      }
      hasFetched.current = true;
      setIsLoading(false);
    },
    [currentPage]
  );

  const handleFilter = useCallback(() => {
    const keyword = search.current?.value || "";
    changeModal();
    setCurrentPage(1);
    fetchCustomers(keyword, query, 1);
  }, [query, fetchCustomers]);

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await deleteCustomer(id);
      if (response.success) {
        toast.success("Customer berhasil dihapus");
        fetchCustomers(search.current?.value, query, currentPage);
      } else {
        toast.error(response.message || "Gagal menghapus customer");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus customer");
      console.error("Error saat menghapus customer:", error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await downloadExcelCustomer();
      if (!response.success) {
        toast.error(response.message || "Gagal mengunduh data customer");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengunduh data");
      console.error("Error saat mengunduh data:", error);
    }
  };

  useEffect(() => {
    fetchCustomers(search.current?.value, query, currentPage);
    // eslint-disable-next-line
  }, [fetchCustomers, currentPage]);

  function changeModal() {
    setFilter((prevFilter) => !prevFilter);
  }

  // Custom Pagination UI as in the image
  function getPageNumbers() {
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
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    fetchCustomers(search.current?.value, query, page);
  };

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Halaman Customer" />

      <div className="min-h-screen rounded-2xl border flex border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mb-4 w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-4">
            <div className="relative grow">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    />
                  </svg>
                </button>

                <input
                  ref={search}
                  type="text"
                  placeholder={
                    isSearching
                      ? "Sedang mencari..."
                      : "Cari Nama ,Alamat,atau No Hp"
                  }
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 "
                />
              </form>

              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex gap-2 ">
              <Button
                size="sm"
                variant="outline"
                className="border-b-brand-500 "
                onClick={handleDownloadExcel}
              >
                Download Excel
              </Button>
              <Button size="sm" variant="outline" onClick={() => changeModal()}>
                Filter
                <FaFilter />
              </Button>
              <Link to={"/customer/form_customer"}>
                <Button size="sm">Tambah Customer</Button>
              </Link>
            </div>
          </div>
          {/* check if the filter value is true or false */}
          {filter ? (
            <ModalCustomerKategory
              changeModal={changeModal}
              setQuery={setQuery}
              handleFilter={handleFilter}
            />
          ) : null}
          <TableCustomer
            loading={isLoading}
            customers={customers}
            deleteCustomer={handleDeleteCustomer}
          />

          {/* Custom Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Halaman {currentPage} dari {totalPages}
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
