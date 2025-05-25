import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type CategoryProduct = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryRequest = {
  name: string;
};

export type EditCategoryRequest = {
  id: string;
  name: string;
};

type ResponCreateCategory = {
  success: boolean;
  message: string;
  responseObject?: CategoryProduct;
  statusCode?: number;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: CategoryProduct[];
  statusCode?: number;
};

export async function detailCategory(
  id: string
): Promise<ResponCreateCategory> {
  try {
    const { data } = await axios.get(`${apiUrl}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan";
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      if (error.response) {
        message = error.response.data.message || "Gagal menambakan produk";
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

export async function deleteCategory(id: string): Promise<ResponseSucces> {
  try {
    const { data } = await axios.delete(`${apiUrl}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan";
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      if (error.response) {
        message = error.response.data.message || "Gagal Menghapus produk";
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

export async function editCategory({
  id,
  name,
}: EditCategoryRequest): Promise<ResponCreateCategory> {
  try {
    const { data } = await axios.put(
      `${apiUrl}/categories/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan";
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      if (error.response) {
        message = error.response.data.message || "Gagal menambakan produk";
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

export async function createCategory({
  name,
}: CategoryRequest): Promise<ResponCreateCategory> {
  try {
    const { data } = await axios.post(
      `${apiUrl}/categories`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan";
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      if (error.response) {
        message = error.response.data.message || "Gagal menambakan produk";
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

export async function getCategories(): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan";
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      if (error.response) {
        message = error.response.data.message || "Gagal menambakan produk";
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
