import { useState } from "react";

type FilterStatusOrderProps = {
  selectedStatuses: string;
  onChange: (selected: string) => void; // Kirim value paymentStatus ke parent
};

// Mapping status yang ditampilkan → nilai paymentStatus
const statusToPaymentStatusMap: Record<string, string> = {
  "Belum Bayar": "PENDING",
  "Belum Lunas": "INSTALEMENTS",
  "Belum Diproses": "PENDING",
  "Semua Order": "",
};

export default function FilterStatusOrder({
  onChange,
}: FilterStatusOrderProps) {
  const [status, setStatus] = useState("Semua Order");

  const statusList: string[] = [
    "Semua Order",
    "Belum Bayar",
    "Belum Lunas",
    "Belum Diproses",
    "Belum Ada Resi",
    "Pengiriman Dalam Proses",
    "Pengiriman Berhasil",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusList.map((statusOrder) => {
        const isSelected = status === statusOrder;
        return (
          <button
            key={statusOrder}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors duration-200 ${
              isSelected ? "text-blue-600 border-blue-600" : "text-gray-700 border-gray-300"
            } cursor-pointer`}
            onClick={() => {
              setStatus(statusOrder);
              const mapped = statusToPaymentStatusMap[statusOrder] || "";
              onChange(mapped);
            }}
          >
            <span
              className={`w-2 h-2 rounded-full ${isSelected ? "bg-blue-600" : "bg-gray-400"}`}
            />
            <span className="text-sm">{statusOrder}</span>
          </button>
        );
      })}
    </div>
  );
}
