import axios from "axios";

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    fullname: string;
  };
}> {
  try {
    const response = await axios.post(
      "https://30d0-66-96-225-94.ngrok-free.app/auth/login", //development
      credentials
    );

    const { token, user } = response.data.responseObject;

    localStorage.setItem("token", token);

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
