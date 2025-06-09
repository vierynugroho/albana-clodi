import { useEffect, useRef, useState, useMemo } from "react";
import { FaBluetooth } from "react-icons/fa";
import {
  SettingFeatureValue,
  TPrintSetting,
  SettingOptionValue,
  TReceiptData,
} from "../../service/order/print/order.type";
import { SettingOptionCard } from "../../components/print-label/card/SettingOptionCard";
import { SettingFeatureCard } from "../../components/print-label/card/SettingFeatureCard";
import PageMeta from "../../components/common/PageMeta";
import PageTitle from "../../components/common/PageTitle";
import Button from "../../components/ui/button/Button";
import { PreviewOutput } from "../../components/print-label/preview/PreviewOutput";
import { getReceiptByOrderId } from "../../service/order/print";
import { useLocation, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function PrintSettingsPage() {
  const location = useLocation();
  const { id: routeId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const idsParam = queryParams.get("ids") || routeId; // ambil string ids dari query

  // pakai useMemo supaya ids array hanya dibuat ulang kalau idsParam berubah
  const ids = useMemo(() => {
    return idsParam ? idsParam.split(",").filter(Boolean) : [];
  }, [idsParam]);

  const [selectedFeature, setselectedFeature] = useState("shipping");
  const [selectedOption, setselectedOption] = useState<SettingOptionValue>({
    shipping: [
      "Detail Order",
      "Ekspedisi",
      "Item Produk",
      "Catatan",
      "No Resi",
      "Shop Logo",
      "Shop Info",
    ],
    invoice: ["Alamat Pengiriman", "Invoice Note"],
    "thermal-58": ["Logo", "Nama Toko", "Nomor Resi"],
  });

  const [receiptDataList, setReceiptDataList] = useState<TReceiptData[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrintReact = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${selectedFeature} - ALBANA GROSIR`,
  });

  const options: TPrintSetting[] = [
    { id: "shipping", label: "Shipping Label" },
    { id: "invoice", label: "Invoice" },
    {
      id: "thermal-58",
      label: "Invoice Thermal (58mm)",
      icon: <FaBluetooth className="inline ml-1 text-sm" />,
    },
  ];

  const features: SettingFeatureValue = {
    shipping: [
      "Detail Order",
      "Fragile Sign",
      "Shop Logo",
      "Shop Info",
      "No. PO",
      "Tanggal Order",
      "No Resi",
      "Barcode No Resi",
      "Ekspedisi",
      "Nominal Ekspedisi",
      "Total Item",
      "Pembulatan Berat",
      "Nama Admin",
      "Barcode PO",
      "Barcode SKU",
      "Barcode SKU Text",
      "Item Produk",
      "Catatan",
      "Warehouse",
    ],
    invoice: [
      "Invoice Note",
      "SKU",
      "Kolom Berat",
      "Total Item",
      "Pembulatan Berat",
      "Nama Admin",
      "Nama Ekspedisi",
      "Nomor Rekening",
      "Alamat Pengiriman",
      "Diskon",
      "Asuransi",
      "Biaya Tambahan",
      "Rincian Biaya Cicilan",
    ],
    "thermal-58": [
      "Logo",
      "Invoice Note",
      "Nama Toko",
      "Keterangan Toko",
      "Alamat Toko",
      "SKU",
      "Nomor Rekening",
      "Detail Invoice",
      "Alamat Pengiriman",
      "Nomor Resi",
      "Input Time",
      "Total Item",
      "Pembulatan Berat",
      "Nama Admin",
      "Diskon",
      "Asuransi",
      "Biaya Tambahan",
      "Gudang",
    ],
  };

  const toggleOption = (item: string) => {
    setselectedOption((prev) => {
      const current = prev[selectedFeature] || [];
      const newOptions = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];

      return {
        ...prev,
        [selectedFeature]: newOptions,
      };
    });
  };

  const availableFeatures = features[selectedFeature] || [];
  const selectedFeatures = selectedOption[selectedFeature] || [];

  useEffect(() => {
    async function fetchReceipts() {
      if (ids.length === 0) return;

      // ambil semua receipts satu per satu secara paralel
      const promises = ids.map((id) => getReceiptByOrderId(id));
      const results = await Promise.all(promises);

      // filter hasil yang sukses dan ambil responseObject-nya
      const successfulReceipts = results
        .filter((res) => res.success && res.responseObject)
        .map((res) => res.responseObject);

      setReceiptDataList(successfulReceipts);
    }

    fetchReceipts();
  }, [ids]);

  return (
    <div className="p-5 md:p-10 space-y-5">
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageTitle title="Pengaturan Cetak" />

      <div className="flex justify-end items-center gap-2">
        {/* <Button variant="outline">Simpan</Button> */}
        <Button variant="primary" onClick={handlePrintReact}>
          Cetak
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SettingOptionCard
          options={options}
          selectedOption={selectedFeature}
          onChange={setselectedFeature}
        />
        <SettingFeatureCard
          features={availableFeatures}
          selectedFeatures={selectedFeatures}
          onToggle={toggleOption}
          className="md:col-span-2"
        />
      </div>

      <div id="print-area" className="space-y-5" ref={componentRef}>
        {/* {receiptDataList.length === 0 && <p>Tidak ada data receipt.</p>} */}
        {receiptDataList.map((data, idx) => (
          <PreviewOutput
            key={idx}
            selectedFeature={selectedFeature}
            selectedFeatures={selectedOption[selectedFeature] || []}
            data={data}
            className={
              selectedFeature === "thermal-58" ? "flex flex-col w-fit" : ""
            }
          />
        ))}
      </div>
    </div>
  );
}
