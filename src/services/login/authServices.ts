import  axiosConfig  from "@/api-config/axiosConfig";

export const LoginApi = {
  login: async function (body: object) {
    const response = await axiosConfig.post(
      "https://stg.accorelab.com/api/Authenticate/Token",
      body,
      {
        headers: {
          "X-Api-Key": "12345ABCDE67890FGHIJ",
        },
      }
    );
    return response.data;
  },
};
