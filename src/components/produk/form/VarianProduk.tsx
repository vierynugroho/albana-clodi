import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import DropzoneComponent from "./ImageProduk";

export default function VarianProduk() {
  return (
    <div className="flex justify-evenly gap-6 whitespace-nowrap">
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
    </div>
  );
}
