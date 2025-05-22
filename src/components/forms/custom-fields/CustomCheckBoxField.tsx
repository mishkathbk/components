import React from "react";
import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  error?: FieldError;
  label: string | React.ReactNode;
  id: string;
  className?: string;
  disabled?: boolean;
};

const CustomCheckBoxField = ({
  register,
  error,
  label,
  id,
  className = "",
  disabled = false,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          {...register}
          disabled={disabled}
          className={`w-4 h-4 text-accoreBlue focus:ring-accoreBlue border-gray-300 rounded ${
            error ? "border-red-500" : ""
          }`}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default CustomCheckBoxField;