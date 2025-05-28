import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
  provinceId: string;
};

export type District = {
  id: string;
  name: string;
  cityId: string;
};

export type Village = {
  id: string;
  name: string;
  districtId: string;
};

// type ResponseSuccess = {
//   success: boolean;
//   message: string;
//   responseObject?: {
//     data: Province[];
//     meta: {
//       currentPage: number;
//       totalPages: number;
//       totalItems: number;
//     };
//   };
//   statusCode?: number;
// };

type GeographicResponse = {
  success: boolean;
  message: string;
  responseObject?: Province[] | City[] | District[] | Village[];
  statusCode?: number;
};

export async function getProvinces(): Promise<GeographicResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/regions/provinces`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data provinsi";

    console.log(error);
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

export async function getCities(provinceId: string): Promise<GeographicResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/regions/cities/${provinceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log({ cities: data });
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data kota/kabupaten";

    console.log(error);
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

export async function getDistricts(cityId: string): Promise<GeographicResponse> {
  try {
    const { data } = await axios.get(`${apiUrl}/regions/districts/${cityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data kecamatan";

    console.log(error);
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

export async function getVillages(
  districtId: string
): Promise<GeographicResponse> {
  try {
    const { data } = await axios.get(
      `${apiUrl}/regions/villages/${districtId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data desa/kelurahan";

    console.log(error);
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
