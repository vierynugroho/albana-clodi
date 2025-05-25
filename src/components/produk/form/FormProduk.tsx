import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Radio from "../../form/input/Radio";
import ManageProduk from "../switch/ManageProduk";
import ManagePrivorAndStorefront from "../switch/ManagePrivorAndStorefront";
import VarianProduk from "./VarianProduk";
import Button from "../button/Button";
import { GiWeight } from "react-icons/gi";
import { CiDiscount1 } from "react-icons/ci";
import { createProduct, ProductVariant } from "../../../service/product";

type SwichStatesType = {
  varian: boolean;
  diskon: boolean;
  grosir: boolean;
};

const defaultVariant = (): ProductVariant => ({
  sku: "",
  stock: 0,
  size: "",
  color: "",
  imageUrl: null ,
  barcode: "",
  productPrices: {
    normal: 0,
    buy: 0,
    reseller: 0,
    agent: 0,
    member: 0,
  },
});

const options = [
  { value: "BARANG_STOK_SENDIRI", label: "Barang Stock Sendiri" },
  { value: "BARANG_SUPLIER_LAIN", label: "Barang Suplier Lain" },
  { value: "BARANG_PRE_ORDER", label: "Barang Pre-Order" },
];

const categoryProducts = [
  {
    value: "b4788f9c-a24b-48f0-a7ba-3e86f4149248",
    label: "Kaos",
  },
  {
    value: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    label: "Kemeja",
  },
  {
    value: "5c9d8a34-3a71-4de1-9b8a-fb0dc9f9e1cc",
    label: "Hoodie",
  },
];

export default function FormProduk() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [switchStates, setSwitchStates] = useState<SwichStatesType>({
    varian: false,
    diskon: false,
    grosir: false,
  });
  const [categoryId, setCategoryId] = useState<string>("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productWeight, setProductWeight] = useState(0);
  const [varian, setVarian] = useState<ProductVariant[]>([defaultVariant()]);
  const [diskon, setDiskon] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSwitchChange = (
    key: keyof typeof switchStates,
    value: boolean
  ) => {
    setSwitchStates((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (value: string) => {
    setCategoryId(value);
  };

  const addVariantComponent = () => {
    setVarian((prev) => [...prev, defaultVariant()]);
  };

  const deleteVariant = (index: number) => {
    setVarian((prev) => prev.filter((_, i) => i !== index));
  };

  const renderRadio = (value: string, label: string) => {
    const id = `radio-${value}`;
    return (
      <div key={id} className="md:flex-1 max-md:w-full">
        <div
          className={`${
            selectedValue === value
              ? "border-brand-500 bg-brand-900/25 text-brand-500"
              : "border-gray-300 text-gray-600"
          } flex-auto h-20 border-2 rounded-2xl `}
        >
          <Radio
            id={id}
            name="group1"
            value={value}
            checked={selectedValue === value}
            onChange={handleRadioChange}
            label={label}
            className="p-2 w-full h-20"
          />
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const payload = {
      product: {
        name: productName,
        description: productDescription,
        type: selectedValue,
        isPublish: true,
        weight: productWeight,
        categoryId,
      },
      productDiscount: {
        type: "PERCENTAGE",
        value: Number(diskon),
        startDate: "",
        endData: "",
      },
      productVariants: varian,
    };
    console.log(payload);
    const result = await createProduct(payload);
    setLoading(false);
    if (result.success) {
      console.log("Berhasil:", result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <div className="flex gap-4 max-xl:flex-col">
        <div className="flex flex-col gap-y-5">
          <ComponentCard title="Informasi Produk" className="md:min-w-[780px]">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputTwo">Nama Produk</Label>
                <Input
                  type="text"
                  placeholder="Baju Anak"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <Label>Kategori</Label>
                <Select
                  options={categoryProducts}
                  placeholder="Pilih Kategori Produk"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Jenis Produk</Label>
                <div className="flex flex-wrap items-center gap-8">
                  {options.map((opt) => {
                    return renderRadio(opt.value, opt.label);
                  })}
                </div>
              </div>

              <div>
                <Label>Deskripsi Produk</Label>
                <textarea
                  id="productDescription"
                  placeholder="Tulis deskripsi produk di sini..."
                  className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-5">
                <div>
                  {" "}
                  <Label>Berat</Label>
                  <div className="relative">
                    <Input
                      placeholder="Berat (kg)"
                      type="number"
                      min="0"
                      className="pl-[62px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
                      value={productWeight == 0 ? "" : productWeight}
                      onChange={(e) => setProductWeight(Number(e.target.value))}
                    />
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                      <GiWeight className="size-6" />
                    </span>
                  </div>
                </div>

                {switchStates.diskon ? (
                  <div>
                    {" "}
                    <Label>Diskon</Label>
                    <div className="relative">
                      <Input
                        value={diskon}
                        onChange={(e) => setDiskon(e.target.value)}
                        placeholder="10(nilai persen)"
                        type="number"
                        min="0"
                        className="pl-[62px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
                      />
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <CiDiscount1 className="size-6" />
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Manage Produk */}
        <div className="flex flex-col gap-7 flex-1">
          <ManageProduk
            title="Atur Produk"
            switchStates={switchStates}
            onSwitchChange={handleSwitchChange}
          />
          <ManagePrivorAndStorefront title="Atur Privor & Storefront" />
          <Button className="hover:bg-black" onClick={handleSubmit}>
            {loading ? "Menambahkan Produk" : "Tambah Produk"}
          </Button>
          {error && <section className="text-red-600">{error}</section>}
        </div>
      </div>

      <div className="overflow-auto">
        <div className=" p-4 mt-5 bg-brand-900 rounded-2xl max-w-full lg:max-w-[791px] min-w-[791px]">
          <div className="grid grid-cols-5 ml-15 content-center text-sky-50 ">
            {" "}
            <h2>Gambar</h2>
            <h2>Spesifikasi</h2>
            <h2>Harga</h2>
            <h2>Variant</h2>
            <h2>Stok</h2>
          </div>
        </div>

        {/* Variant Produk */}
        {varian.map((_, index) => (
          <ComponentCard
            key={index + 1}
            title={`Variant ${index + 1}`}
            className="mt-5 max-lg:max-w-full lg:max-w-[791px] min-w-[791px] relative"
          >
            <VarianProduk
              setVarian={setVarian}
              index={index}
              onDelete={deleteVariant}
            />
          </ComponentCard>
        ))}
        {switchStates.varian ? (
          <div>
            <Button className="mt-5" onClick={addVariantComponent}>
              Tambah Varian
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
