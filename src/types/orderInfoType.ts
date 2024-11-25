export interface orderInfoType {
  comment: string;
  date: string;
  paymentMethod: paymentMethodEnum;
}

export enum paymentMethodEnum {
  CARD = "Carte",
  MOBILE_MONEY = "Mobile Money",
  CASH = "Espèces",
}
