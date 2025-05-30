import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type DeliveryPlace = {
  id: string;
  name: string;
  address: string;
  subdistrict: string;
  phoneNumber: string;
  destinationId: number;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type DeliveryPlaceQuery = {
  keyword?: string;
  destinationId?: number;
  name?: string;
  address?: string;
  subdistrict?: string;
  phoneNumber?: string;
  email?: string;
  description?: string;
};

export type CreateDeliveryPlaceRequest = {
  id?: string;
  name: string;
  address: string;
  subdistrict: string;
  phoneNumber: string;
  destinationId: number;
  email: string;
  description: string;
};

type ResponseSuccess = {
  success: boolean;
  message: string;
  responseObject?: DeliveryPlace;
  statusCode?: number;
};

export async function getDeliveryPlaces(
  query?: DeliveryPlaceQuery
): Promise<ResponseSuccess> {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${apiUrl}/delivery-places`, {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data tempat pengiriman";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Tidak dapat menghubungi server" : error.message);
    } else {
      message = (error as Error).message;
    }

    return {
      success: false,
      message,
    };
  }
}
