import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type ExpenseItem = {
  id: string;
  itemName: string;
  itemPrice: number;
  qty: number;
  totalPrice: number;
  personResponsible: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

type ExpensesResponse = {
  filterInfo: string;
  totalExpenses: number;
  totalData: number;
  data: ExpenseItem[];
};

type ExpenseQuery = {
  startDate?: string; // format: YYYY-MM-DD
  endDate?: string;
  month?: string; // "1" - "12"
  year?: string; // "2025"
  week?: string; // "1" - "52"
};

type CreateExpenseRequest = {
  id?: string;
  itemName: string;
  itemPrice: number;
  qty: number;
  expenseDate: string;
  personResponsible: string;
  note: string;
};

type ResponseDetailExpense = {
  success: boolean;
  message: string;
  responseObject?: {
    id: string;
    itemName: string;
    itemPrice: number;
    qty: number;
    expenseDate: string;
    personResponsible: string;
    note: string;
    createdAt: string;
    updatedAt: string;
  };
  statusCode?: number;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: ExpensesResponse;
  statusCode?: number;
};

export async function getExpenses(
  query?: ExpenseQuery
): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/expenses`, {
      params: query,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data pengeluaran";

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
  credential: CreateExpenseRequest
): Promise<ResponseSucces> {
  try {
    const response = await axios.post(`${apiUrl}/expenses`, credential);

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

export async function getDetailExpense(
  id: string
): Promise<ResponseDetailExpense> {
  try {
    const { data } = await axios.get(`${apiUrl}/expenses/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat Mengedit pengeluaran";

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

export async function editExpense(
  credential: CreateExpenseRequest
): Promise<ResponseSucces> {
  try {
    const response = await axios.put(
      `${apiUrl}/expenses/${credential.id}`,
      credential
    );

    return {
      success: true,
      message: response.data.message ?? "Pengeluaran berhasil diEdit",
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
