import ComponentCard from "../../common/ComponentCard";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Select from "../../form/Select";
import SearchableDropdown from "../../produk/input/SearchDropdown";
import { useState } from "react";
import Button from "../../ui/button/Button";

type OptionsDropdows = {
  id: number;
  name: string;
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

export default function FormCustomer() {
  const [value, setValue] = useState("");
  const [listKecamatan, setListKecamatan] = useState<OptionsDropdows[]>([]);
  console.log(listKecamatan);

  function handleChange(value: string) {
    console.log(value);
  }
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
                onChange={handleChange}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1/3">
              <Label htmlFor="inputTwo">Nama Lengkap Customer</Label>
              <Input
                type="text"
                id="inputTwo"
                placeholder="Isi Nama Customer"
              />
            </div>

            <div className="flex-1/3">
              <Label>Provinsi</Label>
              <SearchableDropdown
                options={provinsi}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
                setListProduk={setListKecamatan}
              />
            </div>

            <div className="flex-1/3">
              <Label>Kota/Kabupaten</Label>
              <SearchableDropdown
                options={kabupatenAtauKota}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
                setListProduk={setListKecamatan}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kecamatan</Label>
              <SearchableDropdown
                options={kecamatan}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
                setListProduk={setListKecamatan}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kode Pos</Label>
              <Input
                type="number"
                id="inputTwo"
                placeholder="99102"
                min="0"
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
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>
            <div className="flex-1/3">
              <Label>No Telepon</Label>
              <Input
                type="number"
                id="inputTwo"
                placeholder="0897662516"
                min="0"
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>

            <div className="flex-auto">
              <Label>Alamat Lengkap</Label>
              <textarea
                id="addres"
                placeholder="JL Melati No 10 ...."
                className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none  dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
              />
            </div>
            
            <Button size="md" className="w-full">Tambah Customer</Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Kategori Customer" className="flex-1/4">
          <ul className="space-y-5 text-sm">
            <li className="p-4 border rounded shadow-sm">
              <strong className="block text-base">Customer</strong>
              <p className="text-gray-600">
                Pelanggan biasa yang mendapatkan harga normal.
              </p>
            </li>
            <li className="p-4 border rounded shadow-sm">
              <strong className="block text-base">Reseller</strong>
              <p className="text-gray-600">
                Customer yang mendapatkan potongan harga khusus untuk penjualan
                kembali.
              </p>
            </li>
            <li className="p-4 border rounded shadow-sm">
              <strong className="block text-base">Agent</strong>
              <p className="text-gray-600">
                Perantara yang biasanya memiliki kuota atau target penjualan
                tertentu.
              </p>
            </li>
            <li className="p-4 border rounded shadow-sm">
              <strong className="block text-base">Member</strong>
              <p className="text-gray-600">
                Customer yang telah mendaftar sebagai anggota dan mungkin
                mendapatkan promo atau akses khusus.
              </p>
            </li>
            <li className="p-4 border rounded shadow-sm">
              <strong className="block text-base">Dropshiper</strong>
              <p className="text-gray-600">
                Customer dengan harga normal, tetapi alamat pengiriman memakai
                data customer dropship.
              </p>
            </li>
          </ul>
        </ComponentCard>
      </div>
    </div>
  );
}
