import PageMeta from "../../common/PageMeta.tsx";
import OrderPageBreadcrumb from "../../../pages/Order/OrderPageBreadcrumb.tsx";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";
import DatePicker from "react-datepicker";
import TableAddOrder from "../table/TableAddOrder.tsx";
import Button from "../../ui/button/Button.tsx";
import { IoIosSave } from "react-icons/io";
import { useEffect, useState } from "react";
import ModalAddCustomer from "../modal/ModalAddcustomer.tsx";
import ShippingSection from "../card/ShippingSection.tsx";
import AsyncSelect from "react-select/async";
import {
  SalesChannel,
  TCustomer,
  TDeliveryPlace,
} from "../../../service/order/create-order.type.ts";
import { CustomOption, DeliveryOption } from "../card/SelectOption.tsx";
import {
  fetchCustomers,
  fetchDeliveryPlace,
  fetchSalesChannels,
  getOrderById,
} from "../../../service/order/order.service.ts";
import { useParams } from "react-router-dom";
// import { getOrderById } from "../../../service/order/index.ts";

export default function EditOrderFomPage() {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
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

  const handleEditPemesan = () => {
    setisEditingPemesan(true);
  };
  const handleEditPenerima = () => {
    setisEditingPenerima(true);
  };

  const pemesanOption = selectedPemesan
  ? {
      label: `${selectedPemesan.name} | ${selectedPemesan.city}, ${selectedPemesan.province}`,
      value: selectedPemesan.id,
      customer: selectedPemesan,
    }
  : null;


  useEffect(() => {
    const fetchOrderId = async () => {
      if (!id) return;
      try {
        const order = await getOrderById(id);
        setSelectedPemesan(order.OrdererCustomer);
        setSelectedPenerima(order.DeliveryTargetCustomer);
        setSelectedDeliveryPlace(order.DeliveryPlace);
        setSelectedSalesChannel(order.SalesChannel);
        setOrderDate(order.orderDate ? new Date(order.orderDate) : null)
        // console.log("Order data:", order);
        // console.log(selectedPemesan, selectedPenerima)
      } catch (error) {
        console.error("Gagal mengambil data order:", error);
      }
    };

    fetchOrderId();
  }, [id]);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <OrderPageBreadcrumb pageTitle={`Edit Order : ${id}`} />
      <hr className="border-1 border-gray-200" />

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form kiri */}
          <ComponentCard
            title="Informasi Order"
            className="max-w-full md:max-h-fit"
          >
            <div className="space-y-6">
              <div>
                {/* Slicing Informasi Order */}
                <Label htmlFor="namaPemesan" className="font-semibold text-md">
                  Nama Pemesan
                </Label>
                <div className="w-full">
                  {isEditingPemesan ? (
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={fetchCustomers}
                      value={pemesanOption}
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
                <Label htmlFor="datepicker">Pilih Tanggal:</Label>
                <DatePicker
                  id="datepicker"
                  selected={orderDate}
                  onChange={(date) => setOrderDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="border p-2 rounded"
                  placeholderText="Pilih tanggal order"
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
                <label htmlFor="note" className="font-semibold text-md">
                  Catatan
                </label>
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
            <div className="rounded-2xl border p-4 border-gray-200 bg-white dark:border-gray-800 dark:bg-hite/[0.03]">
              <Input placeholder="Cari produk" className="w-full my-2" />
            </div>

            <ComponentCard title="Orderan">
              <TableAddOrder />
            </ComponentCard>
            <ShippingSection />

            {/* Tombol Aksi */}
            <div className="flex flex-wrap justify-end gap-4 pt-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-blue-600 text-blue-600 hover:text-white rounded-md hover:bg-blue-600 transition">
                Simpan dan tambah order baru
              </button>
              <Button>
                Simpan order
                <span>
                  <IoIosSave size={20} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
