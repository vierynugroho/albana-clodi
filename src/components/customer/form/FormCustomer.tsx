import ComponentCard from "../../common/ComponentCard";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Select from "../../form/Select";
import SearchableDropdown from "../input/SearchDropdown";
import { useState } from "react";
import Button from "../../ui/button/Button";
import CustomerCategoryList from "../categoryCustomer/CustomerCategoryList";

type FormCustomer = {
  category: string;
  fullName: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  address: string;
};

const optionsCustomers = [
  { value: "customer", label: "Customer" },
  { value: "reseller", label: "Reseller" },
  { value: "agent", label: "Agent" },
  { value: "member", label: "Member" },
  { value: "dropshiper", label: "Dropshiper" },
];

const provinsi = [{ id: 1, name: "Jawa Timur" }];

const kabupatenAtauKota = [
  { id: 1, name: "Kabupaten Blitar" },
  { id: 2, name: "Kabupaten Malang" },
  { id: 3, name: "Kabupaten Kediri" },
  { id: 4, name: "Kabupaten Tulungagung" },
  { id: 5, name: "Kabupaten Trenggalek" },
  { id: 1, name: "Kota Blitar" },
  { id: 2, name: "Kota Malang" },
  { id: 3, name: "Kota Kediri" },
  { id: 4, name: "Kota Batu" },
  { id: 5, name: "Kota Madiun" },
];

const kecamatan = [
  // Kota Blitar
  { id: 1, name: "Kepanjenkidul" },
  { id: 2, name: "Sananwetan" },
  { id: 3, name: "Sukorejo" },

  // Kabupaten Blitar
  { id: 4, name: "Bakung" },
  { id: 5, name: "Binangun" },
  { id: 6, name: "Doko" },
  { id: 7, name: "Gandusari" },
  { id: 8, name: "Garum" },
];
const desa = [
  // Kota Blitar
  { id: 1, name: "Kepanjenkidul" },
  { id: 2, name: "Sananwetan" },
  { id: 3, name: "Sukorejo" },

  // Kabupaten Blitar
  { id: 4, name: "Bakung" },
  { id: 5, name: "Binangun" },
  { id: 6, name: "Doko" },
  { id: 7, name: "Gandusari" },
  { id: 8, name: "Garum" },
];

export default function FormCustomer() {
  const [formData, setFormData] = useState<FormCustomer>({
    category: "",
    fullName: "",
    province: "",
    city: "",
    subdistrict: "",
    village: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  function handleChange<K extends keyof FormCustomer>(
    key: K,
    value: FormCustomer[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = () => {
    const payload = {
      id: crypto.randomUUID(),
      name: formData.fullName,
      category: formData.category.toUpperCase(),
      address: formData.address,
      subdistrict: formData.subdistrict,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      destinationId: 12345,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="flex gap-4 l">
      <div className="flex gap-5 w-full max-md:flex-col">
        <ComponentCard title="Informasi Customer" className="flex-1/2">
          <div className="space-y-6 flex flex-wrap gap-4">
            <div className="flex-1/3">
              <Label>Kategori Customer</Label>
              <Select
                options={optionsCustomers}
                placeholder="Pilih Kategori Customer"
                onChange={(val) => handleChange("category", val)}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1/3">
              <Label htmlFor="inputTwo">Nama Lengkap Customer</Label>
              <Input
                type="text"
                id="inputTwo"
                placeholder="Isi Nama Customer"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            <div className="flex-1/3">
              <Label>Provinsi</Label>
              <SearchableDropdown
                options={provinsi}
                label="name"
                id="id"
                selectedVal={formData.province}
                handleChange={(val) => handleChange("province", val)}
              />
            </div>

            <div className="flex-1/3">
              <Label>Kota/Kabupaten</Label>
              <SearchableDropdown
                options={kabupatenAtauKota}
                label="name"
                id="id"
                selectedVal={formData.city}
                handleChange={(val) => handleChange("city", val)}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kecamatan</Label>
              <SearchableDropdown
                options={kecamatan}
                label="name"
                id="id"
                selectedVal={formData.subdistrict}
                handleChange={(val) => handleChange("subdistrict", val)}
              />
            </div>
            <div className="flex-1/3">
              <Label>Desa/Dusun</Label>
              <SearchableDropdown
                options={desa}
                label="name"
                id="id"
                selectedVal={formData.village}
                handleChange={(val) => handleChange("village", val)}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kode Pos</Label>
              <Input
                type="number"
                id="inputTwo"
                placeholder="99102"
                min="0"
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>
            <div className="flex-1/3">
              <Label>Email</Label>
              <Input
                type="text"
                id="inputTwo"
                placeholder="my@gmail.com"
                min="0"
                onChange={(e) => handleChange("email", e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>

            <div className="w-full">
              <Label>No Telepon</Label>
              <Input
                type="number"
                id="inputTwo"
                placeholder="0897662516"
                min="0"
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>

            <div className="flex-auto">
              <Label>Alamat Lengkap</Label>
              <textarea
                id="addres"
                placeholder="JL Melati No 10 ...."
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none  dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
              />
            </div>

            <Button size="md" className="w-full" onClick={handleSubmit}>
              Tambah Customer
            </Button>
          </div>
        </ComponentCard>

        <CustomerCategoryList title="Katori Customer" className="flex-1/4" />
      </div>
    </div>
  );
}
