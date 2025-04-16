import { getData } from "../api-service";

import { DataArray, HttpResponse } from "../../response/http-response";
import { ProductResponse } from "../../response/product";
import { API_PRODUCT_URL } from "../api-endpoint";
 

const domain = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_PRODUCT_PORT + import.meta.env.VITE_API_PREFIX;

export const getListProduct = async (param: { page: number; limit: number }): Promise<HttpResponse<DataArray<ProductResponse>>> => {
  try {
    const response = await getData(domain + API_PRODUCT_URL.GET_LIST_PRODUCT, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getDetailProduct = async (id: number): Promise<HttpResponse<ProductResponse>> => {
  try {
    const response = await getData(domain + API_PRODUCT_URL.DETAIL_PRODUCT(id), {});
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
