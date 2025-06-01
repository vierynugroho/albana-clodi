import { useNavigate } from "react-router-dom";
import { FilterState } from "../../../pages/Order/AllOrder";
import DatePicker from "../../form/date-picker";
import Label from "../../form/Label";
import Select from "../../form/Select";
import Button from "../../ui/button/Button";

type Props = {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onFilter: () => void;
};
export default function FilterOrder({ filter, setFilter, onFilter }: Props) {

  const navigate = useNavigate();
  const filters = [
    {
      label: "Status Order",
      name: "orderStatus",
      options: [
        { value: "", label: "Semua" },
        { value: "belum-diproses", label: "Belum Diproses" },
        { value: "diproses", label: "Diproses" },
        { value: "dikirim", label: "Dikirim" },
        { value: "selesai", label: "Selesai" },
      ],
    },
    {
      label: "Kategori Customer",
      name: "customerCategory",
      options: [
        { value: "", label: "Semua" },
        { value: "RESELLER", label: "Reseller" },
        { value: "ENDUSER", label: "End User" },
      ],
    },
    {
      label: "Status Pembayaran",
      name: "paymentStatus",
      options: [
        { value: "", label: "Semua" },
        { value: "belum-bayar", label: "Belum Bayar" },
        { value: "cicilan", label: "Cicilan" },
        { value: "lunas", label: "Lunas" },
      ],
    },
    {
      label: "Sales Channel",
      name: "salesChannelId",
      options: [
        { value: "", label: "Semua" },
        { value: "SHOPEE", label: "Shopee" },
        { value: "TOKOPEDIA", label: "Tokopedia" },
      ],
    },
    {
      label: "Tempat Pengiriman",
      name: "deliveryPlaceId",
      options: [
        { value: "", label: "Semua" },
        { value: "GUDANGUTAMA", label: "Gudang Utama" },
      ],
    },
    {
      label: "Produk",
      name: "productId",
      options: [
        { value: "", label: "Semua" },
        { value: "produk-sendiri", label: "Produk Sendiri" },
        { value: "supplier-lain", label: "Supplier Lain" },
        { value: "produk-preorder", label: "Produk Pre-Order" },
      ],
    },
    {
      label: "Metode Pembayaran",
      name: "paymentMethodId",
      options: [
        { value: "", label: "Semua" },
        { value: "CASH", label: "Cash" },
        { value: "BANKTRANSFER", label: "Transfer Bank" },
      ],
    },
  ];
  const toggleFilters = [
    {
      label: "Print Label",
      name: "printLabel",
      options: [
        { value: "", label: "Semua" },
        { value: "printed", label: "Printed" },
        { value: "unprinted", label: "Unprinted" },
      ],
    },
    {
      label: "Tanggal",
      name: "tanggal",
      options: [
        { value: "", label: "Semua" },
        { value: "order", label: "Order" },
        { value: "bayar", label: "Bayar" },
      ],
    },
  ];

  const handleSelectChange = (field: string, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    const defaultFilter: FilterState = {
      ordererCustomerId: "",
      deliveryTargetCustomerId: "",
      salesChannelId: "",
      deliveryPlaceId: "",
      orderDate: "",
      orderStatus: "",
      orderMonth: "",
      orderYear: "",
      startDate: "",
      endDate: "",
      customerCategory: "",
      paymentStatus: "",
      productId: "",
      paymentMethodId: "",
      search: "",
      sort: "",
      // order: "desc",
    };

    setFilter(defaultFilter);
    localStorage.removeItem("orderFilter");

  navigate("?", { replace: true });

  onFilter();

    onFilter(); 
  };

  const saveFilter = () => {
    localStorage.setItem("orderFilter", JSON.stringify(filter));
  };

  return (
    <div
      className={`rounded-2xl mt-5 mb-5 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] `}>
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 ">
        <div className="py-2 px-4 flex items-center justify-between">
          <h3 className="text-start text-xl font-semibold ">Filter Order</h3>
          <p
            onClick={resetFilters}
            className="text-md font-semibold hover:underline cursor-pointer text-blue-600">
            Reset Filter
          </p>
        </div>

        <hr className="my-4 border-gray-300" />
        <div className="flex flex-col md:flex-row gap-8 px-3">
          <div className="flex-1 space-y-6 flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filters.map(({ label, name, options }) => (
                <div key={name} className="w-full relative">
                  <Label className="text-left font-bold mb-1 block">
                    {label}
                  </Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder={`Pilih ${label}`}
                      onChange={(value) => handleSelectChange(name, value)}
                      className="w-full h-10 pr-10 rounded-md border border-gray-300 dark:bg-dark-900"
                      defaultValue={filter[name as keyof FilterState] || ""}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 20 20">
                        <path
                          d="M6 8l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Kanan */}
          <div className="flex flex-col gap-6 min-w-[300px]">
            {toggleFilters.map(({ label, name, options }) => (
              <div key={name} className="flex flex-col gap-2">
                <Label className="text-left font-bold">{label}</Label>
                <div className="flex gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2">
                  {options.map(({ value, label: optionLabel }) => (
                    <Button
                      key={value}
                      onClick={() =>
                        setFilter((prev) => ({ ...prev, [name]: value }))
                      }
                      className={`rounded-full px-4 py-1 text-sm ${name in filter &&
                        filter[name as keyof FilterState] === value
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                        }`}
                      variant={
                        name in filter &&
                          filter[name as keyof FilterState] === value
                          ? "primary"
                          : "outline"
                      }>
                      {optionLabel}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <Label className="text-left font-bold">Range Tanggal</Label>
              <DatePicker
                id="date-picker"
                placeholder="Pilih Tanggal"
                onChange={(_, currentDateString) => {
                  const [start, end] = currentDateString || [];
                  setFilter((prev) => ({
                    ...prev,
                    startDate: start || "",
                    endDate: end || "",
                  }));
                }}
              />

            </div>
          </div>
        </div>
        <hr className="mt-4 border-gray-300 dark:border-brand-500" />
      </div>
      <div className="flex gap-3 justify-end pb-3 pr-3">
        <Button onClick={saveFilter}>Simpan Filter</Button>

        <Button onClick={onFilter}>Gunakan Filter</Button>
      </div>
    </div>
  );
}
