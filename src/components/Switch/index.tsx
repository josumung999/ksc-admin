import React, { useState } from "react";
import { useController } from "react-hook-form";

interface SwitchProps {
  name: string;
  control: any;
}

const Switch: React.FC<SwitchProps> = ({ name, control }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false, // set the default value if needed
  });

  return (
    <div>
      <label
        htmlFor={name}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={name}
            className="sr-only"
            checked={value}
            onChange={() => {
              onChange(!value);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              value && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
