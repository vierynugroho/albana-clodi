import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Tipe data sesuai struktur response Anda
export type OrderItem = {
  id: string;
  ordererCustomerId: string;
  deliveryTargetCustomerId: string;
  deliveryPlaceId: string;
  salesChannelId: string;
  orderDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  SalesChannel: {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  DeliveryPlace: {
    id: string;
    name: string;
    address: string;
    subdistrict: string;
    phoneNumber: string;
    destinationId: number;
    email: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  OrdererCustomer: Customer;
  DeliveryTargetCustomer: Customer;
  OrderDetail: OrderDetail;
  ShippingServices: []; // Tergantung struktur detailnya
};

type Customer = {
  id: string;
  name: string;
  category: string;
  address: string;
  subdistrict: string;
  postalCode: string;
  phoneNumber: string;
  destinationId: number;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type OrderDetail = {
  id: string;
  orderId: string;
  paymentMethodId: string;
  code: string;
  otherFees: {
    total: number;
    discount: {
      type: string;
      value: number;
    };
    shippingCost: {
      cost: number;
      type: string;
      shippingService: string;
    };
  };
  finalPrice: number;
  paymentStatus: string;
  paymentDate: string;
  receiptNumber: string;
  createdAt: string;
  updatedAt: string;
  OrderProducts: OrderProduct[];
  PaymentMethod: {
    id: string;
    name: string;
    bankName: string;
    bankBranch: string;
    accountNumber: string;
    createdAt: string;
    updatedAt: string;
  };
};

type OrderProduct = {
  id: string;
  orderId: string;
  orderDetailId: string;
  productId: string;
  productQty: number;
  createdAt: string;
  updatedAt: string;
  Product: Product;
};

type Product = {
  id: string;
  categoryId: string;
  name: string;
  type: string;
  description: string;
  weight: number;
  isPublish: boolean;
  createdAt: string;
  updatedAt: string;
  productVariants: Variant[];
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
  createdAt: string;
  updatedAt: string;
};

type OrderQuery = {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  month?: string;
  year?: string;
  week?: string;
};

type OrderResponse = {
  filterInfo: string;
  totalOrders: number;
  totalData: number;
  data: OrderItem[];
};

type ResponseSucces = {
  success: boolean;
  message: string;
  responseObject?: OrderResponse;
  statusCode?: number;
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwYjJhN2FlLTAzZjgtNDU3Yy04NmM4LTIzNWEyMmY1MTc5NSIsImlhdCI6MTc0ODIwNDc3OCwiZXhwIjoxNzQ4MjkxMTc4fQ.YFSh9NPUPBlAmkvyfuvbyC556StvK2NdI7clycGq7Zw";
export async function getOrders(query?: OrderQuery): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/orders`, {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data pesanan";

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

export async function getOrderById(orderId: string): Promise<ResponseSucces> {
  try {
    const { data } = await axios.get(`${apiUrl}/orders/${orderId}`);

    return {
      success: true,
      message: "Detail pesanan berhasil diambil",
      responseObject: data,
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil detail pesanan";

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

export async function createOrder(
  orderData: Partial<OrderItem>
): Promise<ResponseSucces> {
  try {
    const { data } = await axios.post(`${apiUrl}/orders`, orderData);

    return {
      success: true,
      message: "Pesanan berhasil dibuat",
      responseObject: data,
    };
  } catch (error) {
    let message = "Terjadi kesalahan saat membuat pesanan";

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
