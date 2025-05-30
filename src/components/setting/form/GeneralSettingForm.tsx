import { useEffect, useRef, useState } from "react";
import PhoneInput from "../../form/group-input/PhoneInput";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import DropzoneImage from "./DropzoneImage";
import { FaWarehouse } from "react-icons/fa";
import Button from "../../ui/button/Button";
import {
  ServiceForm,
  getServiceForm,
  createServiceForm,
} from "../../../service/shopSetting";
import toast, { Toaster } from "react-hot-toast";

export default function GeneralSettingForm() {
  const dataIsExist = useRef<boolean>(false);
  const countries = [{ code: "IND", label: "+62" }];
  const [formData, setFormData] = useState<ServiceForm>({
    name: "",
    description: "",
    email: "albana@gmail.com",
    phoneNumber: "",
    address: "",
    owner: "",
    logo: null,
    banner: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await getServiceForm(token);
      if (response.success && response.responseObject) {
        dataIsExist.current = true;
        setFormData(response.responseObject);
      }
    };

    fetchData();
  }, []);
  console.log(formData);

  const handleSubmit = async () => {
    const response = await createServiceForm(dataIsExist.current, formData);
    if (response.success) {
      // Handle success
      toast.success(response.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    } else {
      // Handle error
      toast.error(response.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
      console.error(response);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Toaster />
      <div className="flex gap-6">
        <div>
          <Label htmlFor="inputLogo">Logo Perusahaan</Label>
          <div className="flex flex-col gap-2">
            <DropzoneImage
              imageUrl={String(formData.logo)}
              onChange={(file) => setFormData({ ...formData, logo: file })}
            />
            <Button
              className="bg-red-600 hover:bg-red-700"
              size="sm"
              onClick={() => setFormData({ ...formData, logo: null })}
            >
              Hapus Logo
            </Button>
          </div>
        </div>

        <div className="flex flex-1 gap-3">
          {/* Kolom Kiri */}
          <div className=" mt-3 flex-1 flex flex-col gap-4 justify-around">
            <div>
              <Label className="text-start">Nama Toko</Label>
              <div className="relative">
                <Input
                  placeholder="Albana Grosir"
                  type="text"
                  className="pl-[62px]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <FaWarehouse className="size-6" />
                </span>
              </div>
            </div>

            <div>
              <Label className="text-start">No Telepon</Label>
              <div className="relative">
                <PhoneInput
                  selectPosition="start"
                  countries={countries}
                  placeholder="08965517762"
                  defaulNumber={formData.phoneNumber}
                  onChange={(value) =>
                    setFormData({ ...formData, phoneNumber: value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
        </div>
      </div>
      <div className=" flex flex-col gap-4">
        <div>
          <Label className="text-start">Alamat</Label>
          <div className="relative">
            <Input
              placeholder="JL Muara No 10 Blitar"
              type="text"
              className="pl-[62px]"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <FaWarehouse className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label className="text-start">Deskripsi</Label>
          <textarea
            id="productDescription"
            placeholder="Tulis deskripsi produk di sini..."
            className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      </div>
      <Button className="hover:bg-brand-300" onClick={handleSubmit}>
        Simpan Pengaturan
      </Button>
    </div>
  );
}
