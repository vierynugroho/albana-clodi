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
import toast, { Toaster } from "react-hot-toast";
import { FilterState } from "../../service/customer";
import PaginationNavigation from "../../components/produk/pagination/PaginationNavigation";

export default function AllCustomerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const search = useRef<HTMLInputElement>(null);
  const hasFetched = useRef(false);

  //   Pagination State For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //   Query Filter
  const [query, setQuery] = useState<FilterState>({
    category: null,
    status: null,
  });

  console.log(query);

  function handleSearch() {
    setIsSearching(true);
    const keyword = search.current?.value;
    fetchCustomers(keyword, query).finally(() => setIsSearching(false));
  }

  const fetchCustomers = useCallback(
    async (search = "", query?: FilterState) => {
      setIsLoading(true);
      const result = await getCustomers(search, query, currentPage);
      if (result.success && result.responseObject) {
        setCustomers(result.responseObject.data);
        setTotalPages(result.responseObject.meta.totalPages);
        if (!hasFetched.current) {
          toast.success(result.message, {
            style: { marginTop: "10vh", zIndex: 100000 },
          });
        }
      } else {
        if (!hasFetched.current) {
          toast.error(result.message, {
            style: { marginTop: "10vh", zIndex: 100000 },
          });
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
    fetchCustomers(keyword, query);
  }, [query, fetchCustomers]);

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await deleteCustomer(id);
      if (response.success) {
        toast.success("Customer berhasil dihapus", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
        fetchCustomers();
      } else {
        toast.error(response.message || "Gagal menghapus customer", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus customer", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      console.error("Error saat menghapus customer:", error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await downloadExcelCustomer();
      if (!response.success) {
        toast.error(response.message || "Gagal mengunduh data customer", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengunduh data", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      console.error("Error saat mengunduh data:", error);
    }
  };

  console.log(currentPage);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, currentPage]);

  function changeModal() {
    setFilter((prevFilter) => !prevFilter);
  }

  return (
    <div>
      <Toaster />
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Halaman Customer" />

      <div className="min-h-screen rounded-2xl border flex border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mb-4 w-full">
          <div className="flex justify-between max-md:flex-col max-md:gap-4">
            <div className="relative">
              <span className="absolute -translate-y-1/2 left-4 top-1/2 ">
                <svg
                  onClick={() => handleSearch()}
                  className="fill-gray-500 dark:fill-gray-400 cursor-pointer"
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
                    fill=""
                  />
                </svg>
              </span>
              <input
                ref={search}
                type="text"
                placeholder={
                  isSearching
                    ? "Sedang mencari..."
                    : "Cari Nama ,Alamat,atau No Hp"
                }
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex gap-2 ">
              <Button
                size="md"
                variant="outline"
                className="border-b-brand-500 "
                onClick={handleDownloadExcel}
              >
                Download Excel
              </Button>
              <Button size="md" variant="outline" onClick={() => changeModal()}>
                Filter
                <FaFilter />
              </Button>
              <Link to={"/customer/form_customer"}>
                <Button size="md">Tambah Customer</Button>
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
            customers={customers}
            deleteCustomer={handleDeleteCustomer}
          />
          <PaginationNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
