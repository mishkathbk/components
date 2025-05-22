import React from "react";
import {
    FieldError,
    UseFormRegisterReturn,
} from "react-hook-form";

type Props = {
    label: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    placeholder?: string;
    className?: string;
    minDate?: string;
};

const CustomDateField = ({
    label,
    register,
    error,
    placeholder = "Select date",
    className = "",
    minDate = new Date().toISOString().split('T')[0],
}: Props) => {
    return (
        <div className={`flex flex-col w-fit gap-2 ${className}`}>
            <label className="font-inter leading-[1.225rem] text-sm font-semibold text-gray80">
                {label}
            </label>
            <input
                type="date"
                {...register}
                placeholder={placeholder}
                min={minDate}
                className="w-full h-[2.5rem] font-inter p-5 border border-gray-300 rounded-md text-gray80"
            />
            {error && (
                <p className="text-red-500 text-sm">{error.message}</p>
            )}
        </div>
    );
};

export default CustomDateField;