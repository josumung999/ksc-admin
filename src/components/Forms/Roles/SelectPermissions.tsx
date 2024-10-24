import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect, useRef } from "react";

interface Option {
  name: string;
  code: string;
}

interface SelectPermissionsProps {
  options: Option[];
  selectedValues: Option[];
  onChange: (values: Option[]) => void;
}

const SelectPermissions: React.FC<SelectPermissionsProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);

  const toggleSelect = (option: Option) => {
    const exists = selectedValues.find((c) => c.code === option.code);
    const newSelected = exists
      ? selectedValues.filter((c) => c.code !== option.code)
      : [...selectedValues, option];
    onChange(newSelected); // Update form state
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current || !triggerRef.current) return;
      if (
        dropdownRef.current.contains(target) ||
        triggerRef.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return (
    <div className="relative z-50 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300 [&>span]:line-clamp-1">
      <div ref={triggerRef} onClick={() => setShow(!show)} className="w-full ">
        <div className="flex items-center justify-between">
          <span>
            {selectedValues.length
              ? selectedValues.map((c) => c.name).join(", ")
              : "Choisissez des permissions"}
          </span>
          <button
            className="flex cursor-default items-center justify-center py-1"
            type="button"
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      {show && (
        <div
          ref={dropdownRef}
          // className="absolute left-0 top-full mt-2 w-full border bg-white shadow "
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute left-0 top-full z-[99999999999999] mt-2 max-h-96 w-full min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
          )}
        >
          {options.map((option) => (
            <div
              key={option.code}
              className={`cursor-pointer p-2 ${
                selectedValues.some((c) => c.code === option.code)
                  ? "bg-gray"
                  : ""
              }`}
              onClick={() => toggleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectPermissions;
