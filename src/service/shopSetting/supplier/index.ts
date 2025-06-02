import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type Supplier = {
  id: string;
  name: string;
  address: string;
  subdistrict: string;
  phoneNumber: string;
  destinationId: number;
  email: string;
  description: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};

export type CreateSupplier = {
  name: string;
  address: string;
  subdistrict: string;
  phoneNumber: string;
  destinationId?: number;
  email?: string;
  description: string;
};

type GetSuppliersResponse = {
  success: boolean;
  message: string;
  responseObject: Supplier[];
  statusCode: number;
};

type getSupplierDetailResponse = {
  success: boolean;
  message: string;
  responseObject?: Supplier;
  statusCode: number;
};

type CreateSupplierResponse = {
  success: boolean;
  message: string;
  statusCode?: number;
};

export async function getSuppliers(): Promise<GetSuppliersResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/delivery-places`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to create bank payment:", error);
    throw error;
  }
}

export async function createSupplier(
  form: CreateSupplier
): Promise<CreateSupplierResponse> {
  try {
    const { data } = await axios.post(`${apiUrl}/delivery-places`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Failed to get Create Supplier";
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

export async function getDetailSupplier(
  id: string
): Promise<getSupplierDetailResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/delivery-places/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Failed to get get detail Supplier";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Could not connect to server" : error.message);
    } else {
      message = (error as Error).message;
    }
    return { success: false, message, statusCode: 400 };
  }
}

export async function editSupplier(
  id: string,
  form: CreateSupplier
): Promise<CreateSupplierResponse> {
  try {
    const { data } = await axios.put(`${apiUrl}/delivery-places/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Failed to get get detail Supplier";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Could not connect to server" : error.message);
    } else {
      message = (error as Error).message;
    }
    return { success: false, message, statusCode: 400 };
  }
}

export async function deleteSupplier(
  id: string
): Promise<CreateSupplierResponse> {
  try {
    const { data } = await axios.delete(`${apiUrl}/delivery-places/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Failed to get Delete Supplier";
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
