import { getData, postData } from "../api-service";
import { ApiUrlCategoryEnum, getUrlWithEndPoint } from "../../enums/ApiEnum";
import { IDataArray, IHttpResponse } from "../../interface/IHttpResponse";
import { ICategory } from "../../interface/ICategory";

const domain =
  import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_PRODUCT_PORT + import.meta.env.VITE_API_PREFIX;

export const getListParentCategory = async (param: any): Promise<IHttpResponse<ICategory[]>> => {
  try {
    const response = await getData(domain + ApiUrlCategoryEnum.GET_PARENT_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getListChildCategory = async (param: any): Promise<IHttpResponse<IDataArray<ICategory>>> => {
  try {
    const response = await getData(domain + ApiUrlCategoryEnum.GET_CHILD_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllChildCategory = async (param: any): Promise<IHttpResponse<ICategory[]>> => {
  try {
    const response = await getData(domain + ApiUrlCategoryEnum.GET_ALL_CHILD_CATEGORY, param);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCategoryWithCode = async (code: string): Promise<IHttpResponse<ICategory>> => {
  try {
    const response = await getData(
      // getUrlWithEndPoint(
      domain + ApiUrlCategoryEnum.GET_CATEGORY_WITH_CODE + code
      // )
    );
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const createCategory = async (
  name: string,
  description: string,
  parent_id: number | null,
  branch_id: number,
  media_id: number
): Promise<IHttpResponse<any>> => {
  try {
    const response = await postData<{
      name: string;
      description: string;
      parent_id?: number | null;
      branch_id: number;
      media_id: number;
    }>(domain + ApiUrlCategoryEnum.CREATE_CATEGORY, {
      name,
      description,
      parent_id,
      media_id,
      branch_id,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const updateCategory = async (
  id: number,
  name: string,
  description: string,
  branch_id: number,
  media_id: number
): Promise<IHttpResponse<any>> => {
  try {
    const response = await postData<{
      id: number;
      name: string;
      description: string;
      branch_id: number;
      media_id: number;
    }>(domain + ApiUrlCategoryEnum.UPDATE_CATEGORY, {
      id,
      name,
      description,
      branch_id,
      media_id,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const changeStatusCategory = async (id: number, status: number): Promise<IHttpResponse<any>> => {
  try {
    const response = await postData<{
      status: number;
    }>(domain + getUrlWithEndPoint("categories/" + id, "/change-status"), {
      status,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
