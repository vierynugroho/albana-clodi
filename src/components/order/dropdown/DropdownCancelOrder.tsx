import { useEffect, useState } from "react";
import { Dropdown } from "../../ui/dropdown/Dropdown";

import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { cancelOrder } from "../../../service/order/create-order.service";


type Props = {
  orderId: string;
  onSuccess?: () => void; // opsional callback setelah cancel sukses
};

export default function DropdownCancelOrder({ orderId, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
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

  async function handleCancelOrder() {
    if (!orderId) return;

    const confirmCancel = window.confirm("Yakin ingin membatalkan order ini?");
    if (!confirmCancel) return;

    try {
      await cancelOrder(orderId);
      alert("Order berhasil dibatalkan."); 
      onSuccess?.(); 
    } catch (error) {
      console.error("Gagal membatalkan order:", error);
      alert("Terjadi kesalahan saat membatalkan order.");
    } finally {
      closeDropdown();
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
            onClick={handleCancelOrder}
            className="flex items-center gap-2 w-full px-4 py-2 font-medium text-red-500 rounded-lg cursor-pointer group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <IoClose size={20} />
            Cancel Order
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
