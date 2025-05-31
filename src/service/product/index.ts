import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export type FilterState = {
  kategori: string;
  channel: string;
  harga: string;
  type: string | null;
  urutan: string;
  produkMarketplace: string;
};

type ProductPrice = {
  normal: number;
  buy: number;
  reseller: number;
  agent: number;
  member: number;
};

type ProductWholesaler = {
  lowerLimitItem: number;
  upperLimitItem: number;
  unitPrice: number;
  wholesalerPrice: number;
};

export type ProductVariant = {
  id?: string;
  imageUrl: File | null | string;
  sku: string;
  productPrices: ProductPrice;
  productWholesalers?: ProductWholesaler[];
  barcode?: string;
  size?: string;
  color?: string;
  stock: number | null;
};

type ProductDiscount = {
  id?: string;
  type: string;
  value: number;
  startDate?: string;
  endData?: string;
};

export type CreateProductRequest = {
  product: {
    categoryId?: string;
    name: string;
    type: string;
    description: string;
    weight: number;
    isPublish: boolean;
  };
  productDiscount: ProductDiscount;
  productVariants: ProductVariant[];
};

type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductNew = {
  id: string;
  categoryId: string;
  name: string;
  type: string;
  description: string;
  weight: number;
  isPublish: boolean;
  createdAt?: string; // atau Date
  updatedAt?: string;
  category: Category;
};

type Variant = {
  id: string;
  productId: string;
  sku: string;
  stock: number;
  size: string;
  color: string;
  imageUrl: string;
  barcode: string | null;
  createdAt: string; // atau Date
  updatedAt: string;
};

type Price = {
  id: string;
  productVariantId: string;
  normal: number;
  buy: number;
  reseller: number;
  agent: number;
  member: number;
  createdAt: string; // atau Date
  updatedAt: string;
};

type ProductResponse = {
  data: ArrayProduct[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export type ArrayProduct = {
  product: ProductNew;
  variant: Variant[];
  price: Price;
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: ProductResponse;
  statusCode?: number;
};

export type ResponseDetailProduk = {
  id: string;
  categoryId: string | null;
  name: string;
  type: "BARANG_STOK_SENDIRI" | string; // bisa diubah jadi union jika ada lebih dari 1 kemungkinan nilai
  description: string;
  weight: number;
  isPublish: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  category: null | {
    id: string;
    name: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  ProductDiscount: [] | ProductDiscount[];
  productVariants: {
    id: string;
    productId: string;
    sku: string;
    stock: number;
    size: string;
    color: string;
    imageUrl: string;
    barcode: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    productPrices: ProductPrice;
  }[];
};

type SuccesResponseDetailProduk = {
  success: boolean;
  message: string;
  responseObject?: ResponseDetailProduk;
  statusCode?: number;
};

const convertToFormData = (data: CreateProductRequest): FormData => {
  const formData = new FormData();

  // Product fields
  Object.entries(data.product).forEach(([key, value]) => {
    formData.append(`product.${key}`, String(value));
  });

  // Product discount
  Object.entries(data.productDiscount).forEach(([key, value]) => {
    formData.append(`productDiscount.${key}`, String(value));
  });

  // Product variants
  data.productVariants.forEach((variant: ProductVariant, index: number) => {
    if (variant.id) {
      formData.append(`productVariants[${index}].id`, variant.id);
    }
    formData.append(`productVariants[${index}].sku`, variant.sku);
    formData.append(`productVariants[${index}].stock`, String(variant.stock));
    formData.append(`productVariants[${index}].size`, variant.size ?? "");
    formData.append(`productVariants[${index}].color`, variant.color ?? "");
    formData.append(`productVariants[${index}].barcode`, variant.barcode ?? "");
    // File image
    // formData.append(
    //   `productVariants[${index}].image`,
    //   variant.imageUrl ?? ""
    // );
    formData.append(`images`, variant.imageUrl ?? "");

    // Product prices
    Object.entries(variant.productPrices).forEach(([key, value]) => {
      formData.append(
        `productVariants[${index}].productPrices.${key}`,
        String(value)
      );
    });
  });

  return formData;
};

export async function getDetailProduct(
  id: string
): Promise<SuccesResponseDetailProduk> {
  try {
    const { data } = await axios.get(`${apiUrl}/products/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.responseObject?.productVariants) {
      data.responseObject.productVariants =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.responseObject.productVariants.map((variant: any) => ({
          ...variant,
          productPrices: variant.productPrices?.[0] || null, // Ambil satu harga
        }));
    }

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

export async function createProduct(
  credentials: CreateProductRequest
): Promise<ResponseSucces> {
  try {
    const dataRequest = convertToFormData(credentials);
    dataRequest.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    const response = await axios.post(`${apiUrl}/products`, dataRequest, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: response.data.message ?? "Produk berhasil ditambahkan",
      responseObject: response.data,
    };
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

export async function deleteProduct(id: string): Promise<ResponseSucces> {
  try {
    console.log(id);
    const { data } = await axios.delete(`${apiUrl}/products/${id}`, {
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

export async function editProduct(
  credentials: CreateProductRequest,
  id: string
): Promise<ResponseSucces> {
  try {
    const dataRequest = convertToFormData(credentials);
    dataRequest.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    const response = await axios.put(`${apiUrl}/products/${id}`, dataRequest, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: response.data.message ?? "Produk berhasil ditambahkan",
      responseObject: response.data,
    };
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

export async function getProducts(
  page: number = 1,
  search: string = "",
  query?: FilterState
): Promise<ResponseSucces> {
  try {
    console.log(query);
    const { data } = await axios.get(`${apiUrl}/products`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        ...query,
        search,
      },
    });
    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil produk";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        (error.request ? "Tidak dapat menghubungi server" : error.message);
    } else {
      message = (error as Error).message;
    }

    console.log(error);
    return {
      success: false,
      message,
    };
  }
}

export async function downloadProductExel() {
  try {
    const response = await axios.post(`${apiUrl}/products/export/excel`, "", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    const fileName =
      contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
      "Produk.xlsx";

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
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
