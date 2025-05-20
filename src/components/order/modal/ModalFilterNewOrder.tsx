import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
// import Label from "../form/Label";

// import Label from "../form/Label";

interface ModalFilterNewOrderProps {
  isOpen: boolean;
  openModa: () => void;
  closeModal: () => void;
}

export default function ModalFilterNewOrder({
  isOpen,
  openModa,
  closeModal,
}: ModalFilterNewOrderProps) {
  const { openModal } = useModal();

  const handleFilter = () => {
    // Handle filter logic here
    console.log("Applying filter...");
    closeModal();
  };

  const handleReset = () => {
    // Handle reset logic here
    console.log("Resetting filter...");
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[1000px] m-2">
        <div className="no-scrollbar relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <div className="mr-4 flex items-center justify-between">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Filter
              </h4>
              <button
                onClick={() => closeModal()}
                className="text-blue-700 font-semibold">
                Reset filter
              </button>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-700" />
          </div>
          <div className="custom-scrollbar py-2 overflow-y-auto px-2 pb-3 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <h5 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Keterangan
              </h5>
              <select className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                {[
                  { value: "all", label: "Semua Status" },
                  { value: "waiting-payment", label: "Menunggu Pembayaran" },
                  { value: "confirmed", label: "Konfirmasi" },
                ].map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h5 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Kategori Pemesan
              </h5>
              <select className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                {[
                  { value: "all", label: "Semua Kategori Pemesan" },
                  { value: "reseller", label: "Reseller (Member Login)" },
                  { value: "end-customer", label: "End Customer" },
                ].map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h5 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Kanal Penjualan
              </h5>
              <select className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                <option value="all">Semua Sales Channel</option>
                {[
                  { value: "privor", label: "Privor" },
                  { value: "storefront", label: "Storefront" },
                  { value: "quick-order", label: "Quick Order" },
                  { value: "shopee", label: "Shopee" },
                  { value: "bukalapak", label: "Bukalapak" },
                  { value: "tokopedia", label: "Tokopedia" },
                  { value: "lazada", label: "Lazada" },
                  { value: "tiktok-shop", label: "TikTok Shop" },
                  { value: "bestforless", label: "BestforLess" },
                ].map((channel) => (
                  <option key={channel.value} value={channel.value}>
                    {channel.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="my-2 mx-5 border-gray-300 dark:border-gray-700" />
          <div className="flex items-center justify-start gap-3 px-2 mt-6">
            <Button size="sm" variant="outline" onClick={handleReset}>
              Kembali
            </Button>
            <Button size="sm" onClick={handleFilter}>
              Gunakan Filter
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
