import axios from "axios";
const token = localStorage.getItem("token");
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type SalesChannel = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type RequestSalesChannel = {
  name: string;
  isActive: boolean;
};

type ResponCreateSales = {
  success: boolean;
  message: string;
};

type ResponseGetAllSales = {
  success: boolean;
  message: string;
  responseObject?: SalesChannel[];
  statusCode?: number;
};

export async function getAllSales(): Promise<ResponseGetAllSales> {
  try {
    const { data } = await axios.get(`${apiUrl}/sales-channels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    let message = "Failed to get Sales data";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Could not connect to server" : error.message);
    } else {
      message = (error as Error).message;
    }
    return { success: false, message };
  }
}

export async function createSales(
  form: RequestSalesChannel
): Promise<ResponCreateSales> {
  try {
    const { data } = await axios.post(`${apiUrl}/sales-channels`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    let message = "Failed to get Sales data";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Could not connect to server" : error.message);
    } else {
      message = (error as Error).message;
    }
    return { success: false, message };
  }
}

export async function deleteSales(id: string):Promise<ResponCreateSales> {
  try {
    const { data } = await axios.delete(`${apiUrl}/sales-channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    let message = "Failed to get Sales data";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Could not connect to server" : error.message);
    } else {
      message = (error as Error).message;
    }
    return { success: false, message };
  }
}
