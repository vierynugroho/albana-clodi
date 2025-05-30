import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import SupplierPageBreadcrumb from "../SupplierPageBreadscrumb";

export default function FormSettingAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Owner",
  });

  return (
    <div className="max-w-5xl mx-auto">
      <SupplierPageBreadcrumb pageTitle="Tambah User" />
      <div className="flex flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="flex flex-col gap-5">
              <div>
                <Label className="text-start">Nama lengkap</Label>
                <Input
                  placeholder="Nama lengkap"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-start">Email</Label>
                <Input
                  placeholder="Alamat email yang valid"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-start">Password</Label>
                <Input
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-start">Konfirmasi password</Label>
                <Input
                  placeholder="Ulangi password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="text-sm text-gray-500 my-5 py-2 border border-gray-200 bg-gray-100 rounded-lg p-4">
                  <p>Password harus memenuhi kriteria di bawah ini:</p>
                  <ul className="list-disc ml-5">
                    <li>Ada huruf besar</li>
                    <li>Ada huruf kecil</li>
                    <li>Ada angka</li>
                    <li>Ada simbol spesial @ & atau tanda lainnya</li>
                  </ul>
                </div>
              </div>

              <div>
                <Label className="text-start">Peran</Label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Shipper</option>
                </select>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Handle form submission
                    console.log(formData);
                  }}>
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-4">
            <h3 className="font-semibold mb-4">Penjelasan peran</h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Owner:</span>
                <p className="text-gray-600 dark:text-gray-300">
                  pemilik usaha dan bisa mengakses semua fitur di SmartSeller.
                </p>
              </div>
              <div>
                <span className="font-medium">Admin:</span>
                <p className="text-gray-600 dark:text-gray-300">
                  karyawan yang membantu mengelola order di toko. Mendapat hak
                  akses fitur terbatas.
                </p>
              </div>
              <div>
                <span className="font-medium">Shipper:</span>
                <p className="text-gray-600 dark:text-gray-300">
                  karyawan yang bertugas mengirim barang. Ia hanya memiliki hak
                  akses fitur terkait pengiriman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
