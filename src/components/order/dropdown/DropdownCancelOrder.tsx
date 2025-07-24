import { useEffect, useState } from "react";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { cancelOrder } from "../../../service/order/order.service";
import toast from "react-hot-toast";

type Props = {
  orderId: string;
  onSuccess?: () => void; // opsional callback setelah cancel sukses
};

export default function DropdownCancelOrder({ orderId, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function openModal() {
    setShowModal(true);
    closeDropdown();
  }

  function closeModal() {
    setShowModal(false);
  }

  async function handleCancelOrder() {
    if (!orderId) return;
    const toastId = toast.loading("Membatalkan order...");
    try {
      await cancelOrder(orderId);
      toast.success("Order berhasil dibatalkan.", { id: toastId });
      onSuccess?.();
    } catch (error) {
      console.error("Gagal membatalkan order:", error);
      toast.error("Terjadi kesalahan saat membatalkan order.", { id: toastId });
    } finally {
      toast.dismiss(toastId);
      closeModal();
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border border-blue-600 py-2.5 px-2 rounded-lg text-blue-600"
      >
        <IoIosArrowDown />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="cursor-pointer absolute right-0 mt-2 flex w-[150px] flex-col rounded-2xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col items-center justify-center border-gray-200 dark:border-gray-800">
          <li
            onClick={openModal}
            className="flex items-center gap-2 w-full px-4 py-2 font-medium text-red-500 rounded-lg cursor-pointer group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <IoClose size={20} />
            Cancel Order
          </li>
        </ul>
      </Dropdown>

      {/* Modal Konfirmasi Batalkan Order */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Konfirmasi Pembatalan
              </h2>
              <p className="mb-6 text-center text-gray-700">
                Yakin ingin membatalkan order ini?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                  onClick={handleCancelOrder}
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
