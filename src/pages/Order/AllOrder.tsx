/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OrderCard from "../../components/order/card/OrderCard";
import { TbFilterDiscount } from "react-icons/tb";
import Button from "../../components/ui/button/Button";
import { useNavigate, useLocation } from "react-router";
import SearchOrder from "../../components/order/filter/SearchOrder";
import FilterOrder from "../../components/order/filter/FilterOrder";
import FilterStatusOrder from "../../components/order/filter/FilterStatusOrder";
import { DownloadIcon } from "../../icons";
import { FaPlus } from "react-icons/fa6";
import OptionDropdownOrder from "../../components/order/dropdown/OptionDropdownOrder";
import OrderToolbar from "../../components/order/orderToolbar";
// import { getOrders, OrderItem } from "../../components/order/orderToolbar";
import { exportOrdersToExcel } from "../../service/order/order.service";
import toast from "react-hot-toast";
import FilterOrderDropdown from "../../components/order/filter/FilterOrderDropdown";
import { getOrders } from "../../service/order";
import { OrderItem } from '../../service/order/index';

export type FilterState = {
  deliveryTargetCustomerId?: string;
  salesChannelId?: string;
  deliveryPlaceId?: string;
  orderDate?: string;
  orderStatus?: string;
  orderMonth?: string;
  orderYear?: string;
  startDate?: string;
  endDate?: string;
  customerCategory?: string;
  paymentStatus?: string;
  productId?: string;
  paymentMethodId?: string;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  customerName?: string;
  ordererCustomerId?: string;
  productName?: string;
  sku?: string;
  receiptNumber?: string;
  phoneNumber?: string;
  orderId?: string;
  shipperTrackingId?: string;
  code?: string;
};

const searchFields = [
  "orderId",
  "code",
  "customerName",
  "receiptNumber",
  "productName",
  "phoneNumber",
  "sku",
  "shipperTrackingId",
];

type OrdersApiResponse = {
  data: OrderItem[];
  meta: {
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    limit?: number;
    nextCursor?: string | null;
    usedCursor?: boolean;
  };
};

