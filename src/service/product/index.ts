import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
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

type ProductVariant = {
  imageUrl: string;
  sku: string;
  productPrices: ProductPrice;
  productWholesalers: ProductWholesaler[];
  barcode?: string;
  size?: string;
  color?: string;
  stock: number | null;
};

type Product = {
  name: string;
  description: string;
  type: string;
  isPublish: boolean;
  weight: number;
};

type CreateProductRequest = {
  product: Product;
  categoryId: string;
  productVariants: ProductVariant[];
};

export type ProductResponse = {
  id: string;
  categoryId: string;
  name: string;
  type: string;
  description: string;
  weight: number;
  isPublish: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  productVariants: {
    id: string;
    productId: string;
    sku: string;
    stock: number;
    size: string;
    color: string;
    imageUrl: string;
    barcode: string ;
    createdAt: string;
    updatedAt: string;
    productPrices: {
      id: string;
      productVariantId: string;
      normal: number;
      buy: number;
      reseller: number;
      agent: number;
      member: number;
      createdAt: string;
      updatedAt: string;
    }[];
    ProductWholesaler: {
      id: string;
      productVariantId: string;
      lowerLimitItem: number;
      upperLimitItem: number;
      unitPrice: number;
      wholesalerPrice: number;
      createdAt: string;
      updatedAt: string;
    }[];
  }[];
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: CreateProductRequest | ProductResponse[];
  statusCode?: number;
};

export async function createProduct(
  credentials: CreateProductRequest
): Promise<ResponseSucces> {
  try {
    console.log(credentials);
    const response = await axios.post(`${apiUrl}/products`, credentials, {
      headers: {
        "Content-Type": "application/json",
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

export async function getProducts(): Promise<ResponseSucces> {
  try {
    const response = await axios.get(
      `${apiUrl}/products`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    return {
      success: true,
      message: response.data.message ?? "Produk berhasil Dimuat",
      responseObject: response.data.responseObject.data,
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
