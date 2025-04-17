import { useFetchData } from "../../hooks/useFetch";
import { ProductResponse } from "../../response/product";
import { DataArray } from "../../response/http-response";
import { ApiConfig } from "../api-config";
import { API_PRODUCT_URL } from "../api-endpoint";

export const ProductService = {
  getListProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Get<DataArray<ProductResponse>>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { page: number; limit: number }) =>
        request({
          endPoint: API_PRODUCT_URL.GET_LIST_PRODUCT,
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  createProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: {
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
      }) =>
        request({
          endPoint: API_PRODUCT_URL.CREATE_PRODUCT,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  updateProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: {
        id: number;
        name: string;
        description: string;
        category_id: number;
        list_media_id: number[];
        discount: number;
        unit: string;
        price: number;
        quantity: number;
      }) =>
        request({
          endPoint: API_PRODUCT_URL.UPDATE_PRODUCT(),
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  getDetailProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Get<ProductResponse>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (id: number) =>
        request({
          endPoint: API_PRODUCT_URL.DETAIL_PRODUCT(id),
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  changeStatusProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { id: number; status: number }) =>
        request({
          endPoint: API_PRODUCT_URL.CHANGE_STATUS_PRODUCT(),
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
};
