import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { IoSettings } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import Button from "../../ui/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { useNavigate } from "react-router";

export default function TableAccountSetting() {
  const navigate = useNavigate();
  const [users] = useState([
    {
      id: 1,
      name: "Risa fatma rosalinda",
      email: "risafatma@gmail.com",
      role: "Owner",
      privilege: "Full Access",
    },
  ]);

  return (
    <div className="mx-2">
      <div className="mb-4 flex justify-end items-center">
        <Button
          className="bg-green-600 hover:bg-green-800"
          onClick={() => {
            navigate("/setting/form_account");
          }}
          startIcon={<TbCirclePlus className="size-5" />}>
          Tambah Pengeluaran
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 w-1">
                  No
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Nama
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Privilege
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-end text-theme-sm dark:text-gray-400">
                  <div className="flex justify-end items-center">
                    <IoSettings size={15} />
                  </div>
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4 px-3 sm:px-6 text-start text-gray-500">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.privilege}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                    <div className="flex gap-5 justify-end">
                      <CiEdit
                        size={30}
                        className="text-amber-500 cursor-pointer"
                      />
                      <TiDelete
                        size={30}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
