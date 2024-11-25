/**
 * ceci nous sert qu'a garder les details du variant
 * qui a ete commander
 */

export type productOrderType = {
  id: string;
  name: string;
  unitePrice: number;
  quantity: number;
  attribut: any[];
  image: string;
};
