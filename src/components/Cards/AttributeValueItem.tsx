import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface Props {
  attributeValue: any;
  onDelete: any;
}

export default function AttributeValueItem({
  attributeValue,
  onDelete,
}: Props) {
  return (
    <Card>
      <CardContent className="flex w-full items-center justify-between p-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-black dark:text-white">
            {attributeValue?.name}
          </p>
          <p className="text-xs text-black dark:text-white">
            {attributeValue?.type}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-black dark:text-white">
            {attributeValue?.value}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
            className="text-xs text-meta-1 hover:text-meta-1/90 dark:text-meta-1 dark:hover:text-meta-1/90"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
