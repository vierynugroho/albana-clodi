import { OptionProps } from "react-select";
import { TCustomer, TDeliveryPlace } from "../../../service/order/create-order.type";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import Label from "../../form/Label";
import { fetchCustomers } from "../../../service/order/order.service";

export const CustomOption = (
  props: OptionProps<CustomerOption, false>
) => {
  const { data, innerRef, innerProps, isFocused } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`p-3 cursor-pointer ${
        isFocused ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
      }`}
    >
      <div className="font-semibold">{data.customer.name}</div>
      <div className="text-sm text-gray-500">{data.customer.address}</div>
    </div>
  );
};

export const DeliveryOption = (
  props: OptionProps<{ place: TDeliveryPlace }, false>
) => {
  const { data, innerRef, innerProps, isFocused } = props;
  console.log("DeliveryOption data:", data);
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`p-3 cursor-pointer ${
        isFocused ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
      }`}
    >
      <div className="font-semibold">{data.place.name}</div>
      <div className="text-sm text-gray-500">{data.place.address}</div>
    </div>
  );
};

type CustomerOption = {
  label: string;
  value: string;
  customer: TCustomer;
};

export const CustomerSelect = ({
  label,
  selectedCustomer,
  onSelect,
}: {
  label: string;
  selectedCustomer: TCustomer | null;
  onSelect: (customer: TCustomer | null) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const option: CustomerOption | null = selectedCustomer
    ? {
        label: `${selectedCustomer.name} | ${selectedCustomer.city}, ${selectedCustomer.province}`,
        value: selectedCustomer.id,
        customer: selectedCustomer,
      }
    : null;

  return (
    <div>
      <Label className="font-semibold text-md">{label}</Label>
      <div className="w-full">
        {isEditing ? (
          <AsyncSelect
            cacheOptions
            defaultOptions={option ? [option] : []}
            loadOptions={fetchCustomers}
            value={option}
            onChange={(selected: CustomerOption | null) => {
              onSelect(selected?.customer ?? null);
              setIsEditing(false);
            }}
            placeholder={`Cari ${label}`}
            className="w-full"
            components={{ Option: CustomOption }}
          />
        ) : selectedCustomer ? (
          <div className="flex justify-between items-center px-3 py-2 border rounded-md bg-white">
            <div>
              <div className="font-semibold text-gray-900">
                {selectedCustomer.name}
              </div>
              <div className="text-sm text-gray-500">
                {selectedCustomer.address}
              </div>
            </div>
            <button
              type="button"
              className="text-sm text-blue-500 underline ml-4"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Belum dipilih</div>
        )}
      </div>
    </div>
  );
};
