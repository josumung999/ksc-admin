import React from "react";

interface Props {
  attributeValue: any;
  onDelete: any;
}

export default function AttributeValueItem({
  attributeValue,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stroke px-6 py-5 last:border-b-0 dark:border-strokedark">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-black dark:text-white">
          {attributeValue?.name}
        </p>
        <p className="text-xs text-black dark:text-white">
          {attributeValue?.type}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="text-xs text-meta-1 hover:text-meta-1/90 dark:text-meta-1 dark:hover:text-meta-1/90"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
