// Interface principale pour la commande (Order)
export interface OrderType {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  clientPhoneNumber: string;
  clientEmail?: string;
  clientAddress: string;
  client: Client;
  livraison?: Livraison;
  items: OrderItem[];
  trackingHistory: OrderTracking[];
  trackingNumber: string;
}

export interface OrderTracking {
  id: string;
  createdAt: string;
  status: OrderTrackingStatus;
  comment?: string;
}

export enum OrderTrackingStatus {
  DRAFT = "DRAFT",
  CONFIRMED = "CONFIRMED",
  PACKED = "PACKED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
}

type Driver = {
  address: string;
  civility: string;
  createdAt: string;

  email: string;
  firstName: string;

  id: string;
  lastName: string;
  middleName: string;
  password: string;
  phoneNumber: string;
  roleCode: string;
  updatedAt: string;
};

export type ImageType = {
  id: string;
  mediaUrl: string;
};

// Interface pour le client (Client)
interface Client {
  id: string;
  fullName: string;
  civility?: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour la livraison (Livraison)
interface Livraison {
  id: string;
  vehicleId: string;
  status: LivraisonStatus;
  createdAt: Date;
  updatedAt: Date;
  vehicle?: Vehicle;
}

// Interface pour le véhicule (Vehicle)
interface Vehicle {
  id: string;
  name: string;
  immatriculation: string;
  brand: string;
  model: string;
  year: string;
  driverId?: string;
  driver: Driver;
}

// Interface pour les articles de la commande (OrderItem)
export interface OrderItem {
  id: string;
  quantity: number;
  totalPrice: number;
  productVariant: ProductVariant;
}

// Interface pour les variantes de produit (ProductVariant)
export interface ProductVariant {
  id: string;
  sku: string;
  sellingPrice: number;
  salePrice: number;
  isOnSale: boolean;
  attributes: any[];
  inventoryCount: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  images: ImageType[];
}

// Interface pour le produit (Product)
interface Product {
  id: string;
  images: ImageType[];
  name: string;
  shortDescription: string;
  category: any;
  subCategory?: any;
  quantity: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  sellingPrice: number;
  buyingPrice: number;
  salePrice: number;
  isOnSale: boolean;
  variants: any[];
  coverImage?: ImageType;
  variantSummary: variantSummaryInterface;
}

export type variantSummaryInterface = {
  minSellingPrice: number;
  maxSellingPrice: number;
  minSalePrice: number;
  maxSalePrice: number;
  totalInventoryCount: number;
};

enum PaymentMethod {
  CARD = "Carte",
  MOBILE_MONEY = "Mobile Money",
  CASH = "Espèces",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum LivraisonStatus {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

enum ProductMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
