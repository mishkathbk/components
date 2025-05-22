import React, { useState } from "react";
// import CustomRadio from "@/components/custom/CustomRadio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "./custom-fields/CustomInputField";
import CustomTextAreaField from "./custom-fields/CustomTextAreaField";
import CustomRadioField from "./custom-fields/CustomRadioField";
import CustomDateField from "./custom-fields/CustomDateField";
import CustomSelectField from "./custom-fields/CustomSelectField";
import CustomCheckBoxField from "./custom-fields/CustomCheckBoxField";
import DropzoneUploads from "../uploads/DropzoneUploads";

const radioOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const Form = () => {
  const [selectedRadio, setSelectedRadio] = useState<string>(radioOptions.at(0)?.value!);
  const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is required"),
    radio: z.string().min(1, "radio is required"),
    country: z.string().min(1, "Please select a country"),
    birthDate: z.string().refine((val) => new Date(val).toString() !== "Invalid Date", {
      message: "Please enter a valid date",
    }),
    phone: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(14, "Phone number too long")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers")
      .refine(val => {
        const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return regex.test(val);
      }, "Invalid phone number format"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    message: z.string().min(2, "Message is required"),
  });
  type TContactSchema = z.infer<typeof contactSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });


  const onSubmit = (formData: TContactSchema) => {
    console.log("formData::", formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col w-full gap-[1.5rem]">
        <CustomInputField
          register={register("name")}
          type="text"
          error={errors?.name}
          label="Name"
          placeholder="Enter your name"
        />

        <CustomInputField
          register={register("email")}
          error={errors?.email}
          type="email"
          label=" Email ID"
          placeholder="Enter your email"
        />

        <CustomInputField
          register={register("phone")}
          error={errors?.phone}
          type="text"
          label=" phone No"
          placeholder="Enter your phone no"
        />

        <CustomSelectField label="Select your country.." register={register("country")} error={errors?.country} placeholder="select a country" options={["india", "uae", "china"]} />

        <CustomCheckBoxField label="Accept term and conditions*" id="acceptTerms" register={register("acceptTerms")} error={errors?.acceptTerms} />

        <CustomRadioField name="Gender" options={radioOptions} register={register("radio")} error={errors?.radio} selectedRadio={selectedRadio} setSelectedRadio={setSelectedRadio} />

        <CustomDateField label="D O B" register={register("birthDate")} error={errors?.birthDate} placeholder="DOB" />

        <CustomTextAreaField label="Message" register={register("message")} errors={errors?.message!} />

        <button
          type="submit"
          className="text-white hover:text-accoreBlue leading-[1.225rem] bg-accoreBlue hover:bg-white w-fit  rounded-sm cursor-pointer text-[1rem] px-[0.7rem] py-[0.5rem]"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
};

export default Form;
