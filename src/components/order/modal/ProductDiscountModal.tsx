import { useEffect, useState } from "react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Button from "../../produk/button/Button";

type DiscountType = "Rp" | "%";

interface ProductDiscountModalProps {
  productName: string;
  initialPrice: number;
  initialDiscountValue?: number;
  initialDiscountType?: DiscountType;
  onClose: () => void;
  onSave: (finalPrice: number, discount: number, type: DiscountType) => void;
}

export default function ProductDiscountModal({
  productName,
  initialPrice,
  initialDiscountValue = 0,
  initialDiscountType = "Rp",
  onClose,
  onSave,
}: ProductDiscountModalProps) {
  const [discountType, setDiscountType] = useState<DiscountType>(initialDiscountType);
  const [discountValue, setDiscountValue] = useState<number>(initialDiscountValue);

  // Optional: jika modal tidak di-unmount saat ditutup
  useEffect(() => {
    setDiscountType(initialDiscountType);
    setDiscountValue(initialDiscountValue);
  }, [initialDiscountType, initialDiscountValue]);

  const getFinalPrice = () => {
    if (discountType === "Rp") {
      return Math.max(0, initialPrice - discountValue);
    } else {
      const percentValue = (initialPrice * discountValue) / 100;
      return Math.max(0, initialPrice - percentValue);
    }
  };

  const finalPrice = getFinalPrice();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Diskon</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <div className="mt-6 text-left space-y-4">
          <div>
            <Label>Nama Barang</Label>
            <Input
              type="text"
              value={productName}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <Label>Harga Awal</Label>
            <Input
              type="text"
              value={initialPrice.toLocaleString("id-ID")}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <Label>Diskon</Label>
            <div className="flex">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                className="border rounded-l px-3 py-2 bg-white"
              >
                <option value="Rp">Rp</option>
                <option value="%">%</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (discountType === "%" && value > 100) return;
                  if (value < 0) return;
                  setDiscountValue(value);
                }}
                className="w-full border-t border-b border-r rounded-r px-4 py-2"
              />
            </div>
          </div>

          <div>
            <Input
              type="text"
              value={finalPrice.toLocaleString("id-ID")}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-right">
          <Button
            onClick={() => onSave(finalPrice, discountValue, discountType)}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
