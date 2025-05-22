import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

type ExpenseQuery = {
  startDate?: string; // format: YYYY-MM-DD
  endDate?: string;
  month?: string; // "1" - "12"
  year?: string; // "2025"
  week?: string; // "1" - "52"
};

type ReportProduts = {
  filterInfo: string;
  total_transactions: number;
  total_item_terjual: number;
  penjualan_kotor: number;
  penjualan_bersih: number;
  laba_kotor: number;
  total_orders: number;
};

type ReportExpenses = {
  filterInfo: string;
  totalExpenses: number;
  totalData: number;
};

type ReportOrders = {
  filterInfo: string;
  total_transactions: number;
  total_item_terjual: number;
  penjualan_kotor: number;
  penjualan_bersih: number;
  laba_kotor: number;
  total_orders: number;
};

export type ReportAll = {
  reportProducts: ReportProduts;
  reportExpenses: ReportExpenses;
  reportOrders: ReportOrders;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: ReportAll;
  statusCode?: number;
};
export async function getReport(query?: ExpenseQuery): Promise<ResponseSucces> {
  try {
    const [expenses, orders, products] = await Promise.all([
      axios.get(`${apiUrl}/reports/expenses`, {
        params: query,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
      axios.get(`${apiUrl}/reports/orders`, {
        params: query,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
      axios.get(`${apiUrl}/reports/products`, {
        params: query,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
    ]);

    const allReport = {
      reportProducts: products.data.responseObject,
      reportExpenses: expenses.data.responseObject,
      reportOrders: orders.data.responseObject,
    };

    return {
      success: true,
      message: "Berhasil Mendapatkan Data",
      responseObject: allReport,
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil produk";

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
