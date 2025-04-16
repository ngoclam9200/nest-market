import { getData } from "../api-service";

import { DataArray, HttpResponse } from "../../response/http-response";
import { CategoryResponse } from "../../response/category";
import { API_CATEGORY_URL } from "../api-endpoint";
 

const domain = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_PRODUCT_PORT + import.meta.env.VITE_API_PREFIX;

export const getListParentCategory = async (param: any): Promise<HttpResponse<CategoryResponse[]>> => {
  try {
    const response = await getData(domain + API_CATEGORY_URL.GET_PARENT_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getListChildCategory = async (param: any): Promise<HttpResponse<DataArray<CategoryResponse>>> => {
  try {
    const response = await getData(domain + API_CATEGORY_URL.GET_CHILD_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllChildCategory = async (param: any): Promise<HttpResponse<CategoryResponse[]>> => {
  try {
    const response = await getData(domain + API_CATEGORY_URL.GET_ALL_CHILD_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCategoryWithCode = async (code: string): Promise<HttpResponse<CategoryResponse>> => {
  try {
    const response = await getData(
      // getUrlWithEndPoint(
      domain + API_CATEGORY_URL.GET_CATEGORY_WITH_CODE + code
      // )
    );
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
