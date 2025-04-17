 
 
import { useFetchData } from "../../hooks/useFetch";
import { BannerResponse } from "../../response/banner";
import { ApiConfig } from "../api-config";
import { API_BANNER_URL } from "../api-endpoint";

export const BannerService = {
  getAllBanner: () => {
    const { request, baseResponse, loading } = useFetchData.Get<BannerResponse[]>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: () =>
        request({
          endPoint: API_BANNER_URL.GET_ALL_BANNER,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  createBanner: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { name: string; description: string; title: string; media_id: number }) =>
        request({
          endPoint: API_BANNER_URL.CREATE_BANNER,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  updateBanner: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { id: number; name: string; description: string; title: string; media_id: number }) =>
        request({
          endPoint: API_BANNER_URL.UPDATE_BANNER,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  changeStatusBanner: () => {
    const { request, baseResponse, loading } = useFetchData.Post<any>({
      projectId: ApiConfig.PROJECT_ID.PRODUCT_SERVICE,
    });
    return {
      fetch: (data: { id: number; status: number }) =>
        request({
          endPoint: API_BANNER_URL.CHANGE_STATUS_BANNER(),
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
};
