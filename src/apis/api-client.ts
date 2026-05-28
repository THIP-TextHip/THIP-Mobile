import { AxiosError, create, type AxiosRequestConfig } from "axios";

import { getAuthToken } from "./token-storage";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

export type ApiSuccessResponse<T> = {
  isSuccess: true;
  code: number;
  message: string;
  requestId: string;
  data: T;
};

export type ApiErrorResponse = {
  isSuccess: false;
  code: number;
  message: string;
  requestId: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ApiClientResponse<T> = {
  data: T;
  code: number;
  message: string;
  requestId: string;
  status: number;
};

export class ApiError extends Error {
  code: number;
  requestId: string;
  status?: number;

  constructor(response: ApiErrorResponse, status?: number) {
    super(response.message);
    this.name = "ApiError";
    this.code = response.code;
    this.requestId = response.requestId;
    this.status = status;
  }
}

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("EXPO_PUBLIC_API_BASE_URL is not defined.");
}

const axiosInstance = create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (config.skipAuth) {
    return config;
  }

  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const response = data as Partial<ApiErrorResponse>;

  return (
    response.isSuccess === false &&
    typeof response.code === "number" &&
    typeof response.message === "string" &&
    typeof response.requestId === "string"
  );
};

const request = async <T>(
  config: AxiosRequestConfig,
): Promise<ApiClientResponse<T>> => {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>(config);
    const responseData = response.data;

    if (!responseData.isSuccess) {
      throw new ApiError(responseData, response.status);
    }

    return {
      data: responseData.data,
      code: responseData.code,
      message: responseData.message,
      requestId: responseData.requestId,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (
      error instanceof AxiosError &&
      isApiErrorResponse(error.response?.data)
    ) {
      throw new ApiError(error.response.data, error.response.status);
    }

    throw error;
  }
};

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "GET", url }),

  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "POST", url, data }),

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "PUT", url, data }),

  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "PATCH", url, data }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "DELETE", url }),
};
