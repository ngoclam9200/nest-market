import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import { ApiConfig } from "../services/api-config";
import { BaseResponse, HttpMethod } from "../services/base-response";
import { useExpired } from "../state/expired-context";
import { useLoading } from "../state/loading-context";
import { getBearerToken } from "../services/cookie";

type FetchState = {
  loading: boolean;
  error: string | null;
};

const initialFetchState: FetchState = {
  loading: false,
  error: null,
};

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

interface UseFetchProps {
  endPointUrl?: string;
  showScreenLoading?: boolean;
  projectId?: string;
}

const useApi = <T>(method: HttpMethod, showLoading: boolean, projectId?: string) => {
  const [fetchState, setFetchState] = useState<FetchState>(initialFetchState);
  const [baseResponse, setBaseResponse] = useState<BaseResponse<T>>();
  const { setIsLoading } = useLoading();
  const { setExpired } = useExpired();
  const finalToken = getBearerToken() ?? "";
  const request = async ({ endPoint = "", data = {} }): Promise<BaseResponse<T> | void> => {
    if (showLoading) setIsLoading(true);
    setFetchState({ loading: true, error: null });
    try {
      const domain = ApiConfig.API_URL+ projectId;
      const response = await axiosInstance({
        url: `${domain}/api/v1${endPoint}`,
        method: method,
        headers: {
          ...(finalToken && {
            Authorization: `Bearer ${finalToken}`,
          }),
          ...(projectId && { "x-svc-id": projectId }),
          platform: "1", // WEB = 1, MOBILE = 2,
        },
        ...(method === HttpMethod.GET && { params: data }),
        ...(method === HttpMethod.POST && { data: data }),
      });
      setFetchState({ loading: false, error: null });
      if (response.data.status === HttpStatusCode.Unauthorized) {
        setExpired(true);
      } else {
        setBaseResponse(response.data);
      }
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "";
      if (axios.isCancel(error)) {
        console.error("Request cancelled", error instanceof Error ? error.message : String(error));
        errorMessage = error instanceof Error ? error.message : "Request cancelled";
      } else {
        errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      }
      setFetchState({ loading: false, error: errorMessage });
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  return { baseResponse, request, ...fetchState };
};
// Wrapper for cleaner method access
export const useFetchData = {
  Get: <T>({ projectId = ApiConfig.PROJECT_ID.USER_SERVICE, showScreenLoading = false }: UseFetchProps = {}) => {
    return useApi<T>(HttpMethod.GET, showScreenLoading, projectId);
  },
  Post: <T>({ projectId = ApiConfig.PROJECT_ID.USER_SERVICE, showScreenLoading = false }: UseFetchProps = {}) => {
    return useApi<T>(HttpMethod.POST, showScreenLoading, projectId);
  },
};
