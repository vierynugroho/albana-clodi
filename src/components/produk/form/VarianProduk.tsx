import { TiDeleteOutline } from "react-icons/ti";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import DropzoneComponent from "./ImageProduk";

export type ProductPrice = {
  normal: number;
  buy: number;
  reseller: number;
  agent: number;
  member: number;
};

export type ProductVariant = {
  imageUrl: File | null | string;
  image?: File;
  sku: string;
  productPrices: ProductPrice;
  barcode?: string;
  size?: string;
  color?: string;
  stock: number | null;
};

type Props = {
  setVarian: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  variant: ProductVariant;
  index: number;
  onDelete: (index: number) => void;
};

function formatToRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(amount);
}

function parseRupiah(rupiahString: string): number {
  return Number(rupiahString.replace(/[^0-9]/g, ""));
}

export default function VarianProduk({
  setVarian,
  index,
  onDelete,
  variant,
}: Props) {
  function onChange(
    index: number,
    value: number | string | File,
    label: keyof ProductVariant | keyof ProductPrice
  ) {
    setVarian((prev) => {
      const updated = [...prev];
      const currentVariant = { ...updated[index] };
      if (label in currentVariant.productPrices) {
        const updatedPrice = {
          ...currentVariant.productPrices,
          [label]: value,
        };
        currentVariant.productPrices = updatedPrice;
        updated[index] = currentVariant;
      } else {
        const updatedVarian = { ...updated[index], [label]: value };
        updated[index] = updatedVarian;
      }
      return updated;
    });
  }
  console.log(variant.imageUrl);
  return (
    <div className="relative border rounded-2xl p-4 shadow-md mb-4 flex justify-evenly gap-6 whitespace-nowrap items-start">
      <DropzoneComponent
        index={index}
        onChange={onChange}
        imageUrl={String(variant.imageUrl)}
      />
      <div>
        <Label htmlFor="inputTwo">SKU</Label>
        <Input
          type="text"
          placeholder="SKU45"
          value={variant.sku ?? ""}
          onChange={(val) => onChange(index, val.target.value, "sku")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="inputTwo">Harga Beli</Label>
          <Input
            onChange={(e) => {
              const numeric = parseRupiah(e.target.value);
              onChange(index, numeric, "buy"); // kirim angka murni
            }}
            value={formatToRupiah(variant.productPrices.buy)}
            type="text"
            placeholder="Rp0"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>
        <hr />

        <div>
          <Label htmlFor="inputTwo">Harga Agent</Label>
          <Input
            onChange={(e) => {
              const numeric = parseRupiah(e.target.value);
              onChange(index, numeric, "agent"); // kirim angka murni
            }}
            value={formatToRupiah(variant.productPrices.agent)}
            type="text"
            placeholder="Rp0"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>

        <div>
          <Label htmlFor="inputTwo">Harga Reseller</Label>
          <Input
            onChange={(e) => {
              const numeric = parseRupiah(e.target.value);
              onChange(index, numeric, "reseller"); // kirim angka murni
            }}
            value={formatToRupiah(variant.productPrices.reseller)}
            type="text"
            placeholder="Rp0"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>

        <div>
          <Label htmlFor="inputTwo">Harga Member</Label>
          <Input
            onChange={(e) => {
              const numeric = parseRupiah(e.target.value);
              onChange(index, numeric, "member"); // kirim angka murni
            }}
            value={formatToRupiah(variant.productPrices.member)}
            type="text"
            placeholder="Rp0"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>

        <div>
          <Label htmlFor="inputTwo">Harga Normal</Label>
          <Input
            onChange={(e) => {
              const numeric = parseRupiah(e.target.value);
              onChange(index, numeric, "normal"); // kirim angka murni
            }}
            value={formatToRupiah(variant.productPrices.normal)}
            type="text"
            placeholder="Rp0"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>
        
      </div>
      <div className=" flex flex-col gap-4">
        <div>
          <Label htmlFor="inputTwo">Ukuran</Label>
          <Input
            value={variant.size ?? ""}
            onChange={(val) => onChange(index, val.target.value, "size")}
            type="string"
            placeholder="XL"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
          />
        </div>
        <div className=" mt-4">
          <Label htmlFor="inputTwo">Warna</Label>
          <Input
            value={variant.color ?? ""}
            type="text"
            placeholder="Merah"
            onChange={(val) => onChange(index, val.target.value, "color")}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="inputTwo">Stok</Label>
        <Input
          value={variant.stock ?? ""}
          onChange={(val) => onChange(index, val.target.value, "stock")}
          type="number"
          placeholder="20"
          className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
        />
      </div>
      {index == 0 ? null : (
        <button
          onClick={() => onDelete(index)}
          className="absolute top-1 right-0 text-red-500 hover:text-red-700 transition-colors"
        >
          <TiDeleteOutline size={30} />
        </button>
      )}
    </div>
  );
}
