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

export type NewCustomer = {
  name: string;
  category: string;
  address: string;
  province: string;
  village: string;
  district: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  status: string;
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

type detailCustomer = {
  address: string;
  addressDetail: string | null;
  category: " CUSTOMER | RESELLER | DROPSHIPPER | AGENT";
  city: string;
  createdAt: string;
  updatedAt: string;
  destinationId: number;
  phoneNumber: string;
  district: string;
  village: string;
  email: string;
  id: string;
  name: string;
  postalCode: string;
  province: string;
  status: "ACTIVE | NONACTIVE";
};

type ResponseSuccesDetailCustomer = {
  success: boolean;
  message: string;
  responseObject?: detailCustomer;
  statusCode?: number;
};

export type FilterState = {
  category: "CUSTOMER | RESELLER | DROPSHIPPER | AGENT" | null | string;
  status: "ACTIVE | NONACTIVE" | null;
};

export async function getCustomers(
  search: string = "",
  query?: FilterState,
  page: number = 1
): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/customers`, {
      params: {
        page,
        search,
        ...query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
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

export async function createCustomer(
  customerData: NewCustomer
): Promise<ResponseSucces> {
  try {
    const { data } = await axios.post(`${apiUrl}/customers`, customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
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

export async function downloadExcelCustomer(): Promise<ResponseSucces> {
  try {
    const response = await axios.post(
      `${apiUrl}/customers/export/excel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    // Buat URL untuk file yang diunduh
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Buat elemen anchor untuk mengunduh file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customer_data.xlsx");
    document.body.appendChild(link);

    // Klik link untuk memulai unduhan
    link.click();

    // Bersihkan elemen setelah unduhan
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: "Berhasil mengunduh data customer",
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat mengunduh data customer";

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

export async function deleteCustomer(id: string): Promise<ResponseSucces> {
  try {
    const response = await axios.delete(`${apiUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: "Berhasil menghapus data customer",
      responseObject: response.data,
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat menghapus data customer";

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

export async function detailCustomer(
  id: string
): Promise<ResponseSuccesDetailCustomer> {
  try {
    const { data } = await axios.get(`${apiUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat menghapus data customer";

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

export async function editCustomer(
  id: string,
  customerData: NewCustomer
): Promise<ResponseSucces> {
  try {
    const { data } = await axios.put(
      `${apiUrl}/customers/${id}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat Edit customer";

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
