import { useState } from "react";
import ReactDOM from "react-dom";
import Input from "../../components/form/input/InputField";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DatePicker from "../../components/form/date-picker";

type Props = {
  changeModal: () => void;
  setExpenses: (expense: {
    id: string;
    name: string;
    date: string;
    amount: number;
    quantity: number;
    note: string;
  }) => void;
};

export default function FormExpense({ changeModal, setExpenses }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const subtotal = amount * quantity;

  function addExpense() {
    if (name.trim() === "" || amount <= 0 || quantity <= 0) return;

    setExpenses({
      id: Date.now().toString(),
      name,
      date,
      amount,
      quantity,
      note,
    });
    changeModal();
  }

  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Tambah Pengeluaran
            </h2>
            <button
              onClick={changeModal}
              className="text-gray-400 hover:text-gray-700">
              <IoIosCloseCircleOutline size={27} />
            </button>
          </div>
          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          <div className="space-y-3">
            <div className="flex gap-4">
              <div>
                <p className="text-theme-sm font-medium mb-1">
                  Nama Pengeluaran
                </p>
                <Input
                  placeholder="Tulis nama pengeluaran..."
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div>
                {/* <label className="text-sm text-gray-600 mb-1 block">
                  Tanggal
                </label> */}
                <DatePicker
                  id="date-picker"
                  label="Tanggal"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label className="text-theme-sm font-semibold">BIaya(RP)</label>
                <Input
                  placeholder="Rp.0"
                  type="number"
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(Number(e.target.value))
                  }
                />
              </div>
              <div>
                <label className="text-theme-sm font-semibold">Jumlah</label>
                <Input
                  placeholder="0"
                  type="number"
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-theme-sm font-semibold mb-1 block">
                Keterangan
              </label>
              <textarea
                placeholder="Tulis keterangan pengeluaran..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border px-3 py-4 rounded text-sm resize-none"></textarea>
            </div>
            <hr className="py-2 border-gray-300 dark:border-gray-700" />

            <div className="text-theme-xl flex justify-between font-semibold mt-2">
              Subtotal:{" "}
              <span className="text-brand-600">
                Rp{subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={changeModal}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:text-gray-900">
              Batal
            </button>
            <button
              onClick={addExpense}
              className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-500">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
