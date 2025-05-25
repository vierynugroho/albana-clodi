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
import { CategoryProduct } from "../../../service/product/category";

type Props = {
  categories: CategoryProduct[];
  setModal: (id: string) => void;
  setModalDelete: (id: string) => void;
};
export default function TableCategory({
  categories,
  setModal,
  setModalDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400 w-1"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kategori
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

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="py-4 sm:px-6 text-start text-gray-500 ">
                  <section className="font-medium">{index + 1}</section>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {category.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex gap-5 justify-end">
                    <CiEdit
                      size={30}
                      onClick={() => setModal(category.id)}
                      className="text-amber-500 cursor-pointer"
                    />
                    <TiDelete
                      size={30}
                      className="text-red-600 cursor-pointer"
                      onClick={() => setModalDelete(category.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
