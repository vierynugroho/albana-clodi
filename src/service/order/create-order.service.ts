import axios from "axios";
import {
  GetCustomersResponse,
  GetResponseDeliveryPlace,
  OrderPayload,
  PaymentMethod,
  PaymentResponse,
  ProductItem,
  ProductResponse,
  SalesChannel,
  SalesChannelResponse,
  ShippingCostParams,
  ShippingCostResponse,
  TCustomer,
  TDeliveryPlace,
} from "./create-order.type";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

export const postOrder = async (data: OrderPayload) => {
  try {
    const response = await axios.post(`${apiUrl}/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to post order:", error);
    throw error;
  }
};

export const fetchCustomers = async (
  query: string
): Promise<{ label: string; value: string; customer: TCustomer }[]> => {
  try {
    const response = await axios.get<GetCustomersResponse>(
      `${apiUrl}/customers`,
      {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const customers = response.data.responseObject.data;

    return customers.map((customer) => ({
      label: `${customer.name} | ${customer.city}, ${customer.province}`,
      value: customer.id,
      customer,
    }));
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
};

export const fetchDeliveryPlace = async (
  query: string
): Promise<{ label: string; value: string; place: TDeliveryPlace }[]> => {
  try {
    const response = await axios.get<GetResponseDeliveryPlace>(
      `${apiUrl}/delivery-places`,
      {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const places = response.data.responseObject;

    return places.map((place: TDeliveryPlace) => ({
      label: `${place.name} | ${place.address}`,
      value: place.id,
      place,
    }));
  } catch (error) {
    console.error("Failed to fetch delivery places:", error);
    return [];
  }
};

export const fetchProduct = async (
  query: string
): Promise<{ label: string; value: string; product: ProductItem }[]> => {
  try {
    const response = await axios.get<ProductResponse>(`${apiUrl}/products`, {
      params: { search: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = response.data.responseObject.data;

    return products.map((item: ProductItem) => ({
      label: "Cari Produk",
      value: item.product.id,
      product: item,
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const fetchSalesChannels = async (
  query: string
): Promise<{ label: string; value: string; channel: SalesChannel }[]> => {
  try {
    const response = await axios.get<SalesChannelResponse>(
      `${apiUrl}/sales-channels`,
      {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const channels = response.data.responseObject;

    return channels.map((channel: SalesChannel) => ({
      label: channel.name,
      value: channel.id,
      channel,
    }));
  } catch (error) {
    console.error("Failed to fetch sales channels:", error);
    return [];
  }
};

export const fetchPayments = async (
  query: string
): Promise<{ label: string; value: string; payment: PaymentMethod }[]> => {
  try {
    const response = await axios.get<PaymentResponse>(
      `${apiUrl}/payment-methods`,
      {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const payments = response.data.responseObject;

    return payments.map((payment: PaymentMethod) => ({
      label: payment.name,
      value: payment.id,
      payment,
    }));
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    return [];
  }
};

export const calculateShippingCost = async (
  params: ShippingCostParams
): Promise<ShippingCostResponse> => {
  try {
    const response = await axios.get<ShippingCostResponse>(
      `${apiUrl}/shipping-cost/calculate`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to calculate shipping cost:", error);
    throw new Error("Failed to calculate shipping cost");
  }
};
