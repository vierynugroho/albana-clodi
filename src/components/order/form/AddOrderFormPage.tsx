import PageMeta from "../../common/PageMeta.tsx";
import OrderPageBreadcrumb from "../../../pages/Order/OrderPageBreadcrumb.tsx";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Select from "../../form/Select.tsx";
import DatePicker from "../../form/date-picker.tsx";
import TableAddOrder from "../table/TableAddOrder.tsx";
import Button from "../../ui/button/Button.tsx";
import { IoIosSave } from "react-icons/io";
import { useState } from "react";
import ModalAddCustomer from "../modal/ModalAddcustomer.tsx";
import AsyncSelect from "react-select/async";
import {
  OrderPayload,
  PaymentMethod,
  SalesChannel,
  TCustomer,
  TDeliveryPlace,
} from "../../../service/order/create-order.type.ts";
import { OptionProps } from "react-select";
import {
  fetchCustomers,
  fetchDeliveryPlace,
  fetchPayments,
  fetchSalesChannels,
  postOrder,
} from "../../../service/order/create-order.service.ts";
import { FaSpinner } from "react-icons/fa";

const CustomOption = (props: OptionProps<{ customer: TCustomer }, false>) => {
  const { data, innerRef, innerProps, isFocused } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`p-3 cursor-pointer ${isFocused ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
        }`}
    >
      <div className="font-semibold">{data.customer.name}</div>
      <div className="text-sm text-gray-500">{data.customer.address}</div>
    </div>
  );
};

const DeliveryOption = (
  props: OptionProps<{ place: TDeliveryPlace }, false>
) => {
  const { data, innerRef, innerProps, isFocused } = props;
  console.log("DeliveryOption data:", data);
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`p-3 cursor-pointer ${isFocused ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
        }`}
    >
      <div className="font-semibold">{data.place.name}</div>
      <div className="text-sm text-gray-500">{data.place.address}</div>
    </div>
  );
};

