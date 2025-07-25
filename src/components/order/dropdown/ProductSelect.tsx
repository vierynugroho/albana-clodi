import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";
import { OptionProps } from "react-select";
import { ProductItem } from "../../../service/order/create-order.type";
import { fetchProduct } from "../../../service/order/order.service";
import { useState } from "react";
import ProdukImage from "../../../../public/images/icons/produk_image.jpg";
import { useProduct } from "../../../context/ProductContect";

const ProductOption = (
  props: OptionProps<
    { label: string; value: string; product: ProductItem },
    false
  >
) => {
  const { data, innerRef, innerProps, isFocused } = props;
  const [qty, setQty] = useState(1);
  const { getProductById } = useProduct();

  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    const productId = data.product.product.id;
    const stock = data.product.variant?.[0]?.stock ?? 0;

    // const productPrice = data.product.variant?.[0].productPrices[0].agent;
    console.log({ data });

    if (stock <= 0) {
      toast.error("Stok produk habis. Tidak bisa ditambahkan.");
      return;
    }

    if (qty > stock) {
      toast.error(`Stok hanya tersedia ${stock} pcs. Kurangi jumlahnya.`);
      return;
    }

    if (getProductById(productId)) {
      toast.error("Produk sudah ditambahkan sebelumnya.");
      return;
    }

    const customEvent = new CustomEvent("product:add", {
      detail: {
        product: data.product,
        qty: qty,
      },
    });

    window.dispatchEvent(customEvent);
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center justify-between gap-4 p-3 cursor-pointer ${
        isFocused ? "bg-blue-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={data.product.variant[0].imageUrl || ProdukImage}
          alt="produk"
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <div className="font-semibold text-sm">
            {data.product.product.name}
          </div>
          <div className="text-sm text-gray-600">
            Rp{data.product.price.normal.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            decrease();
          }}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <input
          type="text"
          value={qty}
          readOnly
          className="w-8 text-center border rounded"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            increase();
          }}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
        >
          + Tambahkan
        </button>
      </div>
    </div>
  );
};

interface ProductSelectProps {
  onSelect: (product: ProductItem | null) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = () => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={fetchProduct}
      placeholder="Cari Produk"
      className="w-full"
      classNamePrefix="custom-select"
      components={{ Option: ProductOption }}
      onChange={() => {}}
    />
  );
};

export default ProductSelect;
