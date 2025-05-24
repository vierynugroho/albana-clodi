import { useRef, useState } from "react";
import { FaBluetooth } from "react-icons/fa";
import {
  SettingFeatureValue,
  PrintSetting,
  SettingOptionValue,
} from "../../components/print-label/PrintType";
import { SettingOptionCard } from "../../components/print-label/card/SettingOptionCard";
import { SettingFeatureCard } from "../../components/print-label/card/SettingFeatureCard";
import PageMeta from "../../components/common/PageMeta";
import PageTitle from "../../components/common/PageTitle";
import Button from "../../components/ui/button/Button";
import { PreviewOutput } from "../../components/print-label/preview/PreviewOutput";

export default function PrintSettingsPage() {
  const [selectedFeature, setselectedFeature] = useState("shipping");
  const [selectedOption, setselectedOption] = useState<SettingOptionValue>({});
  const printRef = useRef<HTMLDivElement>(null);

  const options: PrintSetting[] = [
    { id: "shipping", label: "Shipping Label" },
    { id: "invoice", label: "Invoice" },
    {
      id: "thermal-56",
      label: "Invoice Thermal (56mm)",
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
    "thermal-56": [
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

  // Handle Print
  const handlePrint = () => {
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="p-5 md:p-10 space-y-5">
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageTitle title="Pengaturan Cetak" />

      <div className="flex justify-end items-center gap-2">
        <Button>Simpan</Button>
        <Button onClick={handlePrint}>Cetak</Button>
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

      <div ref={printRef} id="print-area">
        <PreviewOutput
          selectedFeature={selectedFeature}
          selectedFeatures={selectedFeatures}
        />
      </div>
    </div>
  );
}
