import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

type ResponsAuth = {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    fullname: string;
  };
};

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<ResponsAuth> {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/login`, //development
      credentials
    );

    const { token, user } = response.data.responseObject;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
      message: response.data.message,
      token,
      user,
    };
  } catch (error: unknown) {
    let message = "Terjadi kesalahan saat login";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        message = error.response.data.message || "Login gagal";
      } else if (error.request) {
        message = "Tidak dapat menghubungi server";
      } else {
        message = error.message;
      }
    } else {
      message = (error as Error).message;
    }

    return {
      success: false,
      message,
    };
  }
}
