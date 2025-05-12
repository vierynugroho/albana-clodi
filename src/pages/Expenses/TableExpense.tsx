import { IoSettings } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
// import { FaWhatsapp } from "react-icons/fa";

// type Customer = {
//   id: string;
//   name: string;
//   category: string;
//   phone: string;
//   address: string;
// };
// type Props = {
//   customers: Customer[];
// };
export default function TablExpense() {
  const expenses = [
    {
      date: "2023-10-01",
      name: "Office Supplies",
      price: 50000,
      quantity: 2,
    },
    {
      date: "2023-10-02",
      name: "Electricity Bill",
      price: 150000,
      quantity: 1,
    },
    {
      date: "2023-10-03",
      name: "Internet Subscription",
      price: 100000,
      quantity: 1,
    },
    {
      date: "2023-10-04",
      name: "Snacks for Meeting",
      price: 20000,
      quantity: 5,
    },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400 w-1">
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Tanggal
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Nama pengeluaran
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Harga/Biaya
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                jumlah
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Subtotal
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-end text-theme-sm dark:text-gray-400 ">
                <div className="flex justify-end items-center">
                  <IoSettings size={15} />
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 px-3 sm:px-6 text-start text-gray-500">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.date}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.price}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.quantity}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.price * expense.quantity}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                  <div className="flex gap-5 justify-end">
                    {/* Add action buttons here */}
                    <CiEdit size={30} className="text-amber-500" />
                    <TiDelete size={30} className="text-red-600" />
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
