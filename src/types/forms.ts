import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: any;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  icon?: any;
};

export type ValidFieldNames = any;

export type SigninFormData = {
  email: string;
  password: string;
};

export type CreateUserFormData = {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type CreateReportFormData = {
  startDate: string;
  endDate: string;
};

export type CreateReportItemFormData = {
  province: string;
  totalCases: number;
  confirmedCases: number;
  deaths: number;
  recovered: number;
};
