import { useCallback, useEffect, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/produk/button/Button";
import TableCategory from "../../components/produk/kategoriProduk/TableKategori";
import ProdukPageBreadcrumb from "../../components/produk/ProdukPageBreadcrumb";
import ModalFormKategory from "../../components/produk/modal/ModalFormKategori";
import {
  CategoryProduct,
  detailCategory,
  getCategories,
} from "../../service/product/category";
import toast, { Toaster } from "react-hot-toast";
import ModalDeleteCategory from "../../components/produk/modal/ModalDeleteCategory";

export default function CategoryProduk() {
  // State for Modal
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [categories, setCategories] = useState<CategoryProduct[]>([]);
  const [detailCategories, setDetailCategories] = useState<CategoryProduct>();
  const [isEdit, setIsEdit] = useState(false);
  const hasFetched = useRef(false);

  async function handleEdit(id: string) {
    // Get Data
    const result = await detailCategory(id);
    console.log(result);
    setDetailCategories(result.responseObject);
    setIsEdit(true);
    setModal((prevModal) => !prevModal);
  }

  function changeModal() {
    setIsEdit(false);
    setModal((prevModal) => !prevModal);
  }

  async function handleDelete(id: string) {
    setModalDelete((prevModal) => !prevModal);
    setIdDelete(id);
  }

  function changeModalDelete() {
    setModalDelete((prevModal) => !prevModal);
  }

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    if (result.success && result.responseObject) {
      setCategories(result.responseObject);
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
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <Toaster />
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <ProdukPageBreadcrumb pageTitle="Kategori Produk" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <Button className="mb-3" onClick={changeModal}>
          Tambah Kategori
        </Button>
        <TableCategory
          categories={categories}
          setModal={handleEdit}
          setModalDelete={handleDelete}
        />
      </div>
      {modal ? (
        <ModalFormKategory
          isEdit={isEdit}
          detailCategory={detailCategories}
          changeModal={changeModal}
          fechCategory={fetchCategories}
        />
      ) : null}
      {modalDelete && (
        <ModalDeleteCategory
          changeModal={changeModalDelete}
          fechCategory={fetchCategories}
          id={idDelete}
        />
      )}
    </div>
  );
}
