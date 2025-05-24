import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OrderCard from "../../components/order/card/OrderCard";
import { TbFilterDiscount } from "react-icons/tb";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import SearchOrder from "../../components/order/filter/SearchOrder";
import FilterOrder from "../../components/order/filter/FilterOrder";
import FilterStatusOrder from "../../components/order/filter/FilterStatusOrder";
import { DownloadIcon } from "../../icons";
import { FaPlus } from "react-icons/fa6";
import OptionDropdownOrder from "../../components/order/dropdown/OptionDropdownOrder";
import FilterOrderDropdown from "../../components/order/filter/FilterOrderDropdown";
import OrderToolbar from "../../components/order/orderToolbar";
import { getOrders, OrderItem } from "../../service/order/index";

type FilterState = {
  pembayaran: string;
  pengiriman: string;
  admin: string;
  bank: string;
  kurir: string;
  pickup: string;
  salesChannels: string;
  kategoriCustomer: string;
  gudang: string;
  produk: string;
  printLabel: string;
  tanggal: string;
};

export default function AllOrderPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const result = await getOrders();

      if (result.success && Array.isArray(result.responseObject)) {
        setOrders(result.responseObject);
        console.log("Data orders:", result.responseObject);
      } else {
        // console.log("Gagal mengambil data orders:", result.message);
        setOrders([]); // atau tampilkan pesan error di UI
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  const [filterOrder, setFilterOrder] = useState<FilterState>({
    pembayaran: "",
    pengiriman: "",
    admin: "",
    bank: "",
    kurir: "",
    pickup: "",
    salesChannels: "",
    kategoriCustomer: "",
    gudang: "",
    produk: "",
    printLabel: "semua",
    tanggal: "order",
  });

  const navigate = useNavigate();

  // Handle Search and Filter Query
  const handleSearchAndFilter = useCallback(
    (keyword: string, filter: FilterState) => {
      const params = new URLSearchParams();
      // for search
      params.set("keyword", keyword.toLowerCase());

      // for filter
      params.set("pembayaran", filter.pembayaran);
      params.set("pengiriman", filter.pengiriman);
      params.set("admin", filter.admin);
      params.set("bank", filter.bank);
      params.set("kurir", filter.kurir);
      params.set("pickup", filter.pickup);
      params.set("salesChannels", filter.salesChannels);
      params.set("kategoriCustomer", filter.kategoriCustomer);
      params.set("gudang", filter.gudang);
      params.set("produk", filter.produk);
      params.set("printLabel", filter.printLabel);
      params.set("tanggal", filter.tanggal);

      navigate(`?${params.toString()}`);
    },
    [navigate]
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
    // 🔍 Optional: panggil fungsi filter data berdasarkan nilai ini
    console.log("Filter dipilih:", event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Halaman Order" />
      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div className="py-2 bg-gray-50">
        <div
          className={`flex flex-wrap gap-2 ${
            window.innerWidth <= 768 ? "overflow-x-auto" : ""
          }`}>
          <FilterStatusOrder
            selectedStatuses={selectedStatuses}
            onChange={setSelectedStatuses}
          />
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
          <div className="relative">
            <FilterOrderDropdown />
          </div>
          <div className="flex-1">
            <SearchOrder
              onSearch={() => handleSearchAndFilter(keyword, filterOrder)}
              keyword={keyword}
              keywordChange={setKeyword}
            />
          </div>
          <div className="flex gap-2 ml-auto">
            <Link to={"/order/form_add_order"}>
              <div className="mx-auto w-full flex justify-start gap-3">
                <Button
                  size="md"
                  variant="primary"
                  className="flex-1"
                  startIcon={<FaPlus className="size-5 text-white" />}>
                  Tambah Order
                </Button>
              </div>
            </Link>
            <Button
              size="md"
              variant="outline"
              startIcon={<TbFilterDiscount className="size-5 text-blue-700" />}
              onClick={() => setFilter((prev) => !prev)}>
              Filter
            </Button>

            <Button
              size="md"
              variant="outline"
              startIcon={<DownloadIcon className="size-5 text-blue-700" />}>
              Download
            </Button>
            <OptionDropdownOrder />
          </div>
        </div>

        <div className="mx-auto w-full text-center mt-2">
          {filter ? (
            <FilterOrder
              filter={filterOrder}
              setFilter={setFilterOrder}
              onFilter={() => handleSearchAndFilter(keyword, filterOrder)}
            />
          ) : null}

          {/* Info */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-2xl font-medium">
              {orders.length} order ditemukan
            </p>
            <div className="flex justify-between items-center bg-white p-3.5 rounded-lg">
              <p className="text-md font-light">
                Sisa kuota order:{" "}
                <span className="text-green-600 font-semibold">826</span>
              </p>
              <span className="text-gray-400 mx-2">|</span>
              <Link to="/profile">
                <span className="text-blue-600 text-md font-semibold">
                  Lihat Detail
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <OrderCard orders={orders} />
        </div>
        <OrderToolbar />
      </div>
    </div>
  );
}
