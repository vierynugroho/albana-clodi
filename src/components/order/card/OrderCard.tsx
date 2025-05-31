import { useState } from "react";
import { FaPrint, FaTruck, FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import ModalRiwayatTran from "../modal/ModalRiwayatTran";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { LuPackageCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import DropdownCancelOrder from "../dropdown/DropdownCancelOrder";
import { OrderItem } from "../../../service/order";

type Props = {
  orders: OrderItem[];
};

export default function OrderCard({ orders }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const TrackingProgress = [
    {
      icon: <BiSolidPackage className="text-green-500 w-4 h-4" />,
      status: "pending",
    },
    { icon: <FaTruck className="text-gray-400 w-4 h-4" />, status: "pending" },
    {
      icon: <FaTruckFast className="text-gray-400 w-4 h-4" />,
      status: "pending",
    },
    {
      icon: <LuPackageCheck className="text-gray-400 w-4 h-4" />,
      status: "completed",
    },
  ];

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <p className="text-center text-gray-500">Tidak ada order ditemukan.</p>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <div
          key={order.id}
          className="max-w-full mx-auto mt-4 p-5 bg-white shadow-lg rounded-xl border"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md text-blue-600 font-semibold">#{order.id}</p>
              <p className="text-sm text-gray-400">
                dari <span className="font-semibold text-black">App</span> (
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
                )
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {TrackingProgress.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`p-2 rounded-full border-2 cursor-pointer ${
                      step.status === "completed"
                        ? "border-green-500"
                        : "border-gray-300"
                    } hover:border-green-500 transition duration-300`}
                    title={`Status pengiriman: ${step.status}`}
                  >
                    <span
                      className={
                        step.status === "success"
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {step.icon}
                    </span>
                  </div>
                  {index < TrackingProgress.length - 1 && (
                    <div className="w-10 h-1 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Pemesan & Dikirim */}
            <div className="space-y-3">
              <div>
                <p className="font-normal text-gray-500">Pemesan</p>
                <p className="text-xl font-semibold">
                  {order.OrdererCustomer?.name || "Tidak diketahui"}
                </p>
                <p className="text-sm text-purple-600">
                  {order.OrdererCustomer?.category || "-"}
                </p>
              </div>
              <div>
                <p className="font-normal text-gray-500">Dikirim kepada</p>
                <p className="text-xl font-semibold">
                  {order.DeliveryTargetCustomer?.name || "Tidak diketahui"}
                </p>
                <p className="text-sm text-purple-600">
                  {order.DeliveryTargetCustomer?.category || "-"}
                </p>
              </div>
              <div>
                <p className="font-normal text-gray-500">Catatan</p>
                <p className="text-md font-light text-gray-dark">
                  {order.note || "-"}
                </p>
              </div>
            </div>

            {/* Status Bayar */}
            <div className="space-y-2">
              <div>
                <p className="font-semibold">Status Bayar & Total bayar</p>
                <div className="border rounded-lg p-4 my-2">
                  <p className="text-2xl font-semibold mb-2 mr-2">
                    Rp.{" "}
                    {order.OrderDetail?.finalPrice?.toLocaleString("id-ID") ||
                      "0"}
                  </p>
                  <span className="bg-green-600 text-white text-[11px] px-3 py-1.5 rounded">
                    {order.OrderDetail?.paymentStatus
                      ? order.OrderDetail.paymentStatus
                          .charAt(0)
                          .toUpperCase() +
                        order.OrderDetail.paymentStatus.slice(1).toLowerCase()
                      : "Tidak diketahui"}
                  </span>
                  <span className="bg-gray-600 text-white text-[11px] ml-2 px-2 py-1.5 rounded">
                    {order.OrderDetail?.PaymentMethod?.name ||
                      "Metode tidak diketahui"}{" "}
                    (
                    {order.OrderDetail?.paymentDate
                      ? new Date(order.OrderDetail.paymentDate).toLocaleString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-"}
                    )
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowModal(true);
                    }}
                    className="text-blue-700 text-md font-bold cursor-pointer mt-5 hover:underline flex items-center"
                  >
                    Lihat Riwayat
                    <IoIosArrowForward className="mx-1 font-bold" />
                  </button>
                </div>

                {showModal && selectedOrderId && (
                  <ModalRiwayatTran
                    changeModal={() => {
                      setShowModal(false);
                      setSelectedOrderId(null);
                    }}
                    orderId={selectedOrderId}
                  />
                )}
              </div>

              {/* Kurir */}
              <p className="font-semibold my-2">Kurir</p>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-4 rounded">
                    <FaTruck className="text-blue-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      {order.ShippingServices?.[0]?.shippingService ||
                        "Belum tersedia"}
                    </p>

                    <p className="text-md text-gray-500">Resi: -</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Produk */}
            <div className="mt-6 ml-2">
              <p className="font-semibold text-gray-500 text-sm">
                Produk (total {order.OrderDetail?.OrderProducts?.length || 0}{" "}
                item)
              </p>
              {order.OrderDetail?.OrderProducts?.length > 0 ? (
                <ul className="mt-1 text-blue-700 font-semibold space-y-1">
                  {order.OrderDetail.OrderProducts.map((op) => (
                    <li key={op.id}>
                      <Link
                        to={`/produk/detail_produk/${op.Product?.id}`}
                        className="text-blue-700 hover:underline"
                      >
                        {op.Product?.name || "Produk tidak ditemukan"} (
                        {op.productQty}x)
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">Tidak ada produk</p>
              )}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Actions */}
          <div className="mt-6 flex justify-between gap-2">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id={`check-${order.id}`}
                className="w-6 h-10 mr-2 border-blue-600 rounded-full"
              />
              <Link to={`/order/print-label/${order.id}`}>
              <button className="flex items-center gap-2 border border-blue-600 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-100 text-sm">
                <FaPrint /> Print
              </button>
              </Link>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Update Resi
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                Tandai diterima
              </button>
              <div className="flex gap-2">
                <Link to={`/order/edit_order/${order.id}`}>
                  <button className="flex items-center gap-2 border border-blue-600 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-100 text-sm">
                    <FaEdit /> Edit Order
                  </button>
                </Link>
                <DropdownCancelOrder orderId={order.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
