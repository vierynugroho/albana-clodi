import { IoSettings } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";
import { Customer } from "../../service/customer";
import { useState } from "react";
import { useNavigate } from "react-router";
import SpinnerLoading from "../produk/loading/SpinnerLoading";

type Props = {
  customers: Customer[];
  loading: boolean;
  deleteCustomer?: (id: string) => void;
  editCustomer?: (id: string) => void;
};

export default function TableCustomer({
  customers,
  deleteCustomer,
  loading,
}: Props) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const handleDeleteClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId("");
  };

  const handleConfirmDelete = (id: string) => {
    if (deleteCustomer) {
      deleteCustomer(id);
    }
    handleCloseDeleteModal();
  };

  const handleEdit = (id: string) => {
    navigate(`/customer/edit/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400 w-1"
              >
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kategori
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Telepon
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Alamat
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-end text-theme-xs dark:text-gray-400 "
              >
                <div className="flex justify-end items-center">
                  <IoSettings size={20} />
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {/* Table Body */}
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  <SpinnerLoading />
                </TableCell>
              </TableRow>
            ) : customers && customers.length >= 1 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="py-4 px-3 sm:px-6 text-start text-gray-500">
                    <div className="flex gap-4 justify-around">
                      <img
                        width={24}
                        height={24}
                        src={"/images/user/user-17.jpg"}
                        className="size-9 mt-0 rounded-full"
                      />
                      <section className="flex-1 w-40">
                        {" "}
                        {customer.name}
                      </section>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {customer.category &&
                    customer.category.toLowerCase() === "agent"
                      ? "AGEN"
                      : customer.category}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex gap-2">
                      <FaWhatsapp size={20} className="text-green-600" />
                      {customer.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {customer.address}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex gap-5 justify-end">
                      <CiEdit
                        size={30}
                        className="text-amber-500"
                        onClick={() => handleEdit(customer.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <TiDelete
                        size={30}
                        className="text-red-600"
                        onClick={() => handleDeleteClick(customer.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-4 text-gray-500 dark:text-gray-400 text-center font-bold h-20 text-2xl"
                >
                  Data User Tidak Ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal Delete: Perbaikan agar pointer-events pada modal tetap aktif dan backdrop tidak menghalangi interaksi */}
      {showDeleteModal && (
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{
              zIndex: 100000,
              pointerEvents: "auto",
            }}
            onClick={handleCloseDeleteModal}
          ></div>
          {/* Modal */}
          <div
            className="relative z-[100001] w-full flex justify-center items-center pointer-events-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-6">
                Apakah Anda yakin ingin menghapus customer ini?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseDeleteModal}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-slate-600"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleConfirmDelete(selectedCustomerId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
