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

type GetSuppliersResponse = {
  success: boolean;
  message: string;
  responseObject: Supplier[];
  statusCode: number;
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
