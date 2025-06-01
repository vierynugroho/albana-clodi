import React from "react";
import Checkbox from "../../form/input/Checkbox";
import Label from "../../form/Label";
import Select from "../../form/Select";

type PropsSettingBarcode = {
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setColumBarcode: React.Dispatch<React.SetStateAction<string>>;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceExist: React.Dispatch<React.SetStateAction<boolean>>;
  nameExist: boolean;
  priceExist: boolean;
};

export default function SettingBarcode({
  setColumBarcode,
  setHeight,
  setNameExist,
  setPriceExist,
  nameExist,
  priceExist,
}: PropsSettingBarcode) {
  const optionsLabel = [
    { value: "15", label: "33 x 15 mm" },
    { value: "19", label: "33 x 19 mm" },
    { value: "25", label: "33 x 25 mm" },
  ];

  const columnCountOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Ukuran Label</Label>
        <Select
          options={optionsLabel}
          placeholder="Select Option"
          onChange={(value: string) => {
            setHeight(value);
          }}
          className="dark:bg-dark-900"
        />
      </div>

      <div>
        <Label>Jumlah Kolom</Label>
        <Select
          options={columnCountOptions}
          placeholder="Select Option"
          onChange={(value: string) => {
            setColumBarcode(value);
          }}
          className="dark:bg-dark-900"
        />
      </div>

      <div className="flex flex-col">
        <Label>Data Yang Dicetak</Label>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={nameExist} onChange={setNameExist} label="SKU" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={priceExist}
              onChange={setPriceExist}
              label="Harga"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
