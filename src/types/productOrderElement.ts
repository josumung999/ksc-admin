import { ProductInventoryElement } from "./productType";

export interface ProductOrderElements extends ProductInventoryElement {
  isOpen: boolean;
}
