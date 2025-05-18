import { useState } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OrderCard from "./OrderCard";
import { FaPlus, FaDownload, FaFilter } from "react-icons/fa";

export default function AllOrderPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const statusList = [
    "Semua Order",
    "Belum Bayar",
    "Belum Lunas",
    "Belum Diproses",
    "Belum Ada Resi",
    "Pengiriman Dalam Proses",
    "Pengiriman Berhasil",
    "d", // Jika ini bukan status valid, silakan hapus
  ];

  const handleToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Halaman Order" />
      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div className="py-2 bg-gray-50">
        {/* Tabs */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Semua Order",
            "Belum Bayar",
            "Belum Lunas",
            "Belum Diproses",
            "Belum Ada Resi",
            "Pengiriman Dalam Proses",
            "Pengiriman Berhasil",
            "d",
          ].map((label, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded border text-sm ${
                i === 0
                  ? "bg-blue-100 text-blue-600 border-blue-400"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              {label}
            </button>
          ))}
        </div> */}

        <div
          className={`flex flex-wrap gap-2 ${
            window.innerWidth <= 768 ? "overflow-x-auto" : ""
          }`}>
          {statusList.map((status) => (
            <label
              key={status}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                selectedStatuses.includes(status)
                  ? " text-white border-blue-500"
                  : " text-gray-700 border-gray-300"
              } cursor-pointer`}>
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleToggle(status)}
                className="form-checkbox accent-blue-600"
              />
              <span className="text-sm">{status}</span>
            </label>
          ))}
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative">
            <select className="border px-3 py-4 rounded-xl text-sm bg-white">
              <option value="">Pilih Filter</option>
              <option value="orderId">Order ID</option>
              <option value="customerName">Nama Customer</option>
              <option value="productName">Nama Produk</option>
              <option value="sku">SKU</option>
              <option value="resiNumber">No Resi</option>
              <option value="customerPhone">Telp Customer</option>
              <option value="shipperTrackingId">Shipper Tracking ID</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Pencarian . . ."
            className="border px-3 py-2 rounded text-sm w-64"
          />
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
              <FaPlus size={14} /> Tambah Order
            </button>
            <button className="flex items-center gap-2 border px-4 py-2 rounded">
              <FaFilter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 border px-4 py-2 rounded">
              <FaDownload size={14} /> Download
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-2xl font-medium">279 order ditemukan</p>
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
      <div>
        <OrderCard />
      </div>
    </div>
  );
}
