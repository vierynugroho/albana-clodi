// payload dari order
export interface OrderPayload {
  order: {
    ordererCustomerId: string;
    deliveryTargetCustomerId: string;
    deliveryPlaceId: string;
    salesChannelId?: string;
    orderDate?: string;
    note?: string;
  };
  orderDetail: {
    detail: {
      code?: string;
      otherFees?: {
        installment?: number;
        packaging?: number;
        insurance?: number;
        weight?: number;
        shippingCost?: {
          shippingService?: string;
          cost?: number;
          type?: string;
          weight?: string;
        };
        discount: {
          value?: number;
          type?: "percent" | "nominal";
        };
      };
      receiptNumber?: string;
    };
    paymentMethod?: {
      id?: string;
      status: string;
      date?: string;
    };
    orderProducts: {
      productId: string;
      productVariantId: string;
      productQty: number;
    }[];
    shippingServices?: {
      shippingName?: string;
      serviceName?: string;
      weight?: number;
      isCod?: boolean;
      shippingCost?: number;
      shippingCashback?: number;
      shippingCostNet?: number;
      grandtotal?: number;
      serviceFee?: number;
      netIncome?: number;
      etd?: string;
      type?: string;
    }[];
  };
}

// enum 
export enum PaymentStatus {
  PENDING = "Belum Bayar",
  INSTALLMENTS = "Cicilan",
  SETTLEMENT = "Lunas",
}



// response dari customers 
export interface TCustomer {
  id: string;
  name: string;
  category: "CUSTOMER" | "RESELLER" | "DROPSHIPPER" | "MEMBER" | "AGENT";
  address: string;
  province: string;
  city: string;
  district: string;
  village: string;
  addressDetail: string | null;
  postalCode: string;
  phoneNumber: string;
  destinationId: number | null;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string; 
  updatedAt: string; 
}

export interface CustomerMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CustomerResponseObject {
  data: TCustomer[];
  meta: CustomerMeta;
}

export interface GetCustomersResponse {
  success: boolean;
  message: string;
  responseObject: CustomerResponseObject;
  statusCode: number;
}

export type TDeliveryPlace = {
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

export interface GetResponseDeliveryPlace {
  success: boolean;
  message: string;
  responseObject: TDeliveryPlace[];
  statusCode: number;
}


// Response Product
export type ProductResponse = {
  success: boolean;
  message: string;
  responseObject: {
    data: ProductItem[];
  };
};


export type ProductItem = {
  product: Product;
  variant: Variant[];
  price: ProductPrice;
};

type Product = {
  id: string;
  categoryId: string | null;
  name: string;
  type: string; 
  description: string;
  weight: number;
  isPublish: boolean;
  createdAt: string; 
  updatedAt: string;
  category: string | null; 
};

type Variant = {
  id: string;
  productId: string;
  sku: string;
  stock: number;
  size: string;
  color: string;
  imageUrl: string | null;
  barcode: string | null;
  createdAt: string;
  updatedAt: string;
  productPrices: ProductPrice[];
};

type ProductPrice = {
  id: string;
  productVariantId: string;
  normal: number;
  buy: number;
  reseller: number;
  agent: number;
  member: number;
  createdAt: string;
  updatedAt: string;
};

// Payment Method 
export interface PaymentMethod {
  id: string;
  name: string;
  bankName: string | null;
  bankBranch: string | null;
  accountNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  responseObject: PaymentMethod[];
  statusCode: number;
}


// Shiping Cost
export interface ShippingCostParams {
  shipper_destination_id: number;
  receiver_destination_id: number;
  weight?: number;
  item_value?: number;
  cod? : string;
}

export interface ShippingService {
  shipping_name: string;
  service_name: string;
  weight: number;
  is_cod: boolean;
  shipping_cost: number;
  shipping_cashback: number;
  shipping_cost_net: number;
  grandtotal: number;
  service_fee: number;
  net_income: number;
  etd: string;
  is_manual?: boolean;
}

interface ShippingCostResponseObject {
  calculate_reguler: ShippingService[];
  calculate_cargo: ShippingService[];
  calculate_instant: ShippingService[];
}

export interface ShippingCostResponse {
  success: boolean;
  message: string;
  responseObject: ShippingCostResponseObject;
  statusCode: number;
}

// response sales chanel 
export interface SalesChannel {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface SalesChannelResponse {
  success: boolean;
  message: string;
  responseObject: SalesChannel[];
  statusCode: number;
}
