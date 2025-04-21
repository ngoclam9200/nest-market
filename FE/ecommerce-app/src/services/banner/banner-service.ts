 
 
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
 
};
