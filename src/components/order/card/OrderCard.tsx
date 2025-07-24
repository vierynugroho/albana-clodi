import { useState } from "react";
import { FaPrint, FaTruck, FaEdit } from "react-icons/fa";
import ModalRiwayatTran from "../modal/ModalRiwayatTran";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { LuPackageCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { OrderItem } from "../../../service/order";
import { cancelOrder } from "../../../service/order/order.service";
import { IoBagHandleOutline, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  orders: OrderItem[];
  onOrderCancelled?: () => void;
  selectedOrderIds?: string[];
  onToggleSelect?: (orderId: string) => void;
  variant?: "default" | "cancel";
};

export default function OrderCard({
  orders,
  selectedOrderIds,
  onToggleSelect,
  variant = "default",
  onOrderCancelled,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Tracking progress seharusnya dinamis, tapi untuk sekarang tetap statis
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

  const handleCancelOrder = (orderId: string) => {
    setOrderIdToCancel(orderId);
    setShowCancelModal(true);
  };

  // Modal Konfirmasi Batalkan Order
  const confirmCancelOrder = async () => {
    if (!orderIdToCancel) return;
    const toastId = toast.loading("Membatalkan order...");

    try {
      await cancelOrder(orderIdToCancel);
      toast.success("Order berhasil dibatalkan.", { id: toastId });
      if (onOrderCancelled) onOrderCancelled();
      else window.location.reload();
    } catch (error) {
      console.error("Gagal membatalkan order:", error);
      toast.error("Gagal membatalkan order.", { id: toastId });
    } finally {
      toast.dismiss(toastId);
      setShowCancelModal(false);
      setOrderIdToCancel(null);
    }
  };

  // Modal Batalkan Order - Diperbaiki agar lebih rapi dan responsif
  const CancelOrderModal = () =>
    showCancelModal ? (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        onClick={() => {
          setShowCancelModal(false);
          setOrderIdToCancel(null);
        }}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-0"
          style={{ zIndex: 100001 }}
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Konfirmasi Pembatalan
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600 transition"
              onClick={() => {
                setShowCancelModal(false);
                setOrderIdToCancel(null);
              }}
              aria-label="Tutup"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {/* Body */}
          <div className="px-6 pt-4 pb-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-7 w-7 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-base text-gray-700 text-center mb-2">
                Yakin ingin membatalkan order ini?
              </p>
              <p className="text-sm text-gray-500 text-center mb-6">
                Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
                onClick={() => {
                  setShowCancelModal(false);
                  setOrderIdToCancel(null);
                }}
              >
                Batal
              </button>
              <button
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                onClick={confirmCancelOrder}
              >
                Ya, Batalkan
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  // Handler for "Hapus Order" button
  const handleDeleteOrder = () => {
    toast.loading("Fitur Belum Tersedia", { icon: "⏳" });
  };

  return (
    <>
      {showCancelModal && <CancelOrderModal />}
      {orders.map((order) => (
        <div
          key={order.id}
          className="max-w-full mx-auto mt-4 p-5 bg-white dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 shadow-lg rounded-xl border"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md text-blue-600 font-semibold">
                #{order.OrderDetail?.code || "-"}
              </p>
              <p className="text-sm text-gray-400">
                dari{" "}
                <span className="font-semibold text-black">
                  {order.SalesChannel?.name || "-"}
                </span>{" "}
                (
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString("id-ID", {
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

          <hr className="my-4 border-gray-300 dark:border-gray-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Pemesan & Dikirim */}
            <div className="space-y-3">
              <div>
                <p className="font-normal text-gray-500">Pemesan</p>
                <p className="text-xl font-semibold">
                  {order.OrdererCustomer?.name || "Tidak diketahui"}
                </p>
                <p className="text-sm text-purple-600">
                  {order.OrdererCustomer?.category &&
                  order.OrdererCustomer.category.toLowerCase() === "agent"
                    ? "AGEN"
                    : order.OrdererCustomer?.category || "-"}
                </p>
              </div>
              <div>
                <p className="font-normal text-gray-500">Dikirim kepada</p>
                <p className="text-xl font-semibold">
                  {order.DeliveryTargetCustomer?.name || "Tidak diketahui"}
                </p>
                <p className="text-sm text-purple-600">
                  {order.DeliveryTargetCustomer?.category &&
                  order.DeliveryTargetCustomer.category.toLowerCase() ===
                    "agent"
                    ? "AGEN"
                    : order.DeliveryTargetCustomer?.category || "-"}
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
                <div className="border dark:border-gray-500 rounded-lg p-4 my-2">
                  <p className="text-2xl font-semibold mb-2 mr-2">
                    Rp.{" "}
                    {order.OrderDetail?.finalPrice?.toLocaleString("id-ID") ||
                      "0"}
                  </p>
                  <span
                    className={`text-white text-[11px] px-3 py-1.5 rounded ${
                      order.OrderDetail?.paymentStatus?.toLowerCase() ===
                      "cancel"
                        ? "bg-red-600"
                        : order.OrderDetail?.paymentStatus?.toLowerCase() ===
                          "pending"
                        ? "bg-yellow-500"
                        : order.OrderDetail?.paymentStatus?.toLowerCase() ===
                          "installments"
                        ? "bg-orange-600"
                        : "bg-green-600"
                    }`}
                  >
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
                  {/* <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowModal(true);
                    }}
                    className="text-blue-700 text-md font-bold cursor-pointer mt-5 hover:underline flex items-center"
                  >
                    Lihat Riwayat
                    <IoIosArrowForward className="mx-1 font-bold" />
                  </button> */}
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
              <div className="border dark:border-gray-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:border-gray-800 dark:bg-white/[0.03] p-4 rounded">
                    <FaTruck className="text-blue-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      {order.ShippingServices?.[0]?.shippingService ||
                        "Belum tersedia"}
                    </p>

                    <p className="text-md text-gray-500">
                      Resi: {order.OrderDetail?.receiptNumber || "-"}
                    </p>
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

          <hr className="my-6 border-gray-300 dark:border-gray-500" />

          {/* Actions */}
          {variant === "default" ? (
            <div className="mt-6 flex justify-between gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={(selectedOrderIds ?? []).includes(order.id)}
                  onChange={() => onToggleSelect?.(order.id)}
                  className="w-5 h-5"
                />
                <Link to={`/order/print-label?ids=${order.id}`}>
                  <button className="flex items-center gap-2 border border-blue-600 dark:hover:bg-white/[0.03] px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-100 text-sm">
                    <FaPrint /> Print
                  </button>
                </Link>
              </div>

              <div className="flex gap-2">
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Update Resi
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                Tandai diterima
              </button> */}
                <Link to={`/order/edit_order/${order.id}`}>
                  <button className="flex items-center w-full gap-2 border border-blue-600 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-100  dark:hover:bg-white/[0.03] text-sm">
                    <FaEdit /> Edit Order
                  </button>
                </Link>
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="flex items-center border border-red-600 gap-2 px-4 py-2 font-medium text-red-600 rounded-lg cursor-pointer group text-sm hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-white/[0.03] dark:hover:text-red-300"
                >
                  <IoClose size={20} />
                  Batalkan Order
                </button>
                <div className="flex gap-2">
                  {/* <DropdownCancelOrder orderId={order.id} /> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex justify-end gap-2">
              <div className="flex gap-2">
                <button
                  className="flex items-center bg-red-600 border-red-600 gap-2 border px-4 py-3 rounded-lg text-white text-sm"
                  onClick={handleDeleteOrder}
                >
                  <MdDeleteForever />
                  Hapus Order
                </button>
                {/* <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 text-black bg-gray-100 px-4 py-3 border border-black rounded-lg text-sm"
                >
                  <IoDocumentTextOutline />
                  Payment Detail
                </button> */}
                <div className="flex gap-2">
                  <button
                    className="flex items-center bg-green-600 border-green-600 gap-2 border px-4 py-3 rounded-lg text-white text-sm"
                    onClick={() =>
                      toast.loading("Fitur Belum Tersedia", { icon: "⏳" })
                    }
                  >
                    <IoBagHandleOutline /> Kembalikan Orderan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
