import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import CreateAttributeValue from "../Forms/ProductVariants/CreateAttributeValue";

interface Props {
  attributeValue: any;
  onDelete: any;
  availableAttributes?: any;
}

export default function AttributeValueItem({
  attributeValue,
  onDelete,
  availableAttributes,
}: Props) {
  const [edit, setEdit] = React.useState(false);

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

          <Button
            variant="outline"
            size="icon"
            onClick={() => setEdit(!edit)}
            className="text-xs text-meta-5 hover:text-meta-5/90 dark:text-meta-5 dark:hover:text-meta-5/90"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      {edit && (
        <CreateAttributeValue
          attributeValue={attributeValue}
          setEdit={setEdit}
          availableAttributes={availableAttributes}
        />
      )}
    </Card>
  );
}
