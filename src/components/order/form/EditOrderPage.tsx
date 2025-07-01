import PageMeta from "../../common/PageMeta.tsx";
import OrderPageBreadcrumb from "../../../pages/Order/OrderPageBreadcrumb.tsx";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";
import DatePicker from "react-datepicker";
import TableAddOrder from "../table/TableAddOrder.tsx";
import Button from "../../ui/button/Button.tsx";
import { IoIosSave } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import {
  OrderPayload,
  PaymentMethod,
  PaymentStatus,
  SalesChannel,
  TCustomer,
  TDeliveryPlace,
} from "../../../service/order/create-order.type.ts";
import { CustomerSelect, DeliveryOption } from "../card/SelectOption.tsx";
import {
  fetchDeliveryPlace,
  fetchPayments,
  fetchSalesChannels,
  getOrderById,
  updateOrder,
} from "../../../service/order/order.service.ts";
import { useNavigate, useParams } from "react-router-dom";
import Select from "../../form/Select.tsx";
import { getHargaByCustomerCategory } from "../getPriceByCustomerCategory.ts";
import { FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function EditOrderFomPage() {
  const { id } = useParams<{ id: string }>();
  const [orderCode, setOrderCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [selectedPemesan, setSelectedPemesan] = useState<TCustomer | null>(
    null
  );
  const [selectedPenerima, setSelectedPenerima] = useState<TCustomer | null>(
    null
  );
  const [selectedDeliveryPlace, setSelectedDeliveryPlace] =
    useState<TDeliveryPlace | null>(null);
  const [selectedSalesChannel, setSelectedSalesChannel] =
    useState<SalesChannel | null>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<
    keyof typeof PaymentStatus | null
  >(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const paymentOptions = Object.entries(PaymentStatus).map(([key, label]) => ({
    label,
    value: key,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<any>(null);

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

  const deliveryPlaceOption = selectedDeliveryPlace
    ? {
        label: `${selectedDeliveryPlace.name} | ${selectedDeliveryPlace.address}`,
        value: selectedDeliveryPlace.id,
        place: selectedDeliveryPlace,
      }
    : null;

  const salesChannelOption = selectedSalesChannel
    ? {
        label: `${selectedSalesChannel.name}`,
        value: selectedSalesChannel.id,
        place: selectedSalesChannel,
      }
    : null;

  const paymentMethodOption = selectedPaymentMethod
    ? {
        label: `${selectedPaymentMethod.bankName}`,
        value: selectedPaymentMethod.id,
        payment: selectedPaymentMethod,
      }
    : null;

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

  useEffect(() => {
    const fetchOrderId = async () => {
      if (!id) return;
      try {
        const order = await getOrderById(id);
        setOrderCode(order.OrderDetail.code);
        setSelectedPemesan(order.OrdererCustomer);
        setSelectedPenerima(order.DeliveryTargetCustomer);
        setSelectedDeliveryPlace(order.DeliveryPlace);
        setSelectedSalesChannel(order.SalesChannel);
        setOrderDate(order.orderDate ? new Date(order.orderDate) : null);
        setNote(order.note);
        setSelectedPaymentStatus(
          order.OrderDetail.paymentStatus as keyof typeof PaymentStatus
        );
        setPaymentDate(
          order.Installment?.paymentDate
            ? new Date(order.Installment.paymentDate)
            : order.OrderDetail.paymentDate
            ? new Date(order.OrderDetail.paymentDate)
            : null
        );
        setNominalPayment(
          order.Installment &&
            order.Installment.amount !== undefined &&
            order.Installment.amount !== null
            ? order.Installment.amount.toString()
            : undefined
        );
        setReceiptNumber(order.OrderDetail.receiptNumber ?? undefined);
        setSelectedPaymentMethod(order.OrderDetail.PaymentMethod);
        /// Mapping untuk TableAddOrder
        const categoryCustomer = order.OrdererCustomer.category;
        const productDiscounts =
          order.OrderDetail.otherFees.productDiscount || [];
        const mappedInitialData = {
          orders: order.OrderDetail.OrderProducts.map((orderProduct) => {
            const variant = orderProduct.Product.productVariants[0];
            const prices = variant?.productPrices;
            const harga = getHargaByCustomerCategory(
              prices?.[0],
              categoryCustomer
            );

            const discountItem = productDiscounts.find(
              (discount) => discount.produkVariantId === variant?.id
            );

            const hargaSetelahDiskon = discountItem
              ? discountItem.discountType === "nominal"
                ? harga - discountItem.discountAmount
                : harga - harga * (discountItem.discountAmount / 100)
              : harga;

            return {
              productId: orderProduct.productId,
              productVariantId: variant?.id || "",
              name: orderProduct.Product.name,
              qty: orderProduct.productQty,
              subBerat:
                (orderProduct.Product.weight || 0) * orderProduct.productQty,
              discount: discountItem ? discountItem.discountAmount : undefined,
              discountType: discountItem
                ? discountItem.discountType === "nominal"
                  ? "Rp"
                  : "%"
                : undefined,
              harga: harga,
              finalPrice: hargaSetelahDiskon,
              subtotal: hargaSetelahDiskon * orderProduct.productQty,
            };
          }),

          items: [
            ...(order.OrderDetail.otherFees.discount?.value
              ? [
                  {
                    title: "Diskon Order",
                    name: "Diskon",
                    value:
                      order.OrderDetail.otherFees.discount.value.toString(),
                    discountType:
                      order.OrderDetail.otherFees.discount.type === "nominal"
                        ? "Rp"
                        : "%",
                    type: "diskon",
                  },
                ]
              : []),
            ...(order.OrderDetail.otherFees.insurance
              ? [
                  {
                    title: "Asuransi",
                    name: "Asuransi",
                    value: order.OrderDetail.otherFees.insurance.toString(),
                    discountType: "Rp",
                    type: "asuransi",
                  },
                ]
              : []),
            ...(order.OrderDetail.otherFees.weight
              ? [
                  {
                    title: "Ongkir 1 kg",
                    name: "Ongkir 1 kg",
                    value: order.OrderDetail.otherFees.insurance.toString(),
                    discountType: "Rp",
                    type: "ongkir",
                  },
                ]
              : []),
          ],
          shipping: {
            cost: order.OrderDetail.otherFees.shippingCost?.cost || 0,
            name: order.OrderDetail.otherFees.shippingCost?.type || "",
            service:
              order.OrderDetail.otherFees.shippingCost?.shippingService || "",
          },
        };

        setInitialData(mappedInitialData);
      } catch (error) {
        console.error("Gagal mengambil data order:", error);
      }
    };

    fetchOrderId();
  }, [id]);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      await updateOrder(id ?? "", payload);
      toast.success("Order berhasil diperbarui");
      navigate("/order");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Order submission error:", error);
      const message =
        error?.response?.data?.message ||
        "Terjadi kesalahan saat mengupdate order.";
      toast.error(message);
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
				<OrderPageBreadcrumb pageTitle={`Edit Order : ${orderCode}`} />
				<hr className='border-1 border-gray-200 dark:border-gray-500' />

				<div className='p-6 bg-gray-50 min-h-screen dark:border-gray-800 dark:bg-white/[0.0] dark:text-gray-400'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Form kiri */}
						<ComponentCard
							title='Informasi Order'
							className='max-w-full md:max-h-fit'
						>
							<div className='space-y-6'>
								<CustomerSelect
									label='Nama Pemesan'
									selectedCustomer={selectedPemesan}
									onSelect={(c) => setSelectedPemesan(c)}
								/>
								<CustomerSelect
									label='Nama Penerima'
									selectedCustomer={selectedPenerima}
									onSelect={(c) => setSelectedPenerima(c)}
								/>

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
										value={deliveryPlaceOption}
										onChange={(selectedOption) => setSelectedDeliveryPlace(selectedOption ? selectedOption.place : null)}
										placeholder='Cari Lokasi Pengiriman'
										className='w-full'
										classNamePrefix='custom-select'
										components={{
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											Option: DeliveryOption as React.ComponentType<any>,
										}}
									/>
								</div>

								<div className='flex flex-col space-y-2'>
									<Label htmlFor='datepicker'>Pilih Tanggal:</Label>
									<DatePicker
										id='datepicker'
										selected={orderDate}
										onChange={(date) => setOrderDate(date)}
										dateFormat='dd-MM-yyyy'
										className='border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
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
										loadOptions={async (inputValue: string) => {
											const options = await fetchSalesChannels(inputValue);
											return options.map((opt) => ({
												...opt,
												place: opt.channel,
												channel: undefined,
											}));
										}}
										value={salesChannelOption}
										classNamePrefix='custom-select'
										placeholder='Pilih sales channels'
										className='w-full'
										onChange={(option) => {
											setSelectedSalesChannel(option ? option.place : null);
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
										className='input h-30 w-full border border-gray-400 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
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
							<ComponentCard title='Orderan'>
								<TableAddOrder
									shipperDestinationId={selectedPenerima?.destinationId ?? undefined}
									receiverDestinationId={selectedDeliveryPlace?.destinationId ?? undefined}
									onChange={handleChangeOrder}
									initialData={initialData}
								/>
							</ComponentCard>

							{/* Status Pembayaran */}
							<ComponentCard title='Pembayaran'>
								<div className='w-full relative'>
									<label className='text-left font-semibold mb-1 block'>Status Pembayaran</label>
									<div className='relative my-4'>
										<Select
											onChange={(value: string) => handleSelectChange('paymentStatus', value as keyof typeof PaymentStatus)}
											defaultValue={selectedPaymentStatus ?? undefined}
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
												value={paymentMethodOption}
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
											value={recieptNumber}
											onChange={(e) => setReceiptNumber(e.target.value)}
										/>
									</div>
								</ComponentCard>
							)}

							{/* Tombol Aksi */}
							<div className='flex flex-wrap justify-end gap-4 pt-2'>
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
