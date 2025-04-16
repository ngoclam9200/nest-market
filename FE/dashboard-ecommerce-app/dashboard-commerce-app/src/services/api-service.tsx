import axios, { AxiosResponse } from "axios";
import { IHttpResponse } from "../interface/IHttpResponse";
import { getBearerToken } from "./cookie";

export const postData = async <T,>(url: string, data: T): Promise<IHttpResponse<any>> => {
  try {
    const token = getBearerToken();
    const response: AxiosResponse<IHttpResponse<any>> = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      return data;
    }
    throw error;
  }
};

export const getData = async (url: string, param?: any): Promise<IHttpResponse<any>> => {
  try {
    const token = getBearerToken();
    const response: AxiosResponse<IHttpResponse<any>> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: param,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      return data;
    }
    throw error;
  }
};
