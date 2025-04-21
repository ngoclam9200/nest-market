import { useFetchData } from "../../hooks/useFetch";
import { CategoryResponse } from "../../response/category";
import { DataArray } from "../../response/http-response";
import { ApiConfig } from "../api-config";
import { API_CATEGORY_URL } from "../api-endpoint";

export const CategoryService = {
  getListParentCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Get<CategoryResponse[]>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { status: number;  }) =>
        request({
          endPoint: API_CATEGORY_URL.GET_PARENT_CATEGORY,
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  getListChildCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Get<DataArray<CategoryResponse>>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { page: number; limit: number }) =>
        request({
          endPoint: API_CATEGORY_URL.GET_CHILD_CATEGORY,
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  getAllChildCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Get<CategoryResponse[]>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { parent_id: number; status: number }) =>
        request({
          endPoint: API_CATEGORY_URL.GET_ALL_CHILD_CATEGORY,
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  getCategoryWithCode: () => {
    const { request, baseResponse, loading } = useFetchData.Get<CategoryResponse>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (code: string) =>
        request({
          endPoint: API_CATEGORY_URL.GET_CATEGORY_WITH_CODE + code,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

 
 

 
};
