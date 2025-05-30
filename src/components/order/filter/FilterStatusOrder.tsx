import { useState } from "react";

type FilterStatusOrderProps = {
  selectedStatuses: string[];
  onChange: (selected: string[]) => void;
};

export default function FilterStatusOrder({
  selectedStatuses,
  onChange,
}: FilterStatusOrderProps) {
  const handleToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onChange([...selectedStatuses, status]);
    }
  };
  const [status, setStatus] = useState("Semua Order");

  const statusList: string[] = [
    "Semua Order",
    "Belum Bayar",
    "Belum Lunas",
    "Belum Diproses",
    "Belum Ada Resi",
    "Pengiriman Dalam Proses",
    "Pengiriman Berhasil",
    // "d", // Hapus jika bukan status valid
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusList.map((statusOrder) => (
        <button
          key={statusOrder}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors duration-200 ${
            status === statusOrder
              ? "text-blue-600  border-blue-600"
              : "text-gray-700 border-gray-300"
          } cursor-pointer`}
          onClick={() => setStatus(statusOrder)}>
          <span
            className={`w-2 h-2 rounded-full ${
              status === statusOrder ? "bg-blue-600" : "bg-gray-400"
            }`}
          />

          <span className="text-sm">{statusOrder}</span>
        </button>
      ))}
    </div>
  );
}
