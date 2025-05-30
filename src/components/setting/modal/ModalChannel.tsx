import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "../../form/input/InputField";
import Switch from "../../form/switch/Switch";
import { createSales } from "../../../service/shopSetting/sales";
import toast from "react-hot-toast";
type Props = {
  changeModal: () => void;
  id?: string;
  refreshData: () => void;
};

export default function ModalChannel({ changeModal, refreshData, id }: Props) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function handleAddSales() {
    const payload = {
      name: name,
      isActive: isActive,
    };
    const result = await createSales(payload);
    if (result.success) {
      toast.success(result.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      changeModal();
      refreshData();
    } else {
      toast.error("Gagal Membuat Sales", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }
  }

  // async function addChannel() {
  //   if (name.trim() === "") return;
  //   changeModal();
  // }

  async function handleEditChannel() {
    changeModal();
  }

  useEffect(() => {
    if (id) {
      console.log(id);
    }
  }, [id]);

  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {id ? "Edit Channel" : "Tambah Channel"}
            </h2>
            <button
              onClick={changeModal}
              className="text-gray-400 hover:text-gray-700"
            >
              <IoIosCloseCircleOutline size={27} />
            </button>
          </div>
          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="w-full">
                <p className="text-theme-sm font-medium mb-1">Nama Channel</p>
                {id ? (
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option value="Shopedia">Shopedia</option>
                    <option value="Bukalapak">Bukalapak</option>
                    <option value="Zilingo">Zilingo</option>
                    <option value="Lazada">Lazada</option>
                    <option value="JD.ID">JD.ID</option>
                    <option value="Zalora">Zalora</option>
                    <option value="Blibli">Blibli</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Offline Store">Offline Store</option>
                    <option value="Website Live">Website Live</option>
                  </select>
                ) : (
                  <Input
                    placeholder="Masukkan nama channel..."
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-theme-sm font-medium">
                Status sales Channel:
              </label>
              <Switch
                label={isActive ? "Active" : "Inactive"}
                defaultChecked={isActive}
                onChange={(checked) => setIsActive(checked)}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={changeModal}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-gray-900"
            >
              Batal
            </button>
            <button
              onClick={id ? handleEditChannel : handleAddSales}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500"
            >
              {id ? "Simpan Perubahan" : "Tambah Channel"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
