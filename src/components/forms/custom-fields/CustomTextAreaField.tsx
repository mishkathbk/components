import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
    register: UseFormRegisterReturn,
    errors: FieldError;
    label:string
}
const CustomTextAreaField = ({ register, errors ,label}: Props) => {
    return (
        <div>
            <label className="font-inter leading-[1.225rem] text-sm font-semibold text-gray80">
                {label}
            </label>
            <textarea
                {...register}
                placeholder="Please type your message"
                className=" pt-[1rem] pl-[1.25rem] w-full border border-gray-300 rounded-md text-gray80 font-inter h-28"
            />
            {
                errors?.message && (
                    <p className=" text-red-500 ">{`${errors.message}`}</p>
                )
            }
        </div>

    )
}

export default CustomTextAreaField