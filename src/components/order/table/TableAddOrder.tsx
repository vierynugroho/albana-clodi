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
import { useEffect, useState } from "react";
import ModalDiskon from "../modal/ModalDiskon";
import ComponentCard from "../../common/ComponentCard.tsx";
import ProductSelect from "../dropdown/ProductSelect.tsx";
import { ProductItem } from "../../../service/order/create-order.type.ts";
import DropdownCreateOrder from "../dropdown/DropdownCreateOrder.tsx";

interface TableAddOrderProps {
  shipperDestinationId?: number;
  receiverDestinationId?: number;
  onChange?: (
    data: {
      orderProducts: {
        productId: string;
        productVariantId: string;
        productQty: number;
      }[];
      shippingCost?: {
        shippingService?: string;
        cost?: number;
        type?: string;
      };
    }
  ) => void;
}

export default function TableAddOrder({
  shipperDestinationId,
  receiverDestinationId,
  onChange,
}: TableAddOrderProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedShippingCost, setSelectedShippingCost] = useState(0);
  const [selectedShippingName, setSelectedShippingName] = useState<string>("");
  const [selectedShippingService, setSelectedShippingService] = useState<string>("");

  const [orders, setOrders] = useState<
    {
      // id: string;
      productId: string;
      productVariantId: string;
      name: string;
      harga: number;
      qty: number;
      subtotal: number;
      subBerat: number;
    }[]
  >([]);

  const handleAddProduct = (product: ProductItem | null) => {
    if (!product) return;

    const productId = product.product.id;
    const productVariantId = product.variant[0]?.id ?? ""; // sesuaikan dengan datamu
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
          // id: productId, // Ensure 'id' is present
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

  useEffect(() => {
    if (!(window as any).addedProducts) {
      (window as any).addedProducts = new Set<string>();
    }

    const handleAddProduct = (e: any) => {
      const { product, qty } = e.detail;
      // const id = product.product.id;
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
            // id,
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

  useEffect(() => {
    if (!onChange) return;

    const orderProducts = orders.map((o) => ({
      productId: o.productId,
      productVariantId: o.productVariantId,
      productQty: o.qty,
    }));

    const shippingCost = selectedShippingName && selectedShippingService
      ? {
        shippingService: selectedShippingService,
        cost: selectedShippingCost,
        type: selectedShippingName,
      }
      : undefined;

    onChange({
      orderProducts,
      shippingCost,
    });
  }, [onChange, orders, selectedShippingCost, selectedShippingName, selectedShippingService]);

  const totalSubtotal = orders.reduce((acc, curr) => acc + curr.subtotal, 0);
  const totalBerat = orders.reduce((acc, curr) => acc + curr.subBerat, 0);
  const totalOrder = totalSubtotal + selectedShippingCost / 100;

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.productId !== id));
    const addedSet = (window as any).addedProducts as Set<string>;
    addedSet.delete(id);
  };

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

            <div className="flex flex-wrap gap-2 my-6">
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition"
                >
                  <span className="text-lg font-bold">+</span> Diskon Order
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition">
                  <span className="text-lg font-bold">+</span> Biaya Lain
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition">
                  <span className="text-lg font-bold">+</span> Asuransi
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:text-white rounded-md hover:bg-green-700 transition">
                  <span className="text-lg font-bold">+</span> Ongkir 1kg
                </button>
              </div>
            </div>
            {showModal && (
              <ModalDiskon changeModal={() => setShowModal(false)} />
            )}

            <div className="flex justify-between items-center font-semibold pt-4 border-t mt-4">
              <span>TOTAL</span>
              <span className="text-blue-700 text-xl md:text-3xl font-bold">
                Rp{totalOrder.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </ComponentCard>
    </>
  );
}
