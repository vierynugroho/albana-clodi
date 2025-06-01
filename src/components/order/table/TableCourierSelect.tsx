import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ShippingCostParams, ShippingService } from "../../../service/order/create-order.type";
import { calculateShippingCost } from "../../../service/order/create-order.service";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";

const manualServices = [
  {
    shipping_name: "FREE",
    service_name: "Ambil di Toko",
    weight: 0,
    is_cod: false,
    shipping_cost: 0,
    shipping_cashback: 0,
    shipping_cost_net: 0,
    grandtotal: 0,
    service_fee: 0,
    net_income: 0,
    etd: "- days",
    is_manual: true,
  },
  {
    shipping_name: "M",
    service_name: "Nama Kurir",
    weight: 0,
    is_cod: false,
    shipping_cost: 0,
    shipping_cashback: 0,
    shipping_cost_net: 0,
    grandtotal: 0,
    service_fee: 0,
    net_income: 0,
    etd: "- days",
    is_manual: true,
  },
];

interface TableCourierSelectionProps {
  onSelectCourier: (shippingCost: number, shippingName: string, shippingService: string) => void;
  totalBerat: number;
  shipperDestinationId?: number;
  receiverDestinationId?: number;
  itemValue?: number;
  cod?: string;
}

export default function TableCourierSelection({
  onSelectCourier,
  totalBerat,
  itemValue,
  shipperDestinationId,
  receiverDestinationId,
  cod = "no",
}: TableCourierSelectionProps) {
  const [courier, setCourier] = useState<ShippingService[]>(manualServices);
  const [selectedManualIndex, setSelectedManualIndex] = useState<number | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchShippingData = async () => {
      if (totalBerat <= 0 || !shipperDestinationId || !receiverDestinationId) {
        setCourier(manualServices);
        return;
      }
      const params: ShippingCostParams = {
        shipper_destination_id: shipperDestinationId,
        receiver_destination_id: receiverDestinationId,
        weight: totalBerat,
        item_value: itemValue ? itemValue : 0,
        cod: cod,
      };
      try {
        const res = await calculateShippingCost(params);
        const allServices = [
          ...res.responseObject.calculate_reguler,
          ...res.responseObject.calculate_cargo,
          ...res.responseObject.calculate_instant,
        ];
        setCourier([...allServices, ...manualServices]);
      } catch (err) {
        console.log(
          err instanceof Error ? err : new Error("Gagal mengambil ongkos kirim")
        );
      }
    };

    fetchShippingData();
  }, [cod, itemValue, receiverDestinationId, shipperDestinationId, totalBerat]);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-black dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-sm text-start text-black dark:text-gray-400"
                >
                  Kurir
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-sm text-start text-black dark:text-gray-400"
                >
                  Layanan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-sm text-start text-black dark:text-gray-400"
                >
                  ETA
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-sm text-start text-black dark:text-gray-400"
                >
                  Tarif
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {courier.map((item, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    if (item.is_manual && item.shipping_name === "M") {
                      setSelectedManualIndex(idx);
                    } else {
                      setSelectedManualIndex(null);
                    }
                    onSelectCourier(item.shipping_cost, item.shipping_name, item.service_name);
                  }}
                  className={`cursor-pointer transition ${
                    selectedIndex === idx
                      ? "border-3 border-blue-500 dark:bg-white/[0.03] cursor-pointer"
                      : "hover:border-3 hover:border-blue-500 dark:hover:bg-white/[0.03] transition cursor-pointer"
                  }`}
                >
                  <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-300 text-white text-xs font-bold rounded text-center w-12 px-2 py-2">
                        {item.shipping_name}
                      </span>
                      <span>{item.shipping_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                    {item.service_name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                    {item.etd}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-blue-600">
                    {`Rp${(item.shipping_cost / 100).toLocaleString("id-ID")}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedManualIndex !== null &&
        courier[selectedManualIndex]?.is_manual && (
          <div className="space-y-4 p-4">
            <div>
              <Label>Kurir</Label>
              <Input
                type="text"
                placeholder="Nama kurir"
                value={courier[selectedManualIndex].service_name}
                onChange={(e) => {
                  const updated = [...courier];
                  updated[selectedManualIndex].service_name = e.target.value;
                  setCourier(updated);
                }}
              />
            </div>
            <div>
              <Label>Tarif</Label>
              <Input
                type="number"
                placeholder="Masukkan tarif"
                value={courier[selectedManualIndex].shipping_cost / 100}
                onChange={(e) => {
                  const updated = [...courier];
                  const newShippingCost = Number(e.target.value) * 100;
                  updated[selectedManualIndex].shipping_cost = newShippingCost;
                  setCourier(updated);
                  onSelectCourier(
                    newShippingCost,
                    updated[selectedManualIndex].shipping_name,
                    updated[selectedManualIndex].service_name
                  );
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
}
