import  axiosConfig  from "@/api-config/axiosConfig";

export const crudServices = (path: string) => ({
    create: async (body: object) => {
        try {
            const response = await axiosConfig.post(`${path}/create`, body);
            return response.data;
        }
        catch (error) {
            console.log("error::", error)
            return null
        }
    },

    getAll: async () => {
        try {
            const response = await axiosConfig.get(`${path}/get-all`);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getOne: async (id: string) => {
        try {
            const response = await axiosConfig.get(`${path}/get-one/${id}`);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    update: async (body: object, id: string) => {
        try {
            const response = await axiosConfig.put(`${path}/update/${id}`, body);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await axiosConfig.delete(`${path}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
});
