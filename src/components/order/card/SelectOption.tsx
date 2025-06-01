import { OptionProps } from "react-select";
import { TCustomer, TDeliveryPlace } from "../../../service/order/create-order.type";

export const CustomOption = (
  props: OptionProps<{ customer: TCustomer }, false>
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