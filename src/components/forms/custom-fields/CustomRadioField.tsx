import React from "react";
import {
    FieldError,
    UseFormRegisterReturn,
} from "react-hook-form";

type RadioOption = {
    value: string;
    label: string;
};

type Props = {
    name?: string;
    options: RadioOption[];
    register: UseFormRegisterReturn;
    error?: FieldError;
    selectedRadio?: string;
    setSelectedRadio: (value: string) => void;
    className?: string;
};

const CustomRadioField = ({
    name,
    options,
    register,
    error,
    selectedRadio,
    setSelectedRadio,
    className = "",
}: Props) => {

    return (
        <div>
            <h2 className="text-[1.2rem] font-medium pb-[0.5rem]">
                {name}
            </h2>
            <div className={`flex flex-col gap-3 ${className}`}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            {...register}
                            value={option.value}
                            checked={selectedRadio === option.value}
                            onChange={(e) => setSelectedRadio(e.target.value)}
                            className="w-4 h-4 text-accoreBlue focus:ring-accoreBlue border-gray-300"
                        />
                        <span className="font-inter text-gray80">{option.label}</span>
                    </label>
                ))}
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
            </div>
        </div>
    );
};

export default CustomRadioField;