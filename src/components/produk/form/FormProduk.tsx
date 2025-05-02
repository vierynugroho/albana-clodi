import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Radio from "../../form/input/Radio";
import PhoneInput from "../../form/group-input/PhoneInput";
import ManageProduk from "../switch/ManageProduk";
import ManagePrivorAndStorefront from "../switch/ManagePrivorAndStorefront";
import VarianProduk from "./VarianProduk";

export default function FormProduk() {
  const [selectedValue, setSelectedValue] = useState<string>("option1");
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  // Select Change
  const [switchStates, setSwitchStates] = useState({
    varian: false,
    diskon: false,
    grosir: false,
  });

  const handleSwitchChange = (
    key: keyof typeof switchStates,
    value: boolean
  ) => {
    setSwitchStates((prev) => ({ ...prev, [key]: value }));
  };

  // Select Option
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  // Phone Data
  const countries = [
    { code: "KG", label: "1" },
    { code: "GRAM", label: "1" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  return (
    <div>
      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex flex-col gap-y-5 ">
          <ComponentCard title="Informasi Produk" className="xl:w-205 flex-initial">
            <form action="">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="inputTwo">Nama Produk</Label>
                  <Input
                    type="text"
                    id="inputTwo"
                    placeholder="Isi Nama Produk"
                  />
                </div>
                <div>
                  <Label>Kategori</Label>
                  <Select
                    options={options}
                    placeholder="Pilih Kategori Produk"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                </div>
                <div>
                  <Label>Jenis Produk</Label>

                  <div className="flex flex-wrap items-center gap-8">
                    <div
                      className={`${
                        selectedValue === "option1"
                          ? "border-brand-500 bg-brand-900/25 text-brand-500"
                          : "border-gray-300 text-gray-600"
                      } w-50 h-20 border-2 rounded-2xl flex-1`}
                    >
                      <Radio
                        id="radio1"
                        name="group1"
                        value="option1"
                        checked={selectedValue === "option1"}
                        onChange={handleRadioChange}
                        label="Barang Stock Sendiri"
                        className="p-2 w-50 h-20"
                      />
                    </div>

                    <div
                      className={`${
                        selectedValue === "option2"
                          ? "border-brand-500 bg-brand-900/25 text-brand-500"
                          : "border-gray-300 text-gray-600"
                      } w-50 h-20 border-2 rounded-2xl flex-1`}
                    >
                      <Radio
                        id="radio2"
                        name="group1"
                        value="option2"
                        checked={selectedValue === "option2"}
                        onChange={handleRadioChange}
                        label="Barang Suplier Lain"
                        className="p-2 w-50 h-20"
                      />
                    </div>

                    <div
                      className={`${
                        selectedValue === "option3"
                          ? "border-brand-500 bg-brand-900/25 text-brand-500"
                          : "border-gray-300 text-gray-600"
                      } w-50 h-20 border-2 rounded-2xl flex-1`}
                    >
                      <Radio
                        id="radio3"
                        name="group1"
                        value="option3"
                        checked={selectedValue === "option3"}
                        onChange={handleRadioChange}
                        label="Barang Pre-Order"
                        className="p-2 w-50 h-20"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Deskripsi Produk</Label>
                  <textarea
                    id="productDescription"
                    placeholder="Tulis deskripsi produk di sini..."
                    className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
                  />
                </div>
                <div className="flex gap-5">
                  <div>
                    {" "}
                    <Label>Berat</Label>
                    <PhoneInput
                      selectPosition="end"
                      countries={countries}
                      placeholder="1 KG"
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                  {switchStates.diskon ? (
                    <div>
                      {" "}
                      <Label>Diskon</Label>
                      <PhoneInput
                        selectPosition="end"
                        countries={countries}
                        placeholder="10 %"
                        onChange={handlePhoneNumberChange}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
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
        </div>
      </div>
      <div className="overflow-auto">
        <div className=" p-4 mt-5 bg-brand-900 rounded-2xl max-w-[820px] min-w-[820px]">
          <div className="grid grid-cols-5 ml-8 content-center text-sky-50 ">
            {" "}
            <h2>Gambar</h2>
            <h2>Spesifikasi</h2>
            <h2>Harga</h2>
            <h2>Varian</h2>
            <h2>Stok</h2>
          </div>
        </div>

        {/* Variant Produk */}
        <ComponentCard
          title="Variant 1"
          className="mt-5 max-w-[820px] min-w-[820px]"
        >
          <VarianProduk />
        </ComponentCard>
      </div>
    </div>
  );
}
