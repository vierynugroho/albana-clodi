import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type Customers = {
  id: string;
  name: string;
  category: "CUSTOMER" | string;
  address: string;
  subdistrict: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  destinationId: number;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerQuery = {
  keyword?: string;
  status?: string;
  destinationId?: number;
};

export type CreateCustomerRequest = {
  id?: string;
  name: string;
  category: "CUSTOMER" | string;
  address: string;
  subdistrict: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  destinationId: number;
  status: "ACTIVE" | "INACTIVE" | string;
};

export type CustomersResponse = {
  totalData: number;
  data: Customers[];
};

export type ResponseDetailCustomer = {
  success: boolean;
  message: string;
  responseObject?: Customers;
  statusCode?: number;
};

export type CustomersListResponse = {
  success: boolean;
  message: string;
  responseObject?: CustomersResponse;
  statusCode?: number;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: CustomersResponse;
  statusCode?: number;
};

export async function getCustomers(query?: Customers): Promise<ResponseSucces> {
  try {
    const token = localStorage.getItem("token"); // atau dari sumber lain sesuai implementasi kamu

    const { data } = await axios.get(`${apiUrl}/customers`, {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data pesanan";

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

export async function createExpense(
  credential: CreateCustomerRequest
): Promise<ResponseSucces> {
  try {
    const response = await axios.post(`${apiUrl}/customers`, credential);

    return {
      success: true,
      message: response.data.message ?? "Pengeluaran berhasil ditambahkan",
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat menambahkan pengeluaran";

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
