import { getData, postData } from "../api-service";
 
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

export const createProduct = async (
  name: string,
  description: string,
  category_id: number,
  price: number,
  branch_id: number,
  default_media_id: number,
  list_media_id: number[],
  discount: number,
  unit: string,
  quantity: number
): Promise<HttpResponse<any>> => {
  try {
    const response = await postData<{
      name: string;
      description: string;
      category_id: number;
      price: number;
      branch_id: number;
      default_media_id: number;
      list_media_id: number[];
      discount: number;
      unit: string;
      quantity: number;
    }>(domain + API_PRODUCT_URL.CREATE_PRODUCT, {
      name,
      description,
      category_id,
      price,
      branch_id,
      default_media_id,
      list_media_id,
      discount,
      unit,
      quantity,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const updateProduct = async (
  id: number,
  name: string,
  description: string,
  category_id: number,
  list_media_id: number[],
  discount: number,
  unit: string,
  price: number,
  quantity: number
): Promise<HttpResponse<any>> => {
  try {
    const response = await postData<{
      id: number;
      name: string;
      description: string;
      category_id: number;
      list_media_id: number[];
      discount: number;
      unit: string;
      price: number;
      quantity: number;
    }>(domain + API_PRODUCT_URL.UPDATE_PRODUCT(), {
      id,
      name,
      description,
      category_id,
      list_media_id,
      discount,
      unit,
      price,
      quantity,
    });
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

export const changeStatusProduct = async (id: number, status: number): Promise<HttpResponse<any>> => {
  try {
    const response = await postData(domain + API_PRODUCT_URL.CHANGE_STATUS_PRODUCT(), { id: id, status: status });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
