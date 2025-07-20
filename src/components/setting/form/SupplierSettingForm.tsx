import { useEffect, useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import PhoneInput from "../../form/group-input/PhoneInput";
import Button from "../../ui/button/Button";
import SupplierPageBreadcrumb from "../SupplierPageBreadscrumb";
import {
  CreateSupplier,
  createSupplier,
  editSupplier,
  getDetailSupplier,
} from "../../../service/shopSetting/supplier";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export default function SupplierSettingForm() {
  const { id } = useParams();
  const countries = [{ code: "IND", label: "+62" }];
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateSupplier>({
    name: "",
    phoneNumber: "",
    address: "",
    subdistrict: "",
    description: "",
  });

  // when Id Exist
  useEffect(() => {
    if (id) {
      const getDetailDataSupplier = async () => {
        const result = await getDetailSupplier(id);

        if (result.statusCode && result.responseObject) {
          setFormData(result.responseObject);
        } else {
          toast.error("Gagal Mendapatkan Data Supplier", {
            style: { marginTop: "10vh", zIndex: 100000 },
          });
          console.error(result);
        }
      };

      getDetailDataSupplier();
    }
  }, [id]);

  const handleEdit = async () => {
    setLoading(true);
    console.log(formData);
    if (id) {
      const result = await editSupplier(id, formData);
      if (result.success) {
        toast.success("Berhasil Memperbarui Data", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      } else {
        toast.error("Gagal membuat Data Supplier", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await createSupplier(formData);
    if (result.success) {
      toast.success(result.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    } else {
      toast.error("Gagal membuat Data Supplier", {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }
    setLoading(false);
  };

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
                value={formData.subdistrict}
                onChange={(e) =>
                  setFormData({ ...formData, subdistrict: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-start">No. Handphone / Telepon</Label>
              <PhoneInput
                selectPosition="start"
                countries={countries}
                defaulNumber={formData.phoneNumber}
                placeholder="08965517762"
                onChange={(value) =>
                  setFormData({ ...formData, phoneNumber: value })
                }
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button
            className="mt-4"
            onClick={() => (id ? handleEdit() : handleSubmit())}
          >
            {loading ? "Menyimpan Data.." : id ? "Edit Data" : "Simpan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
