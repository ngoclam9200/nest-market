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
      fetch: (params: { page: number; limit: number; category_id: number; from_price?: number; to_price?: number  , sort_by?: number }) =>
        request({
          endPoint: API_PRODUCT_URL.GET_LIST_PRODUCT,
          data: params,
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

  getNewestProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Get<ProductResponse[]>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { count: number }) =>
        request({
          endPoint: API_PRODUCT_URL.GET_NEWEST_PRODUCT(),
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
  getPopularProduct: () => {
    const { request, baseResponse, loading } = useFetchData.Get<ProductResponse[]>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (params: { count: number }) =>
        request({
          endPoint: API_PRODUCT_URL.GET_POPULAR_PRODUCT(),
          data: params,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
};