export default function AddOrderFomPage() {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [selectedPemesan, setSelectedPemesan] = useState<TCustomer | null>(
    null
  );
  const [isEditingPemesan, setisEditingPemesan] = useState(true);
  const [selectedPenerima, setSelectedPenerima] = useState<TCustomer | null>(
    null
  );
  const [isEditingPenerima, setisEditingPenerima] = useState(true);
  const [selectedDeliveryPlace, setSelectedDeliveryPlace] =
    useState<TDeliveryPlace | null>(null);
  const [selectedSalesChannel, setSelectedSalesChannel] =
    useState<SalesChannel | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | null
  >(null);

  const handleEditPemesan = () => {
    setisEditingPemesan(true);
  };
  const handleEditPenerima = () => {
    setisEditingPenerima(true);
  };

  const paymentOptions = [
    { value: "PENDING", label: "Belum Bayar" },
    { value: "ST", label: "Cicilan" },
    { value: "lunas", label: "Sudah Bayar(Lunas)" },
  ];

  function handleSelectChange(field: string, value: string): void {
    // Implement your logic here, e.g., update state based on field
    console.log(`Field: ${field}, Value: ${value}`);
  }

  const [loading, setLoading] = useState(false);
  const [orderProducts, setOrderProducts] = useState<
    { productId: string; productVariantId: string; productQty: number }[]
  >([]);

  type ShippingCostType = { shippingService?: string; cost?: number; type?: string } | undefined;
  const [shippingCost, setShippingCost] = useState<ShippingCostType>(undefined);

  const handleSubmit = async () => {
    setLoading(true);
    const payload: OrderPayload = {
      order: {
        ordererCustomerId: selectedPemesan?.id || "",
        deliveryTargetCustomerId: selectedPenerima?.id || "",
        deliveryPlaceId: selectedDeliveryPlace?.id !== undefined ? String(selectedDeliveryPlace.id) : "",
        salesChannelId: selectedSalesChannel?.id || "",
        orderDate: orderDate ? orderDate.toISOString() : "",
        note: note,
      },
      orderDetail: {
        detail: {
          otherFees: {
            // packaging: 5000,
            insurance: 10000,
            weight: 1000,
            shippingCost: shippingCost,
            discount: {
              value: 10,
              type: "percent",
            },
          },
        },
        paymentMethod: {
          id: selectedPaymentMethod?.id || "",
          status: "PENDING",
          date: new Date().toISOString(),
        },
        orderProducts: orderProducts,
      },
    };

    try {
      const res = await postOrder(payload);
      // setSuccessMsg("Order berhasil dibuat!");
      console.log("Order response:", res);
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <OrderPageBreadcrumb pageTitle="Tambah Order" />
      <hr className="border-1 border-gray-200" />

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form kiri */}
          <ComponentCard
            title="Informasi Order"
            className="max-w-full md:max-h-7/12"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="namaPemesan" className="font-semibold text-md">
                  Nama Pemesan
                </Label>
                <div className="w-full">
                  {isEditingPemesan ? (
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={fetchCustomers}
                      onChange={(
                        selectedOption: { customer: TCustomer } | null
                      ) => {
                        setSelectedPemesan(selectedOption?.customer || null);
                        setisEditingPemesan(false);
                      }}
                      placeholder="Cari Pemesan"
                      className="w-full"
                      components={{
                        Option: CustomOption,
                      }}
                    />
                  ) : selectedPemesan ? (
                    <div className="flex justify-between items-center px-3 py-2 border rounded-md bg-white">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {selectedPemesan.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedPemesan.address}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-blue-500 underline ml-4"
                        onClick={handleEditPemesan}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="dikirimKepada"
                  className="font-semibold text-md"
                >
                  Dikirim Kepada
                </Label>
                <div className="w-full">
                  {isEditingPenerima ? (
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={fetchCustomers}
                      onChange={(
                        selectedOption: { customer: TCustomer } | null
                      ) => {
                        setSelectedPenerima(selectedOption?.customer || null);
                        setisEditingPenerima(false);
                      }}
                      placeholder="Cari Penerima"
                      className="w-full"
                      components={{
                        Option: CustomOption,
                      }}
                    />
                  ) : selectedPenerima ? (
                    <div className="flex justify-between items-center px-3 py-2 border rounded-md bg-white">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {selectedPenerima.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedPenerima.address}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-blue-500 underline ml-4"
                        onClick={handleEditPenerima}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              {showModal && (
                <ModalAddCustomer changeModal={() => setShowModal(false)} />
              )}

              <div className="relative">
                <Label
                  htmlFor="pengirimanDari"
                  className="font-semibold text-md"
                >
                  Pengiriman Dari
                </Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={fetchDeliveryPlace}
                  onChange={(selectedOption) =>
                    setSelectedDeliveryPlace(
                      selectedOption ? selectedOption.place : null
                    )
                  }
                  placeholder="Cari Lokasi Pengiriman"
                  className="w-full"
                  components={{
                    Option: DeliveryOption,
                  }}
                />
              </div>

              <div>
                <DatePicker
                  id="date-picker"
                  label="Tanggal Order"
                  placeholder="Select a date"
                  onChange={(dates) => {
                    if (Array.isArray(dates)) {
                      setOrderDate(dates[0] || null);
                    } else {
                      setOrderDate(dates);
                    }
                  }}
                />
              </div>

              <div className="relative">
                <Label
                  htmlFor="pengirimanDari"
                  className="font-semibold text-md"
                >
                  Sales Channels
                </Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={fetchSalesChannels}
                  placeholder="Pilih sales channels"
                  className="w-full"
                  onChange={(option) => {
                    setSelectedSalesChannel(option ? option.channel : null);
                  }}
                />
              </div>

              <div>
                <label htmlFor="note" className="font-semibold text-md">Catatan</label>
                <textarea
                  id="note"
                  className="input h-30 w-full border border-gray-400 rounded-lg bg-gray-100"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Add To Print Label
                  </label>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Detail Order */}
          <div className="md:col-span-2 space-y-6">
            <TableAddOrder
              shipperDestinationId={
                selectedPenerima?.destinationId ?? undefined
              }
              receiverDestinationId={
                selectedDeliveryPlace?.destinationId ?? undefined
              }
              onChange={(data) => {
                setOrderProducts(data.orderProducts);
                setShippingCost(data.shippingCost); 
              }}
            />

            {/* Status Pembayaran */}
            <ComponentCard title="Pembayaran">
              <div className="relative">
                <Label
                  htmlFor="pengirimanDari"
                  className="font-semibold text-md"
                >
                  {" "}
                  Metode Pembayaran{" "}
                </Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={fetchPayments}
                  placeholder="Pilih metode pembayaran"
                  className="w-full"
                  onChange={(option) => {
                    setSelectedPaymentMethod(option ? option.payment : null);
                  }}
                />
              </div>
              <div className="w-full relative">
                <label className="text-left font-semibold mb-1 block">
                  Status Pembayaran
                </label>
                <div className="relative my-4">
                  <Select
                    onChange={(value) =>
                      handleSelectChange("paymentStatus", value)
                    }
                    options={[...paymentOptions]}
                    className="w-full h-10 pr-10 pl-3 rounded-md border border-gray-300 dark:bg-dark-900 dark:text-white text-sm appearance-none"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </ComponentCard>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap justify-end gap-4 pt-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-blue-600 text-blue-600 hover:text-white rounded-md hover:bg-blue-600 transition">
                Simpan dan tambah order baru
              </button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded text-white ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" size={18} />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Simpan Order
                    <IoIosSave size={20} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
