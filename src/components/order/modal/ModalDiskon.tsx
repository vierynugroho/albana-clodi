import { useState } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  changeModal: () => void;
};

export default function ModalDiskon({ changeModal }: Props) {
  const [namaDiskon, setNamaDiskon] = useState("");
  const [nominal, setNominal] = useState(0);
  const [tipeNominal, setTipeNominal] = useState("Rp");

  const handleSubmit = () => {
    // Implement logic to handle diskon submission
    console.log({ namaDiskon, nominal, tipeNominal });
  };

  return ReactDOM.createPortal(
    <div className="fixed z-[10000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40"></div>
        <div className="bg-white rounded-xl shadow-lg z-50 w-full max-w-md p-6 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Diskon Order</h2>
            <button
              onClick={changeModal}
              className="text-gray-500 hover:text-red-500">
              <IoIosCloseCircleOutline size={28} />
            </button>
          </div>
          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                type="text"
                value={namaDiskon}
                onChange={(e) => setNamaDiskon(e.target.value)}
                placeholder="Nama Diskon Order"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nominal</label>
              <div className="flex items-center gap-2">
                <select
                  value={tipeNominal}
                  onChange={(e) => setTipeNominal(e.target.value)}
                  className="border border-gray-300 rounded-md p-2">
                  <option value="Rp">Rp</option>
                  <option value="%">%</option>
                </select>
                <input
                  type="number"
                  value={nominal}
                  onChange={(e) => setNominal(parseInt(e.target.value))}
                  className="flex-1 border border-gray-300 rounded-md p-2"
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
