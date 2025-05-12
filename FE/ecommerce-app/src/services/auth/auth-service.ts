import { useFetchData } from "../../hooks/useFetch";
import { UserResponse } from "../../response/user";
import { ApiConfig } from "../api-config";

import { API_AUTH_URL } from "../api-endpoint";


export const AuthService = {
  login: () => {
    const { request, baseResponse, loading } = useFetchData.Post<UserResponse>({ projectId: ApiConfig.PROJECT_ID.AUTH_SERVICE });

    return {
      fetch: (data: { email: string; password: string }) =>
        request({
          endPoint: API_AUTH_URL.LOGIN,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  register: () => {
    const { request, baseResponse, loading } = useFetchData.Post<UserResponse>({ projectId: ApiConfig.PROJECT_ID.AUTH_SERVICE });

    return {
      fetch: (data: { username: string; email: string; password: string }) =>
        request({
          endPoint: API_AUTH_URL.REGISTER,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },

  loginGoogle: () => {
    const { request, baseResponse, loading } = useFetchData.Post<UserResponse>({ projectId: ApiConfig.PROJECT_ID.AUTH_SERVICE });

    return {
      fetch: (data: { credential: string }) =>
        request({
          endPoint: API_AUTH_URL.LOGIN_GOOGLE,
          data: data,
        }),
      response: baseResponse,
      loading: loading,
    };
  },
};
