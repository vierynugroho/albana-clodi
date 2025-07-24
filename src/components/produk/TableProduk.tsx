import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Checkbox from "../form/input/Checkbox";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FilterState, getProducts } from "../../service/product";
import { type ArrayProduct } from "../../service/product";
import { Link } from "react-router";
import ModalDeleteProduct from "./modal/ModalDeleteProduct";
import SpinnerLoading from "./loading/SpinnerLoading";

import toast from "react-hot-toast";

type PropsTableProduk = {
  search: string;
  isSearch: boolean;
  setIsSearch: React.RefObject<boolean>;
  firstLoadBrowser: boolean;
  setLoadBrowser: React.RefObject<boolean>;
  optionFilter: FilterState;
};

// Helper for pagination numbers (like the image)
function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];
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

export default function TableProduk({
  search,
  isSearch,
  setIsSearch,
  firstLoadBrowser,
  setLoadBrowser,
  optionFilter,
}: PropsTableProduk) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<ArrayProduct[] | null>(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeleteProduct, setIdDeleteProduct] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sync selectedItem when isChecked changes
  useEffect(() => {
    if (isChecked && products) {
      setSelectedItem(products.map((val) => val.product.id));
    } else {
      setSelectedItem([]);
    }
  }, [isChecked, products]);

  // Sync isChecked when selectedItem manually emptied
  useEffect(() => {
    if (selectedItem?.length === 0) {
      setIsChecked(false);
    }
  }, [selectedItem]);

  // Tampilkan toast jika message berubah dan tidak kosong
  useEffect(() => {
    if (message) {
      toast.error(message);
      setMessage(""); // Reset message setelah ditampilkan
    }
  }, [message]);

  const fetchProducts = useCallback(async () => {
    let result;
    setLoading(true);

    if (!isSearch && !firstLoadBrowser) {
      setLoading(false);
      return;
    }

    if (!isSearch && firstLoadBrowser) {
      result = await getProducts(currentPage);
      setLoadBrowser.current = false;
      if (result.success && result.responseObject) {
        setCurrentPage(Number(result.responseObject.meta.currentPage));
        setTotalPages(result.responseObject.meta.totalPages);
        setProducts(result.responseObject.data);
      } else {
        setMessage(result.message);
      }
    }

    if (isSearch) {
      result = await getProducts(currentPage, search, {
        type: optionFilter.type || null,
        channel: "",
        harga: "",
        kategori: "",
        produkMarketplace: "",
        urutan: "",
        order: "asc",
      });
      if (result.success && result.responseObject) {
        setCurrentPage(Number(result.responseObject.meta.currentPage));
        setTotalPages(result.responseObject.meta.totalPages);
        setProducts(result.responseObject.data);
      } else {
        setMessage(result.message);
      }
      setIsSearch.current = false;
    }
    setLoading(false);
  }, [
    currentPage,
    search,
    isSearch,
    setIsSearch,
    firstLoadBrowser,
    setLoadBrowser,
    optionFilter,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleModal = () => {
    setModalDelete((prev) => !prev);
  };

  const checkboxHandler = useCallback((checked: boolean, id: string) => {
    setSelectedItem((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  }, []);

  // Pagination Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-5">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Produk & Harga
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stock
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Varian
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kategori
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Keterangan
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Grosir
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-extrabold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow className="">
                <TableCell
                  colSpan={8}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  <SpinnerLoading />
                </TableCell>
              </TableRow>
            ) : products && products.length > 0 ? (
              products.map((produk) => (
                <TableRow key={produk.product.id}>
                  {/* Gunakan ID sebagai key, bukan index */}
                  <TableCell className="px-5 py-4 sm:px-5 text-start">
                    <Checkbox
                      id={produk.product.id}
                      checked={selectedItem.includes(produk.product.id)}
                      onChange={(checked) =>
                        checkboxHandler(checked, produk.product.id)
                      }
                    />
                  </TableCell>
                  <TableCell className="w-1/4 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={30}
                          height={30}
                          src="/images/icons/empty_box.svg"
                          alt="Product"
                        />
                      </div>
                      <div className="w-full">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <Link
                            to={`/produk/detail_produk/${produk.product.id}`}
                            className="hover:underline font-semibold"
                          >
                            {produk.product.name}
                          </Link>
                        </span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xl font-semibold">
                          Rp {produk.price.normal.toLocaleString("IND")}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {produk.variant.reduce((sum, item) => sum + item.stock, 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {produk.variant.length}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={"success"}>
                      {produk.product.type
                        ? produk.product.type
                        : "UNCATEGORIZED"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: produk.product.description || "",
                      }}
                    />
                  </TableCell>
                  <TableCell className="px-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div>Tidak Ada Harga Grosir</div>
                  </TableCell>
                  <TableCell className="px-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-2 items-stretch">
                      <Link to={`/produk/edit/${produk.product.id}`}>
                        <FaEdit className="w-6 h-5 text-amber-500 cursor-pointer" />
                      </Link>
                      <AiFillDelete
                        onClick={() => {
                          handleModal();
                          setIdDeleteProduct(produk.product.id);
                        }}
                        className="w-6 h-5 text-red-700 cursor-pointer"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell
                  colSpan={8}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  <div>Produk Tidak Ditemukan</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {modalDelete && (
          <ModalDeleteProduct
            changeModal={handleModal}
            id={idDeleteProduct}
            fetchProduk={fetchProducts}
          />
        )}
      </div>
      {/* Custom Pagination sesuai gambar */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 dark:border-white/[0.05]">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Halaman {currentPage} dari {totalPages}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded border text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {getPageNumbers(currentPage, totalPages).map((page, idx) =>
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
  );
}
