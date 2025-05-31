import { IoNotifications } from "react-icons/io5";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ProdukPageBreadcrumb from "../../components/produk/ProdukPageBreadcrumb";
import SettingBarcode from "../../components/produk/printBarcode/SettingBarcode";
import SearchableDropdown from "../../components/produk/input/SearchDropdown";
import { useEffect, useRef, useState } from "react";
import Label from "../../components/form/Label";
import { ArrayProduct, getProducts } from "../../service/product";

export default function PrintProductBarcode() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dataProducts = useRef<ArrayProduct[]>([]);

  useEffect(() => {
    setLoading(true);
    async function fetchProducts() {
      const result = await getProducts();
      if (result.success && result.responseObject) {
        dataProducts.current = result.responseObject.data;
        setLoading(false);
      } else {
        setMessage(result.message);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  console.log(message);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <ProdukPageBreadcrumb pageTitle="Cetak Barcode" />
      <div className=" min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex gap-4">
          <ComponentCard title="Pengaturan Label Barcode" className="flex-1/2">
            <div className="flex gap-4 bg-brand-400 rounded-2xl p-3">
              <IoNotifications size={40} />
              <section className="font-normal">
                Dengan barcode, kamu bisa menyimpan data spesifik produk seperti
                harga dan nama, untuk dicetak dan ditempelkan ke produk.
              </section>
            </div>
            {/* Component For Setting Barcode */}
            <SettingBarcode />
          </ComponentCard>
          <ComponentCard title="Pilih Produk" className="flex-1/2">
            <div className="flex gap-2 flex-col">
              <Label>Cari Produk</Label>
              <SearchableDropdown
                options={dataProducts.current}
                label="name"
                id="id"
                loading={loading}
                selectedVal={value}
                handleChange={(val) => setValue(val)}
              />
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
