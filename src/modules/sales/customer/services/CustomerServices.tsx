import { axiosConfig } from "@/api-config/axiosConfig";
import { crudServices } from "../../../../services/CrudServices";

export const CustomerServicesApi = {
  createCustomer: async (body: object) => {
    console.log("body0:::",body)
    try {
      const response = await axiosConfig.post("https://stg.accorelab.com/api/Customer/Create", body, {
        headers: {
          "X-Api-Key": "12345ABCDE67890FGHIJ",
        },
      });
      return response.data;
    }
    catch (error) {
      console.log("error::", error);
      return null;
    }
  },
  customerCodeGenerator: async () => {
    try {
      const response = await axiosConfig.get("https://stg.accorelab.com/api/DocReference/NextReferenceNo?docCode=FRM019", {
        headers: {
          "X-Api-Key": "12345ABCDE67890FGHIJ",
        },
      });
      return response.data;
    }
    catch (error) {
      console.log("error::", error);
      return null;
    }
  },
  CustomerListPagination: async (body: object) => {
    try {
      const response = await axiosConfig.post("https://stg.accorelab.com/api/Customer/List/Pagination", body, {
        headers: {
          "X-Api-Key": "12345ABCDE67890FGHIJ",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAllCustomer: async () => {
    try {
      const response = await axiosConfig.get("https://stg.accorelab.com/api/Customer/List", {
        headers: {
          "X-Api-Key": "12345ABCDE67890FGHIJ",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getOneCustomer: async (id: string) => {
    try {
      const response = await axiosConfig.get(`customers/get-one/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteCustomer: async (id: string) => {
    try {
      const response = await axiosConfig.delete(`customers/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateCustomer: async (body: object, id: string) => {
    try {
      const response = await axiosConfig.put(`customers/update/${id}`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
export const CustomerServicesCrud = crudServices("create").create
