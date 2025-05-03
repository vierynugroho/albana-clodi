import ComponentCard from "../../common/ComponentCard";
import Input from "../../form/input/InputField";
import { TiMinusOutline } from "react-icons/ti";

type BarisInput = {
  minJumlah: string;
  maxJumlah: string;
  hargaSatuan: string;
};

type Props = {
  rows: BarisInput[];
  setRows: React.Dispatch<React.SetStateAction<BarisInput[]>>;
};

export default function GrosirProduk({ rows, setRows }: Props) {
  const handleChange = (
    index: number,
    field: keyof BarisInput,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleBlur = (index: number, field: keyof BarisInput) => {
    const num = Number(rows[index][field]);
    if (num < 0) {
      const newRows = [...rows];
      newRows[index][field] = String(Math.abs(num));
      setRows(newRows);
    }
  };
  return (
    <ComponentCard title="Harga Grosir">
      <div className="space-y-5 sm:space-y-6">
        {rows.map((row, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <div className="flex flex-col gap-2 mr-10 w-80">
              {index === 0 && (
                <h1 className="font-bold">Rentang Jumlah Barang</h1>
              )}
              <div className="flex">
                <Input
                  type="number"
                  min="0"
                  value={row.minJumlah}
                  onChange={(e) =>
                    handleChange(index, "minJumlah", e.target.value)
                  }
                  onBlur={() => handleBlur(index, "minJumlah")}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
                />
                <TiMinusOutline className="w-16 h-9" />
                <Input
                  type="number"
                  min="0"
                  value={row.maxJumlah}
                  onChange={(e) =>
                    handleChange(index, "maxJumlah", e.target.value)
                  }
                  onBlur={() => handleBlur(index, "maxJumlah")}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-auto">
              {index === 0 && <h1 className="font-bold">Harga Satuan</h1>}
              <Input
                type="number"
                min="0"
                value={row.hargaSatuan}
                onChange={(e) =>
                  handleChange(index, "hargaSatuan", e.target.value)
                }
                onBlur={() => handleBlur(index, "hargaSatuan")}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
                placeholder="Rp.0"
              />
            </div>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
