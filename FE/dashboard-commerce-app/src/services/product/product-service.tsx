import { getData, postData } from "../api-service";
import {  ApiUrlProduct, getUrlWithEndPoint } from "../../enums/ApiEnum";
import { IDataArray, IHttpResponse } from "../../interface/IHttpResponse";
import { IProduct } from "../../interface/IProduct";

const domain =
  import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_PRODUCT_PORT + import.meta.env.VITE_API_PREFIX;

export const getListProduct = async (param: {
  page: number;
  limit: number;
}): Promise<IHttpResponse<IDataArray<IProduct>>> => {
  try {
    const response = await getData(domain + ApiUrlProduct.GET_LIST_PRODUCT, param);
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
  list_media_id: number[]
): Promise<IHttpResponse<any>> => {
  try {
    const response = await postData<{
      name: string;
      description: string;
      category_id: number;
      price: number;
      branch_id: number;
      default_media_id: number;
      list_media_id: number[];
    }>(domain + ApiUrlProduct.CREATE_PRODUCT, {
      name,
      description,
      category_id,
      price,
      branch_id,
      default_media_id,
      list_media_id,
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
  media_id: number
): Promise<IHttpResponse<any>> => {
  try {
    const response = await postData<{
      id: number;
      name: string;
      description: string;
      media_id: number;
    }>(domain + ApiUrlProduct.UPDATE_PRODUCT, {
      id,
      name,
      description,
      media_id,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const detailProduct = async (): Promise<IHttpResponse<IProduct>> => {
  try {
    const response = await getData(domain + (ApiUrlProduct.DETAIL_PRODUCT), {});
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const changeStatusProduct = async (id: number, status: number): Promise<IHttpResponse<any>> => {
  try {

    const response = await postData<{
      status: number;
    }>(domain + getUrlWithEndPoint("/change-status", "categories/" + id), {
      status,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


