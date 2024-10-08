import { FormFieldProps } from "@/types/forms";
import React from "react";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  icon,
}) => (
  <>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...register(name, { valueAsNumber })}
      />

      {icon && (
        <span className="absolute right-4 top-4">
          {React.createElement(icon)}
        </span>
      )}
    </div>
    {error && <span className="text-red">{error.message}</span>}
  </>
);
export default FormField;