export default function AllOrderPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [, setIsMobile] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  // Cursor-pagination state (1 page = 1 request)
  const ITEMS_PER_PAGE = 20;

  // current page data only (bukan akumulasi)
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // cursor state for navigation
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);

  // simpan cursor per halaman supaya Prev bisa fetch ulang
  // index 0 => cursor untuk page 1 (null)
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([null]);

  // total items dari backend (untuk totalPages)
  const [totalItems, setTotalItems] = useState<number>(0);

  const [filterOrder, setFilterOrder] = useState<FilterState>({
    ordererCustomerId: "",
    deliveryTargetCustomerId: "",
    salesChannelId: "",
    deliveryPlaceId: "",
    orderDate: "",
    orderStatus: "",
    orderMonth: "",
    orderYear: "",
    startDate: "",
    endDate: "",
    customerCategory: "",
    paymentStatus: "",
    productId: "",
    paymentMethodId: "",
    search: "",
    sort: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const requestSeq = useRef(0);

  const handleSearchAndFilter = useCallback(
    (keyword: string, filter: FilterState, field: string) => {
      const params = new URLSearchParams();

      searchFields.forEach((key) => params.delete(key));
      params.delete("search");

      if (keyword) {
        if (field && field !== "") params.set(field, keyword.toLowerCase());
        else params.set("search", keyword.toLowerCase());
      }

      Object.entries(filter).forEach(([key, value]) => {
        if (value && value !== "") params.set(key, value);
      });

      navigate(`?${params.toString()}`);
    },
    [navigate],
  );

  const handleStatusChange = (status: string) => {
    setSelectedStatuses(status);

    const newFilter = {
      ...filterOrder,
      paymentStatus: status || "",
    };

    setFilterOrder(newFilter);
    handleSearchAndFilter(keyword, newFilter, searchField);
  };

  const filterFromURL = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const f: FilterState = {
      ordererCustomerId: params.get("ordererCustomerId") || "",
      deliveryTargetCustomerId: params.get("deliveryTargetCustomerId") || "",
      salesChannelId: params.get("salesChannelId") || "",
      deliveryPlaceId: params.get("deliveryPlaceId") || "",
      orderDate: params.get("orderDate") || "",
      orderStatus: params.get("orderStatus") || "",
      orderMonth: params.get("orderMonth") || "",
      orderYear: params.get("orderYear") || "",
      startDate: params.get("startDate") || "",
      endDate: params.get("endDate") || "",
      customerCategory: params.get("customerCategory") || "",
      paymentStatus: params.get("paymentStatus") || "",
      productId: params.get("productId") || "",
      paymentMethodId: params.get("paymentMethodId") || "",
      search: params.get("search") || "",
      customerName: params.get("customerName") || "",
      productName: params.get("productName") || "",
      sku: params.get("sku") || "",
      receiptNumber: params.get("receiptNumber") || "",
      phoneNumber: params.get("phoneNumber") || "",
      shipperTrackingId: params.get("shipperTrackingId") || "",
      sort: params.get("sort") || "",
      orderId: params.get("orderId") || "",
      code: params.get("code") || "",
    };
    return f;
  }, [location.search]);

  const normalizeOrdersResponse = (result: any): OrdersApiResponse | null => {
    // Support 2 bentuk:
    // 1) responseObject = { data, meta } (baru)
    // 2) responseObject = OrderItem[] (lama) -> kita bungkus meta minimal
    if (!result?.success) return null;

    const ro = result.responseObject;

    if (ro && typeof ro === "object" && Array.isArray(ro.data)) {
      return ro as OrdersApiResponse;
    }

    if (Array.isArray(ro)) {
      return {
        data: ro as OrderItem[],
        meta: {
          totalItems: ro.length,
          limit: ITEMS_PER_PAGE,
          nextCursor: null,
          usedCursor: false,
        },
      };
    }

    return null;
  };

  const fetchPage = useCallback(
    async (pageNumber: number, cursor: string | null) => {
      setLoading(true);
      const seq = ++requestSeq.current;

      const filteredParams = Object.fromEntries(
        Object.entries(filterFromURL).filter(
          ([_, value]) => value !== "" && value !== undefined,
        ),
      );

      const result = await getOrders({
        ...filteredParams,
        limit: ITEMS_PER_PAGE,
        ...(cursor ? { cursor } : {}),
      } as any);

      // kalau ada request lebih baru, abaikan hasil request lama
      if (seq !== requestSeq.current) return;

      const normalized = normalizeOrdersResponse(result);

      if (!normalized) {
        setOrders([]);
        setNextCursor(null);
        setHasNext(false);
        setTotalItems(0);
        setLoading(false);
        return;
      }

      const data = normalized.data ?? [];
      const meta = normalized.meta ?? {};

      // JANGAN filter CANCEL di FE kalau kamu ingin "data tidak hilang".
      // Kalau memang CANCEL harus disembunyikan, aktifkan lagi.
      setOrders(data);

      const nc = (meta.nextCursor ?? null) as string | null;
      setNextCursor(nc);
      setHasNext(Boolean(nc) && data.length > 0);

      const total = Number(meta.totalItems ?? 0);
      setTotalItems(Number.isFinite(total) ? total : 0);

      setCursorHistory((prev) => {
        const copy = [...prev];
        copy[pageNumber - 1] = cursor; // page 1 index 0
        return copy;
      });

      setCurrentPage(pageNumber);
      setLoading(false);
    },
    [filterFromURL, ITEMS_PER_PAGE],
  );

  // reset list saat filter berubah -> fetch page 1
  useEffect(() => {
    setFilterOrder(filterFromURL);
    setSelectedStatuses(filterFromURL.paymentStatus || "");

    // reset cursor navigation
    setOrders([]);
    setNextCursor(null);
    setHasNext(false);
    setCursorHistory([null]);
    setCurrentPage(1);
    setTotalItems(0);

    fetchPage(1, null);
  }, [filterFromURL, fetchPage]);

  useEffect(() => {
    if (!location.search) {
      const savedFilter = localStorage.getItem("orderFilter");
      if (savedFilter) {
        const parsedFilter: FilterState = JSON.parse(savedFilter);
        setFilterOrder(parsedFilter);
        handleSearchAndFilter(keyword, parsedFilter, searchField);
      }
    }
  }, [handleSearchAndFilter, keyword, location.search, searchField]);

  useEffect(() => {
    setFilterOrder((prev) => {
      const updated = { ...prev };
      searchFields.forEach((field) => {
        if (field !== searchField && updated[field as keyof FilterState]) {
          delete updated[field as keyof FilterState];
        }
      });
      return updated;
    });
  }, [searchField]);

  useEffect(() => {
    if (!searchField || keyword === undefined) return;

    const timeout = setTimeout(() => {
      handleSearchAndFilter(keyword, filterOrder, searchField);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, searchField, filterOrder, handleSearchAndFilter]);

  const onSearchClick = () => {
    const updatedFilter = {
      ...filterOrder,
      [searchField]: keyword,
    };

    setFilterOrder(updatedFilter);
    handleSearchAndFilter(keyword, updatedFilter, searchField);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleExport() {
    toast.promise(exportOrdersToExcel(), {
      loading: "Mengunduh file...",
      success: "File berhasil diunduh!",
      error: "Gagal mengunduh file Excel.",
    });
  }

  // =========================
  // Pagination handler (cursor-based)
  // =========================
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : currentPage;

  const handlePageChange = async (page: number) => {
    if (loading) return;
    if (page < 1) return;

    if (page === 1) {
      setCursorHistory([null]);
      await fetchPage(1, null);
      return;
    }

    // Prev page (gunakan cursorHistory)
    if (page < currentPage) {
      const cursorForPage = cursorHistory[page - 1] ?? null;
      await fetchPage(page, cursorForPage);
      return;
    }

    // Next page (harus berurutan agar cursor valid)
    if (page === currentPage + 1) {
      if (!hasNext || !nextCursor) return;

      // simpan cursor untuk page berikutnya sebelum fetch (agar tidak "kehilangan" kalau user cepat klik)
      setCursorHistory((prev) => {
        const copy = [...prev];
        copy[page - 1] = nextCursor;
        return copy;
      });

      await fetchPage(page, nextCursor);
      return;
    }

    toast.error("Pagination cursor harus berurutan (Next/Prev).");
  };

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOrderIds([]);
  }, [currentPage, location.search]);

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = orders.map((order) => order.id);
    if (checked) {
      setSelectedOrderIds((prev) => [
        ...prev,
        ...currentPageIds.filter((id) => !prev.includes(id)),
      ]);
    } else {
      setSelectedOrderIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    }
  };

  const isAllSelected = orders.every((order) => selectedOrderIds.includes(order.id));

  const handleToggleSelect = (orderId: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleMassPrint = () => {
    if (selectedOrderIds.length === 0) return;
    const query = selectedOrderIds.join(",");
    navigate(`/order/print-label?ids=${query}`);
  };

  return (
    <div className="dark:border-gray-800 dark:bg-white/[0.0] dark:text-gray-400">
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Halaman Order" />
      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div className="py-2 bg-gray-50 dark:bg-white/[0]">
        <div
          className={`flex flex-wrap gap-2 ${
            window.innerWidth <= 768 ? "overflow-x-auto" : ""
          }`}
        >
          <FilterStatusOrder
            onChange={handleStatusChange}
            selectedStatuses={selectedStatuses}
          />
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
          <div className="flex flex-wrap items-center">
            <FilterOrderDropdown value={searchField} onChange={setSearchField} />
            <SearchOrder
              onSearch={onSearchClick}
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
                  startIcon={<FaPlus className="size-5 text-white" />}
                >
                  Tambah Order
                </Button>
              </div>
            </Link>

            <Button
              size="md"
              variant="outline"
              startIcon={<TbFilterDiscount className="size-5 text-blue-700" />}
              onClick={() => setFilter((prev) => !prev)}
            >
              Filter
            </Button>

            <Button
              size="md"
              variant="outline"
              onClick={handleExport}
              startIcon={<DownloadIcon className="size-5 text-blue-700" />}
            >
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
              onFilter={() =>
                handleSearchAndFilter(keyword, filterOrder, searchField)
              }
            />
          ) : null}

          {/* Info */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-2xl font-medium">
              {totalItems > 0 ? `${totalItems} order ditemukan` : `${orders.length} order`}
            </p>

            <div className="flex justify-between items-center bg-white dark:bg-white/[0] dark:border dark:border-gray-700 p-3.5 rounded-lg">
              <Link to="/profile">
                <span className="text-blue-600 dark:text-white/[0.3] text-md font-semibold">
                  Lihat Detail
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6">
          {loading ? (
            <div className="text-center py-10" />
          ) : (
            <OrderCard
              orders={orders}
              selectedOrderIds={selectedOrderIds}
              onToggleSelect={handleToggleSelect}
            />
          )}
        </div>

        <OrderToolbar
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
          selectedCount={selectedOrderIds.length}
          onMassPrint={handleMassPrint}
          selectedOrderIds={selectedOrderIds}
          hasNext={hasNext}
          hasPrev={currentPage > 1}
          totalPagesOverride={totalPages}
        />
      </div>
    </div>
  );
}