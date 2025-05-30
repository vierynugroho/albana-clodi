import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import PhoneInput from "../../form/group-input/PhoneInput";
import Button from "../../ui/button/Button";
import SupplierPageBreadcrumb from "../SupplierPageBreadscrumb";

export default function SupplierSettingForm() {
  const countries = [{ code: "IND", label: "+62" }];
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    phone: "",
    address: "",
    notes: "",
  });

  return (
    <div className="max-w-5xl mx-auto">
      <SupplierPageBreadcrumb pageTitle="Tambah Asal Pengiriman" />
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="px-2">
          <p className="text-2xl font-bold">Pengaturan supplier</p>
          <p className="text-lg text-gray-500">Ubah data supplier</p>
        </div>
        <hr className="my-4 border-gray-200" />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-start">Nama Toko</Label>
              <Input
                placeholder="Masukkan nama toko"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-start">Lokasi Asal Pengiriman</Label>
              <Input
                placeholder="Contoh: Kota Malang"
                type="text"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-start">No. Handphone / Telepon</Label>
              <PhoneInput
                selectPosition="start"
                countries={countries}
                placeholder="08965517762"
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            </div>
          </div>

          <div>
            <Label className="text-start">Alamat</Label>
            <Input
              placeholder="Masukkan alamat lengkap"
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div>
            <Label className="text-start">Keterangan</Label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-400 dark:border-gray-700 dark:placeholder:text-gray-600"
              rows={3}
              placeholder="Tambahkan keterangan (opsional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <Button className="mt-4">Simpan</Button>
        </div>
      </div>
    </div>
  );
}
