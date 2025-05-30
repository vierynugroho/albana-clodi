import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type BankPayment = {
  id: string;
  name: string;
  bankName: string | null;
  bankBranch: string | null;
  accountNumber: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateBank = {
  name: string;
  bankName: string | null;
  bankBranch: string | null;
  accountNumber: string | null;
};

type CreatePaymentResponse = {
  success: boolean;
  message: string;
  statusCode: number;
};

type GetBankPaymentsResponse = {
  success: boolean;
  message: string;
  responseObject: BankPayment[];
  statusCode: number;
};

type GetDetailBankPaymentsResponse = {
  success: boolean;
  message: string;
  responseObject: BankPayment;
  statusCode: number;
};

export async function createBankPayment(
  dataCreateBank: CreateBank
): Promise<CreatePaymentResponse> {
  try {
    const { data } = await axios.post(
      `${apiUrl}/payment-methods`,
      dataCreateBank,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to create bank payment:", error);
    throw error;
  }
}

export async function getBankPayments(): Promise<GetBankPaymentsResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/payment-methods`, {
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

export async function editBankPayment(
  id: string,
  dataCreateBank: CreateBank
): Promise<CreatePaymentResponse> {
  try {
    const { data } = await axios.put(
      `${apiUrl}/payment-methods/${id}`,
      dataCreateBank,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to create bank payment:", error);
    throw error;
  }
}

export async function getDetailBankPayment(
  id: string
): Promise<GetDetailBankPaymentsResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/payment-methods/${id}`, {
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

export async function deleteBankPayment(
  id: string
): Promise<CreatePaymentResponse> {
  try {
    const { data } = await axios.delete(`${apiUrl}/payment-methods/${id}`, {
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
