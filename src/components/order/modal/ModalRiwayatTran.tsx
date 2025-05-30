/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { getOrderById, OrderItem } from "../../../service/order";

type Props = {
  changeModal: () => void;
  orderId: string;
};

export default function ModalRiwayatTran({ changeModal, orderId }: Props) {
  const [orderDetail, setOrderDetail] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      const result = await getOrderById(orderId);
      setLoading(false);

      if (result.success) {
        setOrderDetail((result.responseObject as unknown as OrderItem) ?? null);
      } else {
        setError(result.message);
      }
    }

    fetchData();
  }, [orderId]);

  const paymentHistory = orderDetail;

  return ReactDOM.createPortal(
    <div className="fixed z-[100000] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center max-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
        <div className="inline-block align-bottom bg-white rounded-lg px-7 pt-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-black mb-2">
              Riwayat Transaksi
            </h2>
            <button
              onClick={changeModal}
              className="text-gray-400 hover:text-gray-700"
              aria-label="Close modal"
            >
              <IoIosCloseCircleOutline size={30} />
            </button>
          </div>

          <hr className="pt-0 pb-3 border-gray-300 dark:border-gray-700" />

          {loading && <p className="mb-5">Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading &&
            !error &&
            paymentHistory &&
            paymentHistory.length > 0 && (
              <div className="space-y-3 mb-7">
                <Table>
                  <TableHeader className="border-b border-gray-100 bg-gray-200 dark:bg-black dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-2 py-2 font-semibold text-black text-start text-theme-md dark:text-gray-400"
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-2 py-2 font-semibold text-black text-start text-theme-md dark:text-gray-400"
                      >
                        Bank
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-2 py-2 font-semibold text-black text-start text-theme-md dark:text-gray-400"
                      >
                        Nominal
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-2 py-2 font-semibold text-black text-start text-theme-md dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {paymentHistory.map(
                      (
                        item: {
                          updatedAt: string | number | Date;
                          bankName:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactPortal
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          accountNumber:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactPortal
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          nominal: number | bigint;
                          status:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactPortal
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                        },
                        index: Key | null | undefined
                      ) => (
                        <TableRow key={index}>
                          <TableCell className="px-2 py-4 text-black text-start text-theme-md dark:text-gray-400">
                            {new Date(item.updatedAt)
                              .toISOString()
                              .slice(0, 10)}
                          </TableCell>
                          <TableCell className="px-2 py-4 text-black text-start text-theme-md dark:text-gray-400">
                            {item.bankName}-{item.accountNumber}
                          </TableCell>
                          <TableCell className="px-2 py-4 text-black text-start text-theme-md dark:text-gray-400">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(item.nominal)}
                          </TableCell>
                          <TableCell className="px-2 py-4 text-black text-start text-theme-md dark:text-gray-400">
                            <span className="bg-green-500 text-white text-theme-sm px-3 py-1.5 rounded-2xl">
                              {item.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

          {!loading &&
            !error &&
            paymentHistory &&
            paymentHistory.length === 0 && (
              <p className="text-center text-gray-500 mb-5">
                Detail Riwayat Transaksi Tidak Ditemukan
              </p>
            )}
        </div>
      </div>
    </div>,
    document.body
  );
}
