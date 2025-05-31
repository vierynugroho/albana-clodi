import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import {
  CreateBank,
  createBankPayment,
  editBankPayment,
  getDetailBankPayment,
} from "../../../service/shopSetting/payment";
import toast from "react-hot-toast";

type Option = {
  value: string;
  label: string;
};

type Props = {
  changeModal: () => void;
  isEdit?: boolean;
  id?: string;
  refreshData: () => void;
};

const optionBank: Option[] = [
  { value: "BCA", label: "Bank Central Asia" },
  { value: "BNI", label: "Bank Negara Indonesia" },
  { value: "BRI", label: "Bank Rakyat Indonesia" },
  { value: "Mandiri", label: "Bank Mandiri" },
];

export default function BankModalForm({ changeModal, id, refreshData }: Props) {
  const [bank, setBank] = useState<string | null>("");
  const [bankBranch, setBankBranch] = useState<string | null>("");
  const [accountNumber, setaccountNumber] = useState<string | null>("");
  const [name, setName] = useState<string>("");

  function handleChangeBank(value: string) {
    setBank(value);
  }

  async function handleSubmit() {
    const payload: CreateBank = {
      name: name,
      bankName: bank,
      bankBranch: bankBranch,
      accountNumber: accountNumber,
    };

    const createBankAccount = await createBankPayment(payload);
    if (createBankAccount.success) {
      toast.success(createBankAccount.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    } else {
      toast.error("Gagal Membuat Payment Pembayaran", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      console.error(createBankAccount.message);
    }

    changeModal();
    refreshData();
  }

  async function handleEdit() {
    const payload: CreateBank = {
      name: name,
      bankName: bank,
      bankBranch: bankBranch,
      accountNumber: accountNumber,
    };
    if (id) {
      const editBankAccount = await editBankPayment(id, payload);
      if (editBankAccount.success) {
        toast.success(editBankAccount.message, {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      } else {
        toast.error("Gagal Memperbarui Payment Pembayaran", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
        console.error(editBankAccount.message);
      }
    }

    changeModal();
    refreshData();
  }

  useEffect(() => {
    if (id) {
      const getDetailPaymentMethod = async () => {
        const result = await getDetailBankPayment(id);
        if (result.success) {
          setBank(result.responseObject.bankName);
          setBankBranch(result.responseObject.bankBranch);
          setaccountNumber(result.responseObject.accountNumber);
          setName(result.responseObject.name);
        }
      };
      getDetailPaymentMethod();
    }
  }, [id]);

  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {id ? "Edit Metode Pembayar" : "Tambah Pengeluaran"}
            </h2>
            <button
              onClick={changeModal}
              className="text-gray-400 hover:text-gray-700"
            >
              <IoIosCloseCircleOutline size={27} />
            </button>
          </div>
          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          <div className="flex flex-wrap gap-4">
            <div className="flex-1/3 gap-4">
              <div>
                <p className="text-theme-sm font-medium mb-1">Nama Bank</p>
                <Select
                  placeholder="Pilih Bank"
                  defaultValue={bank ? bank : ""}
                  options={optionBank}
                  onChange={handleChangeBank}
                ></Select>
              </div>

              <div className="mt-2">
                <label className="text-theme-sm font-semibold">
                  Nama Cabang
                </label>
                <Input
                  placeholder="BCA BLITAR"
                  type="text"
                  value={bankBranch ? bankBranch : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankBranch(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex-1/2 gap-4 ">
              <div>
                <label className="text-theme-sm font-semibold">
                  Nomor Rekening
                </label>
                <Input
                  placeholder="990123"
                  type="string"
                  value={accountNumber ? accountNumber : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setaccountNumber(e.target.value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="text-theme-sm font-semibold mb-1 block">
                  Atas Nama
                </label>
                <Input
                  placeholder="Armin"
                  type="string"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
            </div>
            <hr className="py-2 border-gray-300 dark:border-gray-700" />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={changeModal}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:text-gray-900"
            >
              Batal
            </button>
            <button
              onClick={() => (id ? handleEdit() : handleSubmit())}
              className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-500"
            >
              {id ? "Edit Data" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
