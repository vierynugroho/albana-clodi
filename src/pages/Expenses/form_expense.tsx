import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Input from "../../components/form/input/InputField";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DatePicker from "../../components/form/date-picker";
import {
  createExpense,
  editExpense,
  getDetailExpense,
} from "../../service/expense";
import toast from "react-hot-toast";

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
  isEdit: boolean;
  id?: string;
  refreshData: () => void;
};

export default function FormExpense({
  changeModal,
  refreshData,
  isEdit,
  id,
}: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [responseObject, setResponseObject] = useState("");

  const subtotal = amount * quantity;

  function toDateOnly(dateString: string): string {
    return new Date(dateString).toISOString().split("T")[0];
  }

  async function addExpense() {
    if (name.trim() === "" || amount <= 0 || quantity <= 0) return;
    const result = await createExpense({
      itemName: name,
      personResponsible: responseObject,
      qty: quantity,
      expenseDate: date,
      itemPrice: amount,
      note: note,
    });
    if (result.success) {
      toast.success(result.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      refreshData();
    } else {
      toast.error("Gagal Membuat Pengeluaran", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }

    changeModal();
  }

  async function handleEditDataExpense() {
    const result = await editExpense({
      id: id,
      itemName: name,
      personResponsible: responseObject,
      qty: quantity,
      expenseDate: date,
      itemPrice: amount,
      note: note,
    });
    if (result.success) {
      toast.success(result.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      refreshData();
    } else {
      toast.error("Gagal Memperbarui Pengeluaran ", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }

    changeModal();
  }

  useEffect(() => {
    if (isEdit && id) {
      async function handleEditExpense(id: string) {
        const result = await getDetailExpense(id);
        if (result.success && result.responseObject) {
          setName(result.responseObject.itemName);
          setDate(toDateOnly(result.responseObject.expenseDate));
          setAmount(result.responseObject.itemPrice);
          setQuantity(result.responseObject.qty);
          setResponseObject(result.responseObject.personResponsible);
          setNote(result.responseObject.note);
        } else {
          console.error(result.message);
        }
      }

      handleEditExpense(id);
    }
  }, [isEdit, id]);

  // Perbaikan: Gunakan backdrop yang tidak fixed, dan pastikan modal berada di atas konten lain tanpa menghalangi pointer events pada modal.
  // Gunakan z-index tinggi pada modal dan backdrop, dan backdrop tidak fixed agar pointer-events pada modal tetap aktif.
  // Juga, gunakan pointer-events-none pada backdrop dan pointer-events-auto pada modal.

  return ReactDOM.createPortal(
    <div
      className="z-[100000] inset-0 flex items-center justify-center min-h-screen px-4 text-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-500 opacity-75"
        style={{
          zIndex: 100000,
          pointerEvents: "auto",
        }}
        onClick={changeModal}
      ></div>
      {/* Modal */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          isEdit ? handleEditDataExpense() : addExpense();
        }}
        className="relative z-[100001] w-full flex justify-center items-center pointer-events-auto"
        style={{ pointerEvents: "auto" }}
      >
        <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {isEdit ? "Edit Pengeluaran" : "Tambah Pengeluaran"}
            </h2>
            <button
              type="button"
              onClick={changeModal}
              className="text-gray-400 hover:text-gray-700"
              tabIndex={0}
            >
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
                <DatePicker
                  id="date-picker"
                  label="Tanggal"
                  placeholder="Select a date"
                  defaultDate={date}
                  onChange={(_, currentDateString) => {
                    setDate(currentDateString);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label className="text-theme-sm font-semibold">Biaya(RP)</label>
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

            {/* User Input Data */}
            <div>
              <label className="text-theme-sm font-semibold mb-1 block">
                Nama Penanggung Jawab
              </label>
            </div>
            <Input
              placeholder="Armin"
              type="string"
              value={responseObject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setResponseObject(e.target.value)
              }
            />

            <div>
              <label className="text-theme-sm font-semibold mb-1 block">
                Keterangan
              </label>
              <textarea
                placeholder="Tulis keterangan pengeluaran..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border px-3 py-4 rounded text-sm resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    isEdit ? handleEditDataExpense() : addExpense();
                  }
                }}
              ></textarea>
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
              type="button"
              onClick={changeModal}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:text-gray-900"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-500"
            >
              {isEdit ? "Edit Data" : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
}
