// apiService.ts

import axios, { AxiosResponse } from "axios";
import { getBearerToken } from "./Cookie";
import { IHttpResponse } from "../interface/IHttpResponse";

export const postData = async <T,>(
  url: string,
  data: T
): Promise<IHttpResponse<any>> => {
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

export const getData = async (url: string): Promise<IHttpResponse<any>> => {
  try {
    const token = getBearerToken();
    const response: AxiosResponse<IHttpResponse<any>> = await axios.get(url, {
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
