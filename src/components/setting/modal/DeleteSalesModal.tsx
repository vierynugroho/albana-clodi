import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { deleteSales } from "../../../service/shopSetting/sales";

type DeleteModalProps = {
  id: string;
  changeModal: () => void;
  refreshData: () => void;
};

export default function DeleteSalesModal({
  id,
  changeModal,
  refreshData,
}: DeleteModalProps) {
  async function handleDeleteSales(id: string) {
    const result = await deleteSales(id);
    if (result.success) {
      toast.success(result.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    } else {
      toast.success("Gagal Menghapus Data", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }
    refreshData();
    changeModal();
  }

  return ReactDOM.createPortal(
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
      }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      onClick={changeModal}
    >
      <div
        className="bg-white rounded-2xl px-6 pt-6 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        style={{ zIndex: 100001 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4h.01m-6.938 4h13.856c.982 0 1.789-.896 1.789-2V6c0-1.104-.807-2-1.789-2H5.062C4.08 4 3.273 4.896 3.273 6v12c0 1.104.807 2 1.789 2z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg leading-6 font-semibold text-gray-900">
            Yakin ingin menghapus Data ini?
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
              onClick={() => handleDeleteSales(id)}
            >
              Hapus Sales
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-150 ease-in-out sm:text-sm"
              onClick={changeModal}
            >
              Batal
            </button>
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
