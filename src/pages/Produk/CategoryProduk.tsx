import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/produk/button/Button";
import TableCategory from "../../components/produk/kategoriProduk/TableKategori";
import ProdukPageBreadcrumb from "../../components/produk/ProdukPageBreadcrumb";
import ModalFormKategory from "../../components/produk/modal/ModalFormKategori";

type Category = {
  id: string;
  kategori: string;
};

export default function CategoryProduk() {
  // State for Modal
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  function changeModal() {
    setModal((prevModal) => !prevModal);
  }

  function setCategory(id: string, kategori: string) {
    setCategories((prevCategory) => [...prevCategory, { id, kategori }]);
  }
  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <ProdukPageBreadcrumb pageTitle="Kategori Produk" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <Button className="mb-3" onClick={changeModal}>
          Tambah Kategori
        </Button>
        <TableCategory categories={categories} />
      </div>
      {modal ? (
        <ModalFormKategory
          changeModal={changeModal}
          setCategories={setCategory}
        />
      ) : null}
    </div>
  );
}
