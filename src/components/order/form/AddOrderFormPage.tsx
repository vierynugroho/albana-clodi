import PageMeta from "../../common/PageMeta.tsx";
import OrderPageBreadcrumb from "../../../pages/Order/OrderPageBreadcrumb.tsx";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Select from "../../form/Select.tsx";
import DatePicker from "../../form/date-picker.tsx";
import TableAddOrder from "../table/TableAddOrder.tsx";
import Button from "../../ui/button/Button.tsx";
import { IoIosSave } from "react-icons/io";
import { useEffect, useState } from "react";
import ModalAddCustomer from "../modal/ModalAddcustomer.tsx";
import { Customers, getCustomers } from "../../../service/customer/index.tsx";
import {
  DeliveryPlace,
  getDeliveryPlaces,
} from "../../../service/DeliveryPalce/index.ts";
import {
  SalesChannel,
  getSalesChannels,
} from "../../../service/SalesChannels/index.tsx";

export default function AddOrderFomPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [deliveryPlaces, setDeliveryPlaces] = useState<DeliveryPlace[]>([]);
  const [salesChannels, setSalesChannels] = useState<SalesChannel[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(
    null
  );

  const [selectedDeliveryCustomer, setSelectedDeliveryCustomer] =
    useState<Customers | null>(null);

  const [keyword, setKeyword] = useState("");
  const [orderData, setOrderData] = useState({
    ordererCustomerId: "",
    deliveryTargetCustomerId: "",
    deliveryPlaceId: "",
    salesChannelId: "",
    orderDate: "",
    note: "",
  });

  const [selectedSender, setSelectedSender] = useState("");
  const [selectedSalesChannel, setSelectedSalesChannel] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const [note, setNote] = useState("");
  const [deliveryKeyword, setDeliveryKeyword] = useState("");

  useEffect(() => {
    async function fetchCustomer() {
      setLoading(true);
      try {
        const result = await getCustomers();
        console.log("result", result);

        if (
          result?.success &&
          result?.responseObject &&
          Array.isArray(result.responseObject)
        ) {
          setCustomers(result.responseObject);
          console.log("Result Data:", result.responseObject);
        } else {
          console.error("Gagal mengambil data pengirim: Response tidak valid");
          setCustomers([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data pengirim:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, []);

  useEffect(() => {
    async function fetchDeliveryPlaces() {
      setLoading(true);
      try {
        const result = await getDeliveryPlaces();
        console.log("result", result);

        if (
          result?.success &&
          result?.responseObject &&
          Array.isArray(result.responseObject)
        ) {
          setDeliveryPlaces(result.responseObject);
          console.log("Data Delivery:", result.responseObject);
        } else {
          console.error("Gagal mengambil data pengirim: Response tidak valid");
          setDeliveryPlaces([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data pengirim:", error);
        setDeliveryPlaces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveryPlaces();
  }, []);

  useEffect(() => {
    async function fetchSalesChannels() {
      try {
        const result = await getSalesChannels();
        if (
          result?.success &&
          result?.responseObject &&
          Array.isArray(result.responseObject)
        ) {
          setSalesChannels(result.responseObject);
        } else {
          setSalesChannels([]);
          console.error(
            "Gagal mengambil data sales channel: Response tidak valid"
          );
        }
      } catch (error) {
        console.error("Gagal mengambil data sales channel:", error);
        setSalesChannels([]);
      }
    }
    fetchSalesChannels();
  }, []);

  const handleSelectChange = (selected: string) => {
    setSelectedSalesChannel(selected);
    setOrderData((prev) => ({
      ...prev,
      salesChannelId: selected,
    }));
    console.log("Sales Channel terpilih:", selected);
  };

  const handleSelect = (customer: Customers) => {
    setSelectedCustomer(customer);
    setKeyword(customer.name);
    setCustomers([]);
    setOrderData((prev) => ({
      ...prev,
      ordererCustomerId: customer.id,
    }));
    console.log("Customer dipilih:", customer);
  };

  const handleDeliverySelect = (customer: Customers) => {
    setSelectedDeliveryCustomer(customer);
    setDeliveryKeyword(customer.name);
    setCustomers([]);
    setOrderData((prev) => ({
      ...prev,
      deliveryTargetCustomerId: customer.id,
    }));
  };

  const handleSenderSelect = (value: string) => {
    setSelectedSender(value);
    setOrderData((prev) => ({
      ...prev,
      deliveryPlaceId: value,
    }));
  };

  const handleDateChange = (dateString: string) => {
    setOrderDate(dateString);
    setOrderData((prev) => ({
      ...prev,
      orderDate: dateString,
    }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    setOrderData((prev) => ({
      ...prev,
      note: value,
    }));
  };

  const paymentOptions = [
    { value: "belum-bayar", label: "Belum Bayar" },
    { value: "cicilan", label: "Cicilan" },
    { value: "lunas", label: "Sudah Bayar(Lunas)" },
  ];

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
          <ComponentCard title="Informasi Order" className="md:max-h-8/12">
            <div className="space-y-6">
              <div>
                <Label htmlFor="namaPemesan" className="font-semibold text-md">
                  Nama Pemesan
                </Label>
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <input
                      id="namaPemesan"
                      placeholder="Cari customer"
                      className="w-full border rounded px-3 py-2"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setSelectedCustomer(null);
                      }}
                    />

                    {!loading && customers.length > 0 && (
                      <ul className="absolute top-full mt-1 left-0 bg-white border rounded shadow w-full z-10 max-h-60 overflow-y-auto">
                        {customers.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() => handleSelect(customer)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="text-md font-semibold text-red-700">
                              {customer.name}
                            </span>{" "}
                            <span className="block text-sm font-normal">
                              {customer.address}
                            </span>
                            ,
                            <span className="text-sm font-normal">
                              {customer.subdistrict}
                            </span>
                            <span className="text-sm font-normal">
                              , {customer.postalCode}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-secondary border p-2 text-sm rounded-lg">
                    <span className="px-1">+</span>
                    Customer
                  </button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="dikirimKepada"
                  className="font-semibold text-md">
                  Dikirim Kepada
                </Label>
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <input
                      id="dikirimKepada"
                      placeholder="Cari customer"
                      className="w-full border rounded px-3 py-2"
                      value={deliveryKeyword}
                      onChange={(e) => {
                        setDeliveryKeyword(e.target.value);
                        setSelectedDeliveryCustomer(null);
                      }}
                    />

                    {!loading && customers.length > 0 && (
                      <ul className="absolute top-full mt-1 left-0 bg-white border rounded shadow w-full z-10 max-h-60 overflow-y-auto">
                        {customers.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() => handleDeliverySelect(customer)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="text-md font-semibold text-red-700">
                              {customer.name}
                            </span>{" "}
                            <span className="block">{customer.address}</span>,
                            <span>{customer.subdistrict}</span>
                            <span>, {customer.postalCode}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-secondary border p-2 text-sm rounded-md">
                    <span className="px-1">+</span>
                    Customer
                  </button>
                </div>
              </div>
              {showModal && (
                <ModalAddCustomer changeModal={() => setShowModal(false)} />
              )}

              <div className="relative">
                <Label
                  htmlFor="pengirimanDari"
                  className="font-semibold text-md">
                  Pengiriman Dari
                </Label>
                <Select
                  options={
                    deliveryPlaces.map((place) => ({
                      value: place.id,
                      label: `${place.name} | ${place.address}, ${place.subdistrict}`,
                    })) || []
                  }
                  onChange={(value) => handleSenderSelect(value as string)}
                  placeholder="Pilih Pengirim"
                  className="w-full h-10 pr-10 rounded-md border border-gray-300 dark:bg-dark-900"
                />
                <span className="pointer-events-none absolute right-3 bottom-1 -translate-y-1/2 text-gray-400">
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

              <div>
                <DatePicker
                  id="date-picker"
                  label="Tanggal Order"
                  placeholder="Select a date"
                  onChange={(dates: Date[]) => {
                    if (dates.length > 0) {
                      const dateString = dates[0].toISOString().split("T")[0];
                      setOrderDate(dateString);
                      setOrderData((prev) => ({
                        ...prev,
                        orderDate: dateString,
                      }));
                    }
                  }}
                />
              </div>

              <div className="relative">
                <Label className="font-semibold text-md">Sales Channel</Label>
                <Select
                  options={
                    salesChannels?.map((channel) => ({
                      value: channel.id,
                      label: channel.name,
                    })) || []
                  }
                  placeholder="Pilih sales Channels"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="pointer-events-none absolute right-3 bottom-1 -translate-y-1/2 text-gray-400">
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

              <div>
                <Label htmlFor="note" className="font-semibold text-md">
                  Catatan
                </Label>
                <textarea
                  id="note"
                  className="input h-30 w-full border border-gray-400 rounded-lg bg-gray-100"
                  value={note}
                  onChange={handleNoteChange}
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
            <TableAddOrder />

            {/* Status Pembayaran */}
            <ComponentCard title="Pembayaran">
              <div className="w-full relative">
                <label className="text-left font-semibold mb-1 block">
                  Status Pembayaran
                </label>
                <div className="relative my-4">
                  <Select
                    onChange={handleSelectChange}
                    options={paymentOptions}
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
