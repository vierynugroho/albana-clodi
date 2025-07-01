/* eslint-disable @typescript-eslint/no-explicit-any */
import PageMeta from "../../common/PageMeta.tsx";
import OrderPageBreadcrumb from "../../../pages/Order/OrderPageBreadcrumb.tsx";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Select from "../../form/Select.tsx";
import TableAddOrder from "../table/TableAddOrder.tsx";
import Button from "../../ui/button/Button.tsx";
import { IoIosSave } from "react-icons/io";
import { useCallback, useState } from "react";
import ModalAddCustomer from "../modal/ModalAddcustomer.tsx";
import AsyncSelect from "react-select/async";
import {
  OrderPayload,
  PaymentMethod,
  PaymentStatus,
  SalesChannel,
  TCustomer,
  TDeliveryPlace,
} from "../../../service/order/create-order.type.ts";
import {
  fetchCustomers,
  fetchDeliveryPlace,
  fetchPayments,
  fetchSalesChannels,
  postOrder,
} from "../../../service/order/order.service.ts";
import { FaSpinner } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../form/input/InputField.tsx";
import { CustomOption, DeliveryOption } from "../card/SelectOption.tsx";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddOrderFomPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderProducts, setOrderProducts] = useState<
    { productId: string; productVariantId: string; productQty: number }[]
  >([]);
  const [productDiscount, setProductDiscount] = useState<
    {
      produkVariantId: string;
      discountType: "nominal" | "percent";
      discountAmount: number;
    }[]
  >([]);
  const [shippingCost, setShippingCost] = useState<{
    shippingService?: string;
    cost?: number;
    type?: string;
    weight?: string;
  }>({});
  const [discount, setDiscount] = useState<{
    value?: number;
    type?: "nominal" | "percent";
  }>({});
  const [insurance, setInsurance] = useState<number | undefined>(undefined);
  const [ongkirDiscountValue, setOngkirDiscountValue] = useState<
    number | undefined
  >(undefined);
  const [note, setNote] = useState("");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<
    keyof typeof PaymentStatus | null
  >(null);
  const paymentOptions = Object.entries(PaymentStatus).map(([key, label]) => ({
    label,
    value: key,
  }));
  const [recieptNumber, setReceiptNumber] = useState<string | undefined>(
    undefined
  );
  const [nominalPayment, setNominalPayment] = useState<string | undefined>(
    undefined
  );
  function handleSelectChange(
    _field: string,
    value: keyof typeof PaymentStatus
  ) {
    setSelectedPaymentStatus(value);
  }
  const handleEditPemesan = () => {
    setisEditingPemesan(true);
  };
  const handleEditPenerima = () => {
    setisEditingPenerima(true);
  };
  const handleChangeOrder = useCallback(
    (data: {
      orderProducts: {
        productId: string;
        productVariantId: string;
        productQty: number;
      }[];
      shippingCost?: {
        shippingService?: string;
        cost?: number;
        type?: string;
        weight?: number;
      };
      discountOrder?: { value?: number; type?: "nominal" | "percent" } | null;
      insuranceValue?: number;
      ongkirDiscountValue?: number;
      productDiscount?: {
        produkVariantId: string;
        discountType: "nominal" | "percent";
        discountAmount: number;
      }[];
    }) => {
      setOrderProducts(data.orderProducts);
      setShippingCost(
        data.shippingCost
          ? {
              ...data.shippingCost,
              weight:
                data.shippingCost.weight !== undefined
                  ? String(data.shippingCost.weight)
                  : undefined,
            }
          : {}
      );
      setDiscount(data.discountOrder ? data.discountOrder : {});
      setInsurance(data.insuranceValue);
      setOngkirDiscountValue(data.ongkirDiscountValue);
      if (data.productDiscount) {
        setProductDiscount(data.productDiscount);
      } else {
        setProductDiscount([]);
      }
    },
    []
  );
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!selectedPemesan) {
      toast.error("Pilih Pemesan terlebih dahulu");
      return;
    }
    if (!selectedPenerima) {
      toast.error("Pilih Penerima terlebih dahulu");
      return;
    }
    if (!selectedDeliveryPlace) {
      toast.error("Pilih Tempat Pengiriman terlebih dahulu");
      return;
    }
    if (!selectedSalesChannel) {
      toast.error("Pilih Sales Channel terlebih dahulu");
      return;
    }
    if (!orderDate) {
      toast.error("Pilih Tanggal Order terlebih dahulu");
      return;
    }
    if (
      selectedPaymentStatus === "INSTALLMENTS" &&
      (!nominalPayment || nominalPayment.trim() === "")
    ) {
      toast.error("Masukkan nominal pembayaran untuk cicilan");
      return;
    }
    setLoading(true);

    const otherFees: any = {};

    if (
      selectedPaymentStatus === "INSTALLMENTS" &&
      nominalPayment !== undefined &&
      nominalPayment !== ""
    ) {
      otherFees.installments = {
        paymentDate: paymentDate,
        paymentMethodId: selectedPaymentMethod
          ? selectedPaymentMethod.id
          : undefined,
        amount: Number(nominalPayment),
      };
    }

    if (shippingCost && shippingCost.cost) {
      otherFees.shippingCost = shippingCost;
    }

    if (insurance !== undefined) {
      otherFees.insurance = insurance;
    }

    if (ongkirDiscountValue !== undefined) {
      otherFees.weight = ongkirDiscountValue;
    }

    if (discount?.value && discount.value > 0) {
      otherFees.discount = discount;
    }
    if (productDiscount.length > 0) {
      otherFees.productDiscount = productDiscount;
    }

    const paymentMethodPayload: any = {
      status: selectedPaymentStatus ?? "PENDING",
      date: paymentDate ? paymentDate.toISOString() : new Date().toISOString(),
    };
    if (selectedPaymentMethod?.id) {
      paymentMethodPayload.id = selectedPaymentMethod.id;
    }

    const orderDetailPayload = {
      detail: {
        otherFees,
        receiptNumber: recieptNumber,
      },
      paymentMethod: paymentMethodPayload,
      orderProducts: orderProducts,
    };

    const payload: OrderPayload = {
      order: {
        ordererCustomerId: selectedPemesan?.id || "",
        deliveryTargetCustomerId: selectedPenerima?.id || "",
        deliveryPlaceId:
          selectedDeliveryPlace?.id !== undefined
            ? String(selectedDeliveryPlace.id)
            : "",
        salesChannelId: selectedSalesChannel?.id || "",
        orderDate: orderDate ? orderDate.toISOString() : "",
        note,
      },
      orderDetail: orderDetailPayload,
    };
    try {
      const response = await postOrder(payload);
      if (response) {
        toast.success("Order berhasil ditambahkan");
        setTimeout(() => {
          navigate("/order");
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menambahkan order.");
    } finally {
      setLoading(false);
    }
  };

  return (
		<>
			<Toaster />
			<div className='dark:border-gray-800 dark:bg-white/[0.0] dark:text-gray-400'>
				<PageMeta
					title='ALBANA GROSIR'
					description='Pusat kontrol untuk semua transaksi dan pesanan pelanggan'
				/>
				<OrderPageBreadcrumb pageTitle='Tambah Order' />
				<hr className='border-1 border-gray-200 dark:border-gray-500' />

				<div className='p-6 bg-gray-50 min-h-screen dark:border-gray-800 dark:bg-white/[0.0] dark:text-gray-400'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Form kiri */}
						<ComponentCard
							title='Informasi Order'
							className='max-w-full md:max-h-fit'
						>
							<div className='space-y-6'>
								<div>
									{/* Slicing Informasi Order */}
									<Label
										htmlFor='namaPemesan'
										className='font-semibold text-md'
									>
										Nama Pemesan
									</Label>
									<div className='w-full'>
										{isEditingPemesan ? (
											<AsyncSelect
												cacheOptions
												defaultOptions
												loadOptions={fetchCustomers}
												onChange={(selectedOption: { customer: TCustomer } | null) => {
													setSelectedPemesan(selectedOption?.customer || null);
													setisEditingPemesan(false);
												}}
												placeholder='Cari Pemesan'
												className='w-full'
												classNamePrefix='custom-select'
												components={{
													Option: CustomOption,
												}}
											/>
										) : selectedPemesan ? (
											<div className='flex justify-between items-center px-3 py-2 border rounded-md bg-white'>
												<div>
													<div className='font-semibold text-gray-900'>{selectedPemesan.name}</div>
													<div className='text-sm text-gray-500'>{selectedPemesan.address}</div>
												</div>
												<button
													type='button'
													className='text-sm text-blue-500 underline ml-4'
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
										htmlFor='dikirimKepada'
										className='font-semibold text-md'
									>
										Dikirim Kepada
									</Label>
									<div className='w-full'>
										{isEditingPenerima ? (
											<AsyncSelect
												cacheOptions
												defaultOptions
												loadOptions={fetchCustomers}
												onChange={(selectedOption: { customer: TCustomer } | null) => {
													setSelectedPenerima(selectedOption?.customer || null);
													setisEditingPenerima(false);
												}}
												placeholder='Cari Penerima'
												className='w-full'
												classNamePrefix='custom-select'
												components={{
													Option: CustomOption,
												}}
											/>
										) : selectedPenerima ? (
											<div className='flex justify-between items-center px-3 py-2 border rounded-md bg-white'>
												<div>
													<div className='font-semibold text-gray-900'>{selectedPenerima.name}</div>
													<div className='text-sm text-gray-500'>{selectedPenerima.address}</div>
												</div>
												<button
													type='button'
													className='text-sm text-blue-500 underline ml-4'
													onClick={handleEditPenerima}
												>
													Edit
												</button>
											</div>
										) : null}
									</div>
								</div>
								{showModal && <ModalAddCustomer changeModal={() => setShowModal(false)} />}

								<div className='relative'>
									<Label
										htmlFor='pengirimanDari'
										className='font-semibold text-md'
									>
										Pengiriman Dari
									</Label>
									<AsyncSelect
										cacheOptions
										defaultOptions
										loadOptions={fetchDeliveryPlace}
										onChange={(selectedOption) => setSelectedDeliveryPlace(selectedOption ? selectedOption.place : null)}
										placeholder='Cari Lokasi Pengiriman'
										className='w-full'
										classNamePrefix='custom-select'
										components={{
											Option: DeliveryOption,
										}}
									/>
								</div>

								<div className='flex flex-col spcace-y-2'>
									<Label htmlFor='datepicker'>Pilih Tanggal:</Label>
									<DatePicker
										id='datepicker'
										selected={orderDate}
										onChange={(date) => setOrderDate(date)}
										dateFormat='dd-MM-yyyy'
										className='border p-2 rounded w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
										placeholderText='Pilih tanggal order'
									/>
								</div>

								<div className='relative'>
									<Label
										htmlFor='pengirimanDari'
										className='font-semibold text-md'
									>
										Sales Channels
									</Label>
									<AsyncSelect
										cacheOptions
										defaultOptions
										loadOptions={fetchSalesChannels}
										placeholder='Pilih sales channels'
										className='w-full'
										classNamePrefix='custom-select'
										onChange={(option) => {
											setSelectedSalesChannel(option ? option.channel : null);
										}}
									/>
								</div>

								<div className='flex flex-col space-y-2'>
									<label
										htmlFor='note'
										className='font-semibold text-md'
									>
										Catatan
									</label>
									<textarea
										id='note'
										className='dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 input h-30 w-full border border-gray-400 rounded-lg bg-gray-100'
										value={note}
										onChange={(e) => setNote(e.target.value)}
									/>
									{/* <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Add To Print Label
                  </label>
                </div> */}
								</div>
							</div>
						</ComponentCard>

						{/* Detail Order */}
						<div className='md:col-span-2 space-y-6'>
							<TableAddOrder
								shipperDestinationId={selectedPenerima?.destinationId ?? undefined}
								receiverDestinationId={selectedDeliveryPlace?.destinationId ?? undefined}
								customerCategory={selectedPemesan?.category}
								onChange={handleChangeOrder}
							/>

							{/* Status Pembayaran */}
							<ComponentCard title='Pembayaran'>
								<div className='w-full relative'>
									<label className='text-left font-semibold mb-1 block'>Status Pembayaran</label>
									<div className='relative my-4'>
										<Select
											onChange={(value: string) => handleSelectChange('paymentStatus', value as keyof typeof PaymentStatus)}
											options={paymentOptions}
											className='w-full h-10 pr-10 pl-3 rounded-md border border-gray-300 dark:bg-dark-900 dark:text-white text-sm appearance-none'
										/>
										<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
											<svg
												width='20'
												height='20'
												fill='none'
												viewBox='0 0 20 20'
											>
												<path
													d='M6 8l4 4 4-4'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										</span>
									</div>
								</div>
								{(selectedPaymentStatus === 'INSTALLMENTS' || selectedPaymentStatus === 'SETTLEMENT') && (
									<>
										<div className='flex flex-col relative mb-4'>
											<Label className='font-semibold text-md'>Pilih Tanggal:</Label>
											<DatePicker
												id='datepicker'
												selected={paymentDate}
												onChange={(date) => setPaymentDate(date)}
												dateFormat='dd-MM-yyyy'
												className='border p-2 rounded-md w-full'
												placeholderText='Pilih tanggal pembayaran'
											/>
										</div>

										<div className='relative mb-4'>
											<Label className='font-semibold text-md'>Metode Pembayaran</Label>
											<AsyncSelect
												cacheOptions
												defaultOptions
												loadOptions={fetchPayments}
												placeholder='Pilih metode pembayaran'
												className='w-full'
												classNamePrefix='custom-select'
												onChange={(option) => {
													setSelectedPaymentMethod(option ? option.payment : null);
												}}
											/>
										</div>
									</>
								)}

								{selectedPaymentStatus === 'INSTALLMENTS' && (
									<div className='mb-4'>
										<Label className='font-semibold text-md'>Nominal</Label>
										<Input
											placeholder='0'
											onChange={(e) => setNominalPayment(e.target.value)}
											value={nominalPayment || ''}
										/>
									</div>
								)}
							</ComponentCard>

							{(selectedPaymentStatus === 'INSTALLMENTS' || selectedPaymentStatus === 'SETTLEMENT') && (
								<ComponentCard title='Shipping'>
									<div>
										<label className='text-left font-semibold mb-1 block'>Nomor Resi</label>
										<Input
											placeholder='Masukkan Nomor Resi ( Optional )'
											onChange={(e) => setReceiptNumber(e.target.value)}
										/>
									</div>
								</ComponentCard>
							)}

							{/* Tombol Aksi */}
							<div className='flex flex-wrap justify-end gap-4 pt-2'>
								{/* <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-blue-600 text-blue-600 hover:text-white rounded-md hover:bg-blue-600 transition">
                Simpan dan tambah order baru
              </button> */}
								<Button
									onClick={handleSubmit}
									disabled={loading}
									className={`flex items-center gap-2 px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
								>
									{loading ? (
										<>
											<FaSpinner
												className='animate-spin'
												size={18}
											/>
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
		</>
	);
}
