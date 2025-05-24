import axios from "axios";
import { TReceiptData, TReceiptResponse } from "./order.type";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkYTliYTE4LTMwM2EtNGU3My1hMTk2LWYyMDNmMjZhYzNhNiIsImlhdCI6MTc0ODEwMjU1NSwiZXhwIjoxNzQ4MTg4OTU1fQ.RLihUVk3rcP2DDUxqDrgoOzQaOWeCvMzhw4jF3rC7b0";

export async function getReceiptByOrderId(
  orderId: string
): Promise<TReceiptResponse> {
  try {
    const { data } = await axios.get<TReceiptResponse>(
      `${apiUrl}/receipts/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data resi";

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
      statusCode: 500,
      responseObject: {} as TReceiptData,
    };
  }
}
