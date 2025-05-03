import { TiDeleteOutline } from "react-icons/ti";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import DropzoneComponent from "./ImageProduk";

type BarisInput = {
  image: string;
  hargaBeli: number | null;
  hargaNormal: number | null;
  hargaReseler: number | null;
  varian?: string;
  warna?: string;
  stok: number | null;
};

type Props = {
  varian: BarisInput;
  setVarian: React.Dispatch<React.SetStateAction<BarisInput[]>>;
  index: number;
  onDelete: (index: number) => void;
};

export default function VarianProduk({
  varian,
  setVarian,
  index,
  onDelete,
}: Props) {
  console.log(varian);
  console.log(setVarian);
  return (
    <div className="relative border rounded-2xl p-4 shadow-md mb-4 flex justify-evenly gap-6 whitespace-nowrap items-start">
      <DropzoneComponent />
      <div>
        <Label htmlFor="inputTwo">SKU</Label>
        <Input type="text" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="inputTwo">Harga Belii</Label>
          <Input type="number" />
        </div>
        <hr />
        <div>
          <Label htmlFor="inputTwo">Harga Jual Normal</Label>
          <Input type="number" />
        </div>
        <div>
          <Label htmlFor="inputTwo">Harga Jual Reseller</Label>
          <Input type="number" />
        </div>
      </div>
      <div className=" flex flex-col gap-4">
        <div>
          <Label htmlFor="inputTwo">Ukuran</Label>
          <Input type="number" />
        </div>
        <div className=" mt-4">
          <Label htmlFor="inputTwo">Warna</Label>
          <Input type="text" />
        </div>
      </div>
      <div>
        <Label htmlFor="inputTwo">Stok</Label>
        <Input type="number" />
      </div>
      <button
        onClick={() => onDelete(index)}
        className="absolute top-1 right-0 text-red-500 hover:text-red-700 transition-colors"
      >
        <TiDeleteOutline size={30} />
      </button>
    </div>
  );
}
