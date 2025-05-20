import React from "react";
import Select from "../../components/form/Select";

interface Option {
  value: string;
  label: string;
}

interface FilterItem {
  label: string;
  name: string;
  options: Option[];
}

interface FilterOrderDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const filterOptions: Option[] = [
  { value: "", label: "Pilih Filter" },
  { value: "orderId", label: "Order ID" },
  { value: "customerName", label: "Nama Customer" },
  { value: "productName", label: "Nama Produk" },
  { value: "sku", label: "SKU" },
  { value: "resiNumber", label: "No Resi" },
  { value: "customerPhone", label: "Telp Customer" },
  { value: "shipperTrackingId", label: "Shipper Tracking ID" },
];

const filters: FilterItem[] = [
  {
    label: "Filter Order",
    name: "orderFilter",
    options: filterOptions,
  },
];

const FilterOrderDropdown: React.FC<FilterOrderDropdownProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
      {filters.map(({ label, name, options }) => (
        <div key={name} className="relative w-full max-w-xs">
          <label className="block text-sm font-bold mb-1">{label}</label>
          <div className="relative">
            <Select
              className="w-full border px-3 py-2 rounded-xl text-sm bg-white appearance-none"
              value={value}
              onChange={onChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
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
  );
};

export default FilterOrderDropdown;
