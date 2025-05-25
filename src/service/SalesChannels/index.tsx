import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
export type SalesChannel = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: SalesChannel;
  statusCode?: number;
};

export async function getSalesChannels(): Promise<ResponseSucces> {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${apiUrl}/sales-channels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: "Sales channel berhasil diambil",
      responseObject: data,
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil sales channel";

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
