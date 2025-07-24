import { useEffect, useState, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal for accessibility
  useEffect(() => {
    if (!showModal) return;
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    if (!modal) return;
    const firstFocusable =
      modal.querySelectorAll<HTMLElement>(focusableElements)[0];
    firstFocusable?.focus();
  }, [showModal]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function openModal() {
    setShowModal(true);
    closeDropdown();
  }

  function closeModal() {
    if (!loading) setShowModal(false);
  }

  async function handleCancelOrder() {
    if (!orderId) return;
    setLoading(true);
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
      setLoading(false);
      setShowModal(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border border-blue-600 py-2.5 px-2 rounded-lg text-blue-600"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Opsi Order"
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
            tabIndex={0}
            role="menuitem"
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
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            overflowY: "auto",
          }}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          onClick={loading ? undefined : closeModal}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl px-6 pt-6 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            style={{ zIndex: 100001, position: "relative" }}
            onClick={(e) => e.stopPropagation()}
            role="document"
            tabIndex={0}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
                <IoClose className="h-6 w-6 text-red-600" size={24} />
              </div>
              <h3 className="mt-4 text-lg leading-6 font-semibold text-gray-900">
                Yakin ingin membatalkan order ini?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <div className="mt-6 sm:mt-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-700 text-base font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out sm:text-sm"
                  onClick={handleCancelOrder}
                  disabled={loading}
                  autoFocus
                >
                  {loading ? "Membatalkan..." : "Ya, Batalkan"}
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Batal
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
