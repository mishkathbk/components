import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputField from "@/components/forms/custom-fields/CustomInputField";
import CustomSelectField from "@/components/forms/custom-fields/CustomSelectField";
import { CustomerServicesApi } from "@/modules/sales/customer/services/CustomerServices";
import toast from "react-hot-toast";

const statusOptions = [
    { label: "Active", value: "300001" },
    { label: "Inactive", value: "300002" },
];

const customerSchema = z.object({
    customerName: z.string().min(1, "Customer Name is required"),
    contactPerson: z.string().min(1, "Contact Person is required"),
    telephone: z
        .string()
        .min(10, "Telephone must be 10 digits")
        .max(14, "Too long")
        .regex(/^\d+$/, "Must be numeric"),
    mobileNo: z
        .string()
        .min(10, "Mobile No must be 10 digits")
        .max(14, "Too long")
        .regex(/^\d+$/, "Must be numeric"),
    email: z.string().email("Invalid email"),
    statusCd: z.string().min(1, "Select status"),
});

type TCustomerSchema = z.infer<typeof customerSchema>;

const CustomerAdd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TCustomerSchema>({
        resolver: zodResolver(customerSchema),
    });

    const onSubmit = async (data: TCustomerSchema) => {
        try {
            const codeResponse = await CustomerServicesApi.customerCodeGenerator();
            console.log("codeResponse:::", codeResponse)
            if (codeResponse?.status !== 200) {
                toast.error("Failed to generate customer code");
                return;
            }
            const formattedData = {
                ...data,
                statusCd: Number(data.statusCd),
                customerCode: codeResponse.result,
            };
            console.log("formattedData:::", formattedData)

            const createResponse = await CustomerServicesApi.createCustomer(formattedData);
            if (createResponse?.status === 200) {
                toast.success("Customer created successfully");
                reset();
                window.location.href = "/customer";
            } else {
                toast.error("Failed to create customer");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred");
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <CustomInputField
                type="text"
                register={register("customerName")}
                label="Customer Name"
                placeholder="Enter customer name"
                error={errors?.customerName}
            />
            <CustomInputField
                type="text"
                register={register("contactPerson")}
                label="Contact Person"
                placeholder="Enter contact person"
                error={errors?.contactPerson}
            />
            <CustomInputField
                type="text"
                register={register("telephone")}
                label="Telephone"
                placeholder="Enter telephone"
                error={errors?.telephone}
            />
            <CustomInputField
                type="text"
                register={register("mobileNo")}
                label="Mobile No"
                placeholder="Enter mobile number"
                error={errors?.mobileNo}
            />
            <CustomInputField
                register={register("email")}
                label="Email"
                placeholder="Enter email"
                type="email"
                error={errors?.email}
            />
            <CustomSelectField
                label="Status"
                register={register("statusCd")}
                error={errors?.statusCd}
                placeholder="Select status"
                options={statusOptions}
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-fit"
            >
                {isSubmitting ? "Submitting..." : "Add Customer"}
            </button>
        </form>
    );
};

export default CustomerAdd;
