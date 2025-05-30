import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "../../form/input/InputField";

export type DiscountValueType = "Rp" | "%";
export type ItemType = "diskon" | "biaya" | "asuransi" | "ongkir";

type Props = {
  changeModal: () => void;
  title?: string;
  namePlaceholder?: string;
  onSubmit?: (data: { name: string; value: string; type: string; discountType: DiscountValueType}) => void;
  initialData?: { name: string; value: string; type: string; discountType: DiscountValueType} | null;
};

export default function ModalFormDiscount({
  changeModal,
  title = "Diskon Order",
  namePlaceholder = "Masukkan Nama Diskon",
  onSubmit,
  initialData = null,
}: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [nominal, setNominal] = useState(initialData?.value || "");
  const [type, setType] = useState(initialData?.type || "");
  const [discountType, setDiscountType] = useState<DiscountValueType>(initialData?.discountType || "Rp");

  useEffect(() => {
    setName(initialData?.name || "");
    setNominal(initialData?.value || "");
    setType(initialData?.type || "");
    setType(initialData?.discountType || "Rp");
  }, [initialData]);


  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ name, value: nominal, type, discountType });
    } else {
      console.log("Submitted:", { name, value: nominal, type });
    }
    changeModal();
  };

  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40" onClick={changeModal} />
        <div className="bg-white rounded-xl shadow-lg z-50 w-full max-w-md p-6 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={changeModal}
              className="text-gray-500 hover:text-red-500"
            >
              <IoIosCloseCircleOutline size={28} />
            </button>
          </div>
          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={namePlaceholder}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nominal</label>
              <div className="flex">
              <select
                value={discountType}
                onChange={(e) =>
                  setDiscountType(e.target.value as DiscountValueType )
                }
                className="border rounded-l px-3 py-2 bg-white"
              >
                <option value="Rp">Rp</option>
                <option value="%">%</option>
              </select>
              <input
                type="number"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                className="w-full border-t border-b border-r rounded-r px-4 py-2"
              />
            </div>
            </div>

            <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md">
                Simpan Template
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {initialData ? "Simpan Perubahan" : "Tambahkan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
