import React from "react";
import {
    FieldError,
    UseFormRegisterReturn,
} from "react-hook-form";

type Option = {
    value: string;
    label: string;
};

type Props = {
    label: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    options: Option[];
    placeholder?: string;
    className?: string;
};

const CustomSelectField = ({
    label,
    register,
    error,
    options,
    placeholder = "Select an option",
    className = "",
}: Props) => {
    return (
        <div className={`flex flex-col gap-2  ${className}`}>
            <label className="font-inter  text-sm font-semibold text-gray80">
                {label}
            </label>
            <select
                {...register}
                className=" h-[2.5rem] w-fit px-[0.5rem]  font-inter border border-gray-300 rounded-md text-gray80 bg-white"
                defaultValue=""
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-500 text-sm">{error.message}</p>
            )}
        </div>
    );
};

export default CustomSelectField;