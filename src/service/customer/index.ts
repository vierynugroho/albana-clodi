import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type Customer = {
  id: string;
  name: string;
  category: string;
  address: string;
  subdistrict: string;
  postalCode: string;
  phoneNumber: string;
  destinationId: number;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: {
    data: Customer[];
    meta: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  };
  statusCode?: number;
};

export async function getCustomers(): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat menambahkan customer";

    console.log(error);
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
