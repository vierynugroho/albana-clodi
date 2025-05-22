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
import { ExpenseItem } from "../../service/expense";

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

type Props = {
  expenses: ExpenseItem[];
  setEditExpense: (id: string) => void;
  deleteExpense: (id: string) => void;
};

export default function TablExpense({
  expenses,
  setEditExpense,
  deleteExpense,
}: Props) {
  function toDateOnly(dateString: string): string {
    return new Date(dateString).toISOString().split("T")[0];
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400 w-1"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Tanggal
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Nama pengeluaran
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Harga/Biaya
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                jumlah
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-start text-theme-sm dark:text-gray-400"
              >
                Subtotal
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-semibold  text-gray-500 text-end text-theme-sm dark:text-gray-400 "
              >
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
                  {toDateOnly(expense.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.itemName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.itemPrice}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.qty}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {expense.itemPrice * expense.qty}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
                  <div className="flex gap-5 justify-end">
                    {/* Add action buttons here */}
                    <CiEdit
                      size={30}
                      className="text-amber-500 cursor-pointer"
                      onClick={() => setEditExpense(expense.id)}
                    />
                    <TiDelete
                      size={30}
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteExpense(expense.id)}
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
