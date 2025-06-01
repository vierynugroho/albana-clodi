import  { useEffect, useState } from "react";
import ProdukImage from "../../../../public/images/icons/produk_image.jpg";

type ProductModalProps = {
  productName: string;
  price: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onClose: () => void;
  onSave: () => void;
};


export default function EditProductModal({
  productName,
  price,
  quantity,
  onQuantityChange,
  onClose,
  onSave,
}: ProductModalProps) {
  const [value, setValue] = useState<number>(quantity);

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const decrease = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      onQuantityChange(newValue);
    }
  };

  const increase = () => {
    const newValue = value + 1;
    setValue(newValue);
    onQuantityChange(newValue);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Edit produk</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <div className="text-center mt-6">
          <div className="rounded-full flex items-center justify-center">
            <img src={ProdukImage} alt="Produk" className="w-20 h-20" />
          </div>
          <p className="mt-4 font-medium">{productName}</p>
          <p className="text-black font-bold text-lg">
            Rp{price.toLocaleString("id-ID")}
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center border rounded">
              <button
                onClick={decrease}
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
              >
                -
              </button>
              <div className="px-6 py-2 border-l border-r">{value}</div>
              <button
                onClick={increase}
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-right">
          <button
            onClick={onSave}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
