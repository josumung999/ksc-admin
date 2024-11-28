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
}

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

enum PaymentStatus {
  PENDING = "Attente de paiement",
  PAID = "Payé",
  REFUNDED = "Remboursé",
}

export enum LivraisonStatus {
  PENDING = "En cours",
  IN_TRANSIT = "En transit",
  DELIVERED = "Livré",
  CANCELLED = "Annulé",
}

enum ProductMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
