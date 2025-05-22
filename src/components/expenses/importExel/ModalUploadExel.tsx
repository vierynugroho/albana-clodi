import ReactDOM from "react-dom";
import DropzoneFileExel from "./DropzoneFileExel";
import { importExel } from "../../../service/expense";
import { useState } from "react";

type Props = {
  changeModal: () => void;
};

export default function ModalUploadExel({ changeModal }: Props) {
  const [file, setFiles] = useState<File | null>(null);
  async function uploadExpensesExel() {
    if (!file) {
      console.error("Tidak ada file yang dipilih.");
      return;
    }

    try {
      const result = await importExel(file);
      if (result.success) {
        console.log("Import berhasil:", result.message);
        changeModal();
      } else {
        console.error(
          "Import gagal:",
          result.message || "Terjadi kesalahan saat mengimpor file."
        );
      }
    } catch (error) {
      console.error("Terjadi error saat mengimpor file:", error);
    }
  }
  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="flex-1 mt-3 text-center sm:mt-0 sm:text-left">
              <DropzoneFileExel file={file} setFiles={setFiles} />
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-brand-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-brand-300 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={uploadExpensesExel}
              >
                Tambah Pengeluaran
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={changeModal}
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
