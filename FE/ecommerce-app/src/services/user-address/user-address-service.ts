import { useFetchData } from "../../hooks/useFetch";
import { DataArray } from "../../response/http-response";
import { UserAddressResponse } from "../../response/user-address";
import { ApiConfig } from "../api-config";

import { API_USER_ADDRESS_URL } from "../api-endpoint";

export const UserAddressService = {
  getListUserAddress: () => {
    // const { request, baseResponse, loading } = useFetchData.Get<UserAddressResponse>({ projectId: ApiConfig.PROJECT_ID.USER_SERVICE });
    const { request, baseResponse, loading } = useFetchData.Get<UserAddressResponse>({
      projectId: ApiConfig.PROJECT_ID.USER_SERVICE,
    });
    return {
      fetch: () =>
        request({
          endPoint: API_USER_ADDRESS_URL.GET_LIST_ADDRESS,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
  getUserAddressDefault: () => {
    const { request, baseResponse, loading } = useFetchData.Get<UserAddressResponse>({ projectId: ApiConfig.PROJECT_ID.USER_SERVICE });
    return {
      fetch: () =>
        request({
          endPoint: API_USER_ADDRESS_URL.GET_ADDRESS_DEFAULT,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  // register: () => {
  //   const { request, baseResponse, loading } = useFetchData.Post<UserResponse>({ projectId: ApiConfig.PROJECT_ID.AUTH_SERVICE });

  //   return {
  //     fetch: (data: { username: string; email: string; password: string }) =>
  //       request({
  //         endPoint: API_AUTH_URL.REGISTER,
  //         data: data,
  //       }),
  //     response: baseResponse,
  //     loading: loading,
  //   };
  // },
};
