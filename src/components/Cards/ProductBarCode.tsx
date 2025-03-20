import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

interface ProductBarCodeProps {
  value: string;
}

const ProductBarCode: React.FC<ProductBarCodeProps> = ({ value }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [value]);

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Code-barres</CardTitle>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef} />
      </CardContent>
      <CardFooter className="items-center justify-center">
        <Button size="lg" color="primary" className="w-fit">
          <Printer className="mr-2 h-5 w-5" />
          Imprimer le code-barres
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductBarCode;
