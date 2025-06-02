import { IoSettings } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { DeliveryPlace } from "../../../service/DeliveryPlace";
import { useState } from "react";
import DeleteSupplierModal from "../modal/DeleteSupplierModal";
import { useNavigate } from "react-router";

type Props = {
  deliveries: DeliveryPlace[];
  refresData: () => void;
};

export default function TableDelivery({ deliveries, refresData }: Props) {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 w-1"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Nama Toko
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Asal Pengiriman
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                No. Telepon
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Alamat
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-500 text-end text-theme-sm dark:text-gray-400"
              >
                <div className="flex justify-end items-center">
                  <IoSettings size={15} />
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {deliveries.map((delivery, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 px-3 sm:px-6 text-start text-gray-500">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {delivery.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {delivery.address}, {delivery.subdistrict}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {delivery.phoneNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  -
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                  <div className="flex gap-5 justify-end">
                    <CiEdit
                      size={30}
                      className="text-amber-500 cursor-pointer"
                      onClick={() => {
                        navigate(`/setting/form_supplier/${delivery.id}`);
                      }}
                    />
                    <TiDelete
                      size={30}
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        setId(delivery.id);
                        setModalDelete(true);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {modalDelete && (
            <DeleteSupplierModal
              id={id}
              changeModal={() => {
                setModalDelete(false);
              }}
              refreshData={refresData}
            />
          )}
        </Table>
      </div>
    </div>
  );
}
