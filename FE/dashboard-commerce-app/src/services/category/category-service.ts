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
      fetch: (params : {   page: number; limit: number }) =>
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
      fetch: ( ) =>
        request({
          endPoint: API_CATEGORY_URL.GET_ALL_CHILD_CATEGORY,
          // params: params,
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

  createCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { name: string; description: string; parent_id?: number | null;  media_id: number }) =>
        request({
          endPoint: API_CATEGORY_URL.CREATE_CATEGORY,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  updateCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { id: number; name: string; description: string;  media_id: number }) =>
        request({
          endPoint: API_CATEGORY_URL.UPDATE_CATEGORY,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  changeStatusCategory: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { id: number; status: number }) =>
        request({
          endPoint: API_CATEGORY_URL.CHANGE_STATUS_CATEGORY(),
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
};
