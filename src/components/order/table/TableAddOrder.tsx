/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import EmptyBox from "../../../../public/images/icons/empty_box.svg";
import TableCourierSelection from "./TableCourierSelect";
import { useEffect, useMemo, useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import ProductSelect from "../dropdown/ProductSelect.tsx";
import { ProductItem } from "../../../service/order/create-order.type.ts";
import DropdownCreateOrder from "../dropdown/DropdownCreateOrder.tsx";
import ModalFormDiscount, {
  DiscountValueType,
  ItemType,
} from "../modal/ModalDiskon";
import DropdownAction from "../dropdown/DropdownMenuList.tsx";

interface ItemData {
  type: ItemType;
  title: string;
  name: string;
  value: string;
  discountType: DiscountValueType;
}
interface TableAddOrderProps {
  shipperDestinationId?: number;
  receiverDestinationId?: number;
  onChange?: (data: {
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
    // totalBeratOrder?: number;
    insuranceValue?: number;
    ongkirDiscountValue?: number;
    discountOrder?: {
      value: number;
      type: "nominal" | "percent";
    } | null;
  }) => void;
}

export default function TableAddOrder({
  shipperDestinationId,
  receiverDestinationId,
  onChange,
}: TableAddOrderProps) {
  const [selectedShippingCost, setSelectedShippingCost] = useState(0);
  const [selectedShippingName, setSelectedShippingName] = useState<string>("");
  const [selectedShippingService, setSelectedShippingService] =
    useState<string>("");

  const [orders, setOrders] = useState<
    {
      productId: string;
      productVariantId: string;
      name: string;
      harga: number;
      qty: number;
      subtotal: number;
      subBerat: number;
      discount?: number;
      discountType?: "Rp" | "%";
      finalPrice?: number;
    }[]
  >([]);

  const handleAddProduct = (product: ProductItem | null) => {
    if (!product) return;

    const productId = product.product.id;
    const productVariantId = product.variant[0]?.id ?? "";
    const name = product.product.name;
    const harga = product.price.normal;
    const berat = product.product.weight;

    const existing = orders.find((o) => o.productId === productId);
    if (existing) {
      setOrders((prev) =>
        prev.map((o) =>
          o.productId === productId
            ? {
                ...o,
                qty: o.qty + 1,
                subtotal: (o.qty + 1) * o.harga,
              }
            : o
        )
      );
    } else {
      setOrders((prev) => [
        ...prev,
        {
          productId,
          productVariantId,
          name,
          harga,
          qty: 1,
          subtotal: harga,
          subBerat: berat || 0,
        },
      ]);
    }
  };

  const totalSubtotal = orders.reduce((acc, curr) => acc + curr.subtotal, 0);
  const totalBerat = orders.reduce((acc, curr) => acc + curr.subBerat, 0);
  // const totalOrder = totalSubtotal + selectedShippingCost / 100;

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.productId !== id));
    const addedSet = (window as any).addedProducts as Set<string>;
    addedSet.delete(id);
  };

  const handleUpdateQty = (productId: string, newQty: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.productId === productId
          ? {
              ...order,
              qty: newQty,
              subtotal: newQty * order.harga,
            }
          : order
      )
    );
  };

  const handleApplyDiscount = (
    productId: string,
    finalPrice: number,
    discount: number,
    discountType: "Rp" | "%"
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.productId === productId
          ? {
              ...order,
              discount,
              discountType,
              finalPrice,
              subtotal: order.qty * finalPrice,
            }
          : order
      )
    );
  };

  useEffect(() => {
    if (!(window as any).addedProducts) {
      (window as any).addedProducts = new Set<string>();
    }

    const handleAddProduct = (e: any) => {
      const { product, qty } = e.detail;
      const productId = product.product.id;
      const productVariantId = product.variant?.[0]?.id ?? "";
      const name = product.product.name;
      const harga = product.price.normal;
      const berat = product.product.weight;

      const addedSet = (window as any).addedProducts as Set<string>;
      addedSet.add(productId);

      setOrders((prev) => {
        const existing = prev.find((o) => o.productId === productId);
        if (existing) {
          return prev.map((o) =>
            o.productId === productId
              ? {
                  ...o,
                  qty: o.qty + qty,
                  subtotal: (o.qty + qty) * o.harga,
                }
              : o
          );
        }
        return [
          ...prev,
          {
            productId,
            productVariantId,
            name,
            harga,
            qty,
            subtotal: harga * qty,
            subBerat: berat * qty || 0,
          },
        ];
      });
    };

    window.addEventListener("product:add", handleAddProduct);
    return () => window.removeEventListener("product:add", handleAddProduct);
  }, []);

  const [modalType, setModalType] = useState<null | ItemType>(null);
  const [items, setItems] = useState<ItemData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalData, setModalData] = useState<{
    name: string;
    value: string;
    type: string;
    discountType: DiscountValueType;
  } | null>(null);

  const handleAddOngkir = () => {
    setItems((prev) => [
      ...prev,
      {
        title: "Ongkir 1 kg",
        name: "Ongkir",
        value: "10000",
        type: "ongkir" as ItemType,
        discountType: "Rp",
      },
    ]);
  };

  const totalFinal = useMemo(() => {
    const parseValue = (value: string): number => {
      const num = Number(value.replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };
    let discountAmount = 0;
    let otherAdditions = 0;
    items.forEach((item) => {
      const val = parseValue(item.value);
      if (item.title === "Diskon Order" || item.title === "Ongkir 1 Kg") {
        if (item.discountType === "%") {
          discountAmount += (totalSubtotal * val) / 100;
        } else {
          discountAmount += val;
        }
      } else if (item.title === "Asuransi" || item.title === "Biaya Lain") {
        if (item.discountType === "%") {
          otherAdditions += (totalSubtotal * val) / 100;
        } else {
          otherAdditions += val;
        }
      } else if (item.title === "") {
        discountAmount += val;
      }
    });

    return totalSubtotal + otherAdditions - discountAmount;
  }, [items, totalSubtotal]);

  useEffect(() => {
    if (!onChange) return;

    const orderProducts = orders.map((o) => ({
      productId: o.productId,
      productVariantId: o.productVariantId,
      productQty: o.qty,
    }));

    const totalBeratOrder = totalBerat || 0;
    const shippingCost =
      selectedShippingName && selectedShippingService
        ? {
            shippingService: selectedShippingService,
            cost: selectedShippingCost,
            type: selectedShippingName,
            weight: totalBeratOrder,
          }
        : undefined;

    const discountItems = items.filter((item) => item.title === "Diskon Order");
    let discountOrder: { value: number; type: "nominal" | "percent" } | null =
      null;

    if (discountItems.length > 0) {
      const firstType = discountItems[0].discountType;
      const isPercent = firstType === "%";

      const total = discountItems.reduce((acc, item) => {
        const val = Number(item.value.replace(/[^0-9.-]+/g, ""));
        return isNaN(val) ? acc : acc + val;
      }, 0);

      if (total > 0) {
        discountOrder = {
          value: total,
          type: isPercent ? "percent" : "nominal",
        };
      }
    }

    const insuranceValue = items.reduce((acc, item) => {
      if (item.title !== "Asuransi") return acc;

      const val = Number(item.value.replace(/[^0-9.-]+/g, ""));
      if (isNaN(val)) return acc;

      if (item.discountType === "%") {
        return acc + (totalSubtotal * val) / 100;
      }

      return acc + val;
    }, 0);

    const ongkirDiscountValue = items.reduce((acc, item) => {
      if (item.title !== "Ongkir 1 kg") return acc;

      const val = Number(item.value.replace(/[^0-9.-]+/g, ""));
      if (isNaN(val)) return acc;

      if (item.discountType === "%") {
        return acc + (totalSubtotal * val) / 100;
      }

      return acc + val;
    }, 0);

    // Diskon untuk tiap product
    // let isRupiah = false;
    // let totalDiscountValue = 0;

    // orders.forEach((order) => {
    //   if (!order.discount || !order.discountType) return;

    //   if (order.discountType === "Rp") {
    //     isRupiah = true;
    //     totalDiscountValue += order.discount * order.qty;
    //   } else if (!isRupiah && order.discountType === "%") {
    //     totalDiscountValue += order.discount;
    //   }
    // });

    // const discountOrder: { value: number; type: "nominal" | "percent" } | null =
    //   totalDiscountValue
    //     ? {
    //         value: totalDiscountValue,
    //         type: isRupiah ? "nominal" : "percent",
    //       }
    //     : null;

    onChange({
      orderProducts,
      shippingCost,
      discountOrder,
      insuranceValue,
      ongkirDiscountValue,
    });
  }, [
    items,
    onChange,
    orders,
    selectedShippingCost,
    selectedShippingName,
    selectedShippingService,
    totalBerat,
    totalSubtotal,
  ]);

  return (
    <>
      <div className="rounded-2xl border p-4 border-gray-200 bg-white dark:border-gray-800 dark:bg-hite/[0.03]">
        <ProductSelect onSelect={handleAddProduct} />
      </div>

      <ComponentCard title="Orderan">
        <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-semibold text-black text-start text-sm md:text-theme-md dark:text-gray-400"
                  >
                    Nama
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-semibold text-black text-start text-sm md:text-theme-md dark:text-gray-400"
                  >
                    Harga
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-semibold text-black text-start text-sm md:text-theme-md dark:text-gray-400"
                  >
                    QTY
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-semibold text-black text-start text-sm md:text-theme-md dark:text-gray-400"
                  >
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                        {order.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                        {order.harga}
                        {order.discount ? (
                          <div className="text-red-500 italic text-[10px]">
                            disc. {order.discount}
                            {order.discountType === "%" ? "%" : ""}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                        {order.qty}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-black text-start text-sm md:text-theme-md dark:text-gray-400">
                        {order.subtotal}
                      </TableCell>
                      <TableCell className="relative px-4 py-3 text-end">
                        <DropdownCreateOrder
                          order={order}
                          onDelete={handleDeleteOrder}
                          onUpdateQuantity={handleUpdateQty}
                          onApplyDiscount={handleApplyDiscount}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <td colSpan={8} className="py-5 px-3 ">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={EmptyBox}
                          className="w-auto h-20"
                          alt="box-empty"
                        />
                        <span className="text-gray-300">
                          Belum ada produk ditambahkan
                        </span>
                      </div>
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">
                Rp{totalSubtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Ongkos Kirim {totalBerat} Kg -</span>
              <span className="font-bold">
                Rp{(selectedShippingCost / 100).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium rounded-md border border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Semua kurir
              </button>
            </div>

            <TableCourierSelection
              onSelectCourier={(cost, shippingName, shippingService) => {
                setSelectedShippingCost(cost);
                setSelectedShippingName(shippingName);
                setSelectedShippingService(shippingService);
              }}
              totalBerat={totalBerat}
              itemValue={totalSubtotal}
              shipperDestinationId={shipperDestinationId}
              receiverDestinationId={receiverDestinationId}
            />
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="relative flex justify-between text-xs items-center"
                >
                  <div>
                    {item.title}
                    {item.name !== "Ongkir" && item.name !== "" && (
                      <> - {item.name}</>
                    )}
                    {item.discountType === "%" && (
                      <span
                        className={
                          item.title === "Asuransi" ||
                          item.title === "Biaya Lain"
                            ? "text-black"
                            : "text-red-500"
                        }
                      >
                        {" "}
                        ( {item.value}% )
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={
                        item.title === "Asuransi" || item.title === "Biaya Lain"
                          ? "text-black"
                          : "text-red-500"
                      }
                    >
                      {item.discountType === "%" ? (
                        <span>
                          ( {(totalSubtotal * Number(item.value)) / 100} )
                        </span>
                      ) : (
                        <span>( {item.value} )</span>
                      )}
                    </span>

                    <DropdownAction
                      onEdit={() => {
                        setModalType(item.type);
                        setEditingIndex(index);
                        setModalData({
                          name: item.name,
                          value: item.value,
                          type: item.type,
                          discountType: item.discountType,
                        });
                      }}
                      onDelete={() => {
                        setItems((prev) => prev.filter((_, i) => i !== index));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => setModalType("diskon")}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition"
                >
                  <span className="text-lg font-bold">+</span> Diskon Order
                </button>
                {/* <button
                  onClick={() => setModalType("biaya")}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition"
                >
                  <span className="text-lg font-bold">+</span> Biaya Lain
                </button> */}
                <button
                  onClick={() => setModalType("asuransi")}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition"
                >
                  <span className="text-lg font-bold">+</span> Asuransi
                </button>
                <button
                  onClick={handleAddOngkir}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition"
                >
                  Ongkir 1kg
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center font-semibold pt-4 border-t mt-4">
              <span>TOTAL</span>
              <span className="text-blue-700 text-xl md:text-3xl font-bold">
                Rp{totalFinal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </ComponentCard>
      {modalType && (
        <ModalFormDiscount
          title={
            modalType === "diskon"
              ? "Diskon Order"
              : modalType === "biaya"
              ? "Biaya Lain"
              : modalType === "asuransi"
              ? "Asuransi"
              : modalType === "ongkir"
              ? "Diskon Ongkir"
              : ""
          }
          namePlaceholder={`Masukkan Nama ${
            modalType === "diskon"
              ? "Diskon Order"
              : modalType === "biaya"
              ? "Biaya Lain"
              : modalType === "asuransi"
              ? "Asuransi"
              : modalType === "ongkir"
              ? "Diskon Ongkir"
              : ""
          }`}
          changeModal={() => {
            setModalType(null);
            setEditingIndex(null);
            setModalData(null);
          }}
          onSubmit={(data) => {
            if (editingIndex !== null) {
              setItems((prev) =>
                prev.map((item, i) =>
                  i === editingIndex
                    ? { ...item, ...data, type: data.type as ItemType }
                    : item
                )
              );
            } else {
              setItems((prev) => [
                ...prev,
                {
                  title:
                    modalType === "diskon"
                      ? "Diskon Order"
                      : modalType === "biaya"
                      ? "Biaya Lain"
                      : modalType === "asuransi"
                      ? "Asuransi"
                      : modalType === "ongkir"
                      ? "Diskon Ongkir"
                      : "",
                  name: data.name,
                  value: data.value,
                  type: data.type as ItemType,
                  discountType: data.discountType as DiscountValueType,
                },
              ]);
            }
            setModalType(null);
            setEditingIndex(null);
            setModalData(null);
          }}
          initialData={modalData}
        />
      )}
    </>
  );
}
