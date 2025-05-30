import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export type ServiceForm = {
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
  owner: string;
  logo: File | null;
  banner: File | null;
};

export type ResponseService = {
  success: boolean;
  message: string;
  responseObject?: ServiceForm;
  statusCode?: number;
};

export async function getServiceForm(token: string): Promise<ResponseService> {
  try {
    const response = await axios.get(`${apiUrl}/shop`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    let message = "Failed to get service form";
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

export async function createServiceForm(
  dataIsExist: boolean,
  form: ServiceForm
): Promise<ResponseService> {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (const key in form) {
      const typedKey = key as keyof ServiceForm;
      if (form[typedKey] !== null && form[typedKey] !== undefined) {
        formData.append(typedKey, form[typedKey]);
      }
    }
    const method = dataIsExist ? "patch" : "post";
    console.log(dataIsExist);
    const url = `${apiUrl}/shop`;

    const { data } = await axios({
      method,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    let message = "Failed to update service form";
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
