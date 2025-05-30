import ComponentCard from "../../common/ComponentCard";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Select from "../../form/Select";
import SearchableDropdown from "../input/SearchDropdown";
import { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import CustomerCategoryList from "../categoryCustomer/CustomerCategoryList";
import {
  City,
  District,
  getCities,
  getDistricts,
  getProvinces,
  getVillages,
  Province,
  Village,
} from "../../../service/region";
import {
  createCustomer,
  detailCustomer,
  editCustomer,
} from "../../../service/customer";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";

type FormCustomer = {
  category: string;
  name: string;
  province: string;
  city: string;
  district: string;
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
  { value: "dropshipper", label: "Dropshiper" },
];

export default function FormCustomer() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    provinceId: "",
    provinceName: "",
    cityId: "",
    cityName: "",
    districtId: "",
    districtName: "",
    villageId: "",
    villageName: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [categoryUser, setCategoryUser] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [isLoading, setIsLoading] = useState({
    provinces: false,
    cities: false,
    districts: false,
    villages: false,
  });
  console.log(isLoading);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const getDetailCostumer = async () => {
        const data = await detailCustomer(id);
        const customerDetail = data.responseObject;
        console.log(customerDetail);
        if (customerDetail) {
          setFormData((prev) => ({
            ...prev,
            id: customerDetail.id,
            name: customerDetail.name,
            phoneNumber:customerDetail.phoneNumber,
            category: customerDetail.category.toLowerCase(),
            provinceName: customerDetail.province,
            cityName: customerDetail.city,
            districtName: customerDetail.district,
            villageName: customerDetail.village,
            postalCode: customerDetail.postalCode,
            email: customerDetail.email,
            address: customerDetail.address,
          }));
          setCategoryUser(customerDetail.category.toLowerCase());
        }
      };
      getDetailCostumer();
    }
  }, [id]);
  useEffect(() => {
    async function fetchProvinces() {
      setIsLoading((prev) => ({ ...prev, provinces: true }));
      const response = await getProvinces();
      if (response.success && response.responseObject) {
        setProvinces(response.responseObject);
      }
      setIsLoading((prev) => ({ ...prev, provinces: false }));
    }

    fetchProvinces();
  }, [formData.provinceId]);

  useEffect(() => {
    async function fetchCities() {
      if (!formData.provinceId) return;

      setIsLoading((prev) => ({ ...prev, cities: true }));
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        cityId: "",
        districtId: "",
        villageId: "",
      }));

      const response = await getCities(formData.provinceId);
      console.log(response);
      if (response.success && response.responseObject) {
        setCities(response.responseObject as City[]);
      }
      setIsLoading((prev) => ({ ...prev, cities: false }));
    }

    fetchCities();
  }, [formData.provinceId]);

  useEffect(() => {
    async function fetchDistricts() {
      if (!formData.cityId) return;

      setIsLoading((prev) => ({ ...prev, districts: true }));
      setDistricts([]);
      setFormData((prev) => ({ ...prev, districtId: "", villageId: "" }));

      const response = await getDistricts(formData.cityId);
      if (response.success && response.responseObject) {
        setDistricts(response.responseObject as District[]);
      }
      setIsLoading((prev) => ({ ...prev, districts: false }));
    }

    fetchDistricts();
  }, [formData.cityId]);

  useEffect(() => {
    async function fetchVillages() {
      if (!formData.districtId) return;

      setIsLoading((prev) => ({ ...prev, villages: true }));
      setVillages([]);
      setFormData((prev) => ({ ...prev, villageId: "" }));

      const response = await getVillages(formData.districtId);
      if (response.success && response.responseObject) {
        setVillages(response.responseObject as Village[]);
      }
      setIsLoading((prev) => ({ ...prev, villages: false }));
    }

    fetchVillages();
  }, [formData.districtId]);

  function handleChange<K extends keyof FormCustomer>(
    key: K,
    value: FormCustomer[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = () => {
    const payload = {
      //   id: crypto.randomUUID(),
      name: formData.name,
      category: formData.category.toUpperCase(),
      address: formData.address,
      province: formData.provinceName,
      village: formData.villageName,
      district: formData.districtName,
      city: formData.cityName,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      status: "ACTIVE",
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
    };

    // For Edit Data
    if (id) {
      editCustomer(id, payload)
        .then((response) => {
          if (response.success) {
            toast.success("Customer berhasil diPerbarui");
            setFormData({
              id: "",
              name: "",
              category: "",
              address: "",
              provinceId: "",
              provinceName: "",
              cityId: "",
              cityName: "",
              districtId: "",
              districtName: "",
              villageId: "",
              villageName: "",
              postalCode: "",
              phoneNumber: "",
              email: "",
            });
            // Redirect ke halaman customer setelah berhasil menambahkan
            window.location.href = "/customer";
          } else {
            toast.error("Customer gagal diperbarui");
            console.error("Gagal menambahkan customer:", response.message);
          }
        })
        .catch((error) => {
          console.error("Error saat menambahkan customer:", error);
        });
    } else {
      createCustomer(payload)
        .then((response) => {
          if (response.success) {
            toast.success("Customer berhasil ditambahkan");
            setFormData({
              id: "",
              name: "",
              category: "",
              address: "",
              provinceId: "",
              provinceName: "",
              cityId: "",
              cityName: "",
              districtId: "",
              districtName: "",
              villageId: "",
              villageName: "",
              postalCode: "",
              phoneNumber: "",
              email: "",
            });
            // Redirect ke halaman customer setelah berhasil menambahkan
            window.location.href = "/customer";
          } else {
            toast.error("Customer gagal ditambahkan");
            console.error("Gagal menambahkan customer:", response.message);
          }
        })
        .catch((error) => {
          console.error("Error saat menambahkan customer:", error);
        });
    }
  };

  return (
    <div className="flex gap-4 l">
      <Toaster />
      <div className="flex gap-5 w-full max-md:flex-col">
        <ComponentCard title="Informasi Customer" className="flex-1/2">
          <div className="space-y-6 flex flex-wrap gap-4">
            <div className="flex-1/3">
              <Label>Kategori Customer</Label>
              <Select
                defaultValue={categoryUser}
                options={optionsCustomers}
                placeholder="Pilih Kategori Customer"
                onChange={(val) => handleChange("category", val)}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1/3">
              <Label htmlFor="inputTwo">Nama Lengkap</Label>
              <Input
                type="text"
                id="inputTwo"
                placeholder="Isi Nama Customer"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="flex-1/3">
              <Label>Provinsi</Label>
              <SearchableDropdown
                options={provinces.map((p) => ({
                  id: Number(p.id),
                  name: p.name,
                }))}
                label="name"
                id="id"
                selectedVal={formData.provinceName}
                handleChange={(val) => {
                  const selectedProvince = provinces.find(
                    (p) => p.name === val
                  );
                  setFormData((prev) => ({
                    ...prev,
                    provinceId: selectedProvince ? selectedProvince.id : "",
                    provinceName: val,
                  }));
                }}
              />
            </div>

            <div className="flex-1/3">
              <Label>Kota/Kabupaten</Label>
              <SearchableDropdown
                options={cities.map((c) => ({
                  id: Number(c.id),
                  name: c.name,
                }))}
                label="name"
                id="id"
                selectedVal={formData.cityName}
                handleChange={(val) => {
                  const selectedCity = cities.find((c) => c.name === val);
                  setFormData((prev) => ({
                    ...prev,
                    cityId: selectedCity ? selectedCity.id : "",
                    cityName: val,
                  }));
                }}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kecamatan</Label>
              <SearchableDropdown
                options={districts.map((d) => ({
                  id: Number(d.id),
                  name: d.name,
                }))}
                label="name"
                id="id"
                selectedVal={formData.districtName}
                handleChange={(val) => {
                  const selectedDistrict = districts.find(
                    (d) => d.name === val
                  );
                  setFormData((prev) => ({
                    ...prev,
                    districtId: selectedDistrict ? selectedDistrict.id : "",
                    districtName: val,
                  }));
                }}
              />
            </div>
            <div className="flex-1/3">
              <Label>Desa/Dusun</Label>
              <SearchableDropdown
                options={villages.map((v) => ({
                  id: Number(v.id),
                  name: v.name,
                }))}
                label="name"
                id="id"
                selectedVal={formData.villageName}
                handleChange={(val) => {
                  const selectedVillage = villages.find((v) => v.name === val);
                  setFormData((prev) => ({
                    ...prev,
                    villageId: selectedVillage ? selectedVillage.id : "",
                    villageName: val,
                  }));
                }}
              />
            </div>
            <div className="flex-1/3">
              <Label>Kode Pos</Label>
              <Input
                value={formData.postalCode}
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
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none border p-2 rounded"
              />
            </div>

            <div className="w-full">
              <Label>No Telepon</Label>
              <Input
                value={formData.phoneNumber}
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
                value={formData.address}
                id="addres"
                placeholder="JL Melati No 10 ...."
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full h-32 mt-2 p-4 rounded-xl border border-gray-300 focus:outline-none  dark:bg-dark-900 dark:text-white dark:border-gray-700 resize-none"
              />
            </div>

            <Button size="md" className="w-full" onClick={handleSubmit}>
              {id ? "Edit Customer" : "Tambah Customer"}
            </Button>
          </div>
        </ComponentCard>

        <CustomerCategoryList title="Katori Customer" className="flex-1/4" />
      </div>
    </div>
  );
}
