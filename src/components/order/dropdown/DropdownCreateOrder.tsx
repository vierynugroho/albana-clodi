import { useState, useRef, useEffect } from "react";
import EditProductModal from "../modal/EditOrder";
import ProductDiscountModal from "../modal/ProductDiscountModal";

interface DropdownCreateOrderProps {
  order: {
    productId: string;
    name: string;
    harga: number;
    qty: number;
    subtotal: number;
  };
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onApplyDiscount?: (id: string, finalPrice: number, discount: number, type: "Rp" | "%") => void;
}

export default function DropdownCreateOrder({
  order,
  onDelete,
  onUpdateQuantity,
  onApplyDiscount,
}: DropdownCreateOrderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [qty, setQty] = useState(order.qty);
  const [isOpenDiscount, setOpenDiscount] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-500 hover:text-black text-lg"
      >
        &#8942;
      </button>

      {open && (
        <div className="absolute right-0 flex items-center justify-center gap-3 z-10 bg-white border rounded shadow-lg p-2 text-xs">
          {/* <button
            onClick={() => {
              setOpenDiscount(true);
              setOpen(false);
            }}
            className="text-green-600 hover:bg-green-600 hover:text-white rounded-md p-2 px-5 border border-green-600"
          >
            Diskon
          </button> */}
          <button
            onClick={() => {
              setQty(order.qty);
              setOpenModalEdit(true);
              setOpen(false);
            }}
            className="text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-md p-2 px-5 border border-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(order.productId)}
            className="text-red-600 hover:bg-red-600 hover:text-white rounded-md p-2 px-5 border border-red-600"
          >
            Hapus
          </button>
        </div>
      )}

      {openModalEdit && (
        <EditProductModal
          productName={order.name}
          price={order.harga}
          quantity={qty}
          onQuantityChange={(newQty) => setQty(newQty)}
          onClose={() => setOpenModalEdit(false)}
          onSave={() => {
            onUpdateQuantity(order.productId, qty);
            setOpenModalEdit(false);
          }}
        />
      )}

      {isOpenDiscount && (
        <ProductDiscountModal
          productName={order.name}
          initialPrice={order.harga}
          onClose={() => setOpenDiscount(false)}
          onSave={(finalPrice, discountValue, discountType) => {
            if (onApplyDiscount) {
              onApplyDiscount(order.productId, finalPrice, discountValue, discountType);
            }
            setOpenDiscount(false);
          }}
        />
      )}
    </div>
  );
}
