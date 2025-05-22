import { useState } from "react";
import Checkbox from "../../form/input/Checkbox";
import Label from "../../form/Label";
import Select from "../../form/Select";

export default function SettingBarcode() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const optionsLabel = [
    { value: "33x15", label: "33 x 15 mm" },
    { value: "33x19", label: "33 x 19 mm" },
    { value: "33x25", label: "33 x 25 mm" },
  ];

  const columnCountOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Ukuran Label</Label>
        <Select
          options={optionsLabel}
          placeholder="Select Option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
        />
      </div>

      <div>
        <Label>Jumlah Kolom</Label>
        <Select
          options={columnCountOptions}
          placeholder="Select Option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
        />
      </div>

      <div className="flex flex-col">
        <Label>Data Yang Dicetak</Label>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isChecked}
              onChange={setIsChecked}
              label="Nama Produk"
            />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isCheckedTwo}
              onChange={setIsCheckedTwo}
              label="Harga"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
