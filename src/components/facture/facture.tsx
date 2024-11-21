import { clientType } from "@/types/clientType";
import { productOrderType } from "@/types/productOrderType";
import { formatCurrency } from "@/lib/utils";

// interface FactureProps {
//   client: clientType;
//   products: productOrderType[];
//   description: string;
// }

const Facture = (
  client: clientType,
  products: productOrderType[],
  description: string,
) => {
  return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #007acc; }
          </style>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 20px;">
          <h1 style="color: #007acc;">Facture</h1>
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <p style="color: black;">Nom complet: <span style="font-weight: 600;">${client?.fullName.toUpperCase()}</span></p>
              <p style="color: black;">Téléphone: <span style="font-weight: 600;">${client?.phoneNumber ?? "--"}</span></p>
              <p style="color: black;">Adresse: <span style="font-weight: 600;">${client?.address ?? " -- "}</span></p>
              <p style="color: black;">Email: <span style="font-weight: 600;">${client?.email ?? " -- "}</span></p>
              <p style="color: black;">Nationalité: <span style="font-weight: 600;">${client?.civility ?? " -- "}</span></p>
            </div>
  
            ${products
              .map(
                (product) => `
              <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 4px;">
                <p style="font-size: 14px; color: black;">Nom du produit: <span style="font-weight: 500;">${product?.name.toUpperCase()}</span></p>
                <p style="font-size: 14px; color: black;">Prix unitaire: <span style="font-weight: 500;">${formatCurrency(product?.unitePrice, "USD") ?? "--"}</span></p>
                <p style="font-size: 14px; color: black;">Quantité: <span style="font-weight: 500;">${product?.quantity ?? " -- "}</span></p>
                <p style="color: black;">Details:
                  <span style="font-size: 14px; padding-left: 2px; display: flex; flex-direction: column; font-weight: 500;">
                    ${product?.attribut
                      ?.map(
                        (item: any, key: number) => `
                      <span key="${key}">${item?.name}: ${item?.value}</span>
                    `,
                      )
                      .join("")}
                  </span>
                </p>
                <p style="font-size: 14px; color: black;">Prix total: <span style="font-weight: 500; color: green;">${formatCurrency(product?.unitePrice * (product?.quantity ? product.quantity : 1), "USD")}</span></p>
                <div style="margin-top: -1px; height: 1px; width: 100%; background-color: black; opacity: 0.5;"></div>
              </div>
            `,
              )
              .join("")}
            <p style="color: black;">Description: ${description}</p>
  
            <div style="margin-top: 10px; display: flex; justify-content: flex-start; width: 100%;">
              <p style="color: black;">Prix Final: <span style="font-weight: 600;">${formatCurrency(
                products
                  ? products.reduce((acc, order) => {
                      const quantity = order.quantity ?? 1;
                      return acc + order.unitePrice * quantity;
                    }, 0)
                  : 0,
                "USD",
              )}</span></p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default Facture;
