import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseAxiosProps {
  endpoint: string;
  method?: AxiosMethod;
  config?: AxiosRequestConfig;
  baseUrl?: string;
}

interface UseAxiosReturn<T, U> {
  loading: boolean;
  error: string | null;
  responseData: T | null;
  triggerFetch?: (data?: U) => void;
  setResponseData: (data: T) => void;
  finished: boolean;
}

const useAxios = <T, U>({
  endpoint,
  method = "GET",
  config = {},
  baseUrl,
}: UseAxiosProps): UseAxiosReturn<T, U> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [finished, setFinished] = useState(false);
  const fetchData = async (data?: U) => {
    setLoading(true);
    setError(null);
    try {
      let requestOption = {
        url: `${baseUrl ?? import.meta.env.VITE_BASE_URL}${endpoint}`,
        method,
        ...config,
      };
      if (data) {
        requestOption = {
          ...requestOption,
          data: data,
        };
      }
      const response: AxiosResponse<T> = await axios({ ...requestOption });
      setResponseData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const triggerFetch = (data?: U) => {
    fetchData(data).finally(() => {
      setFinished(true);
      setTimeout(() => {
        setFinished(false);
      }, 0);
    });
  };

  return {
    loading,
    error,
    setResponseData,
    responseData,
    triggerFetch,
    finished,
  };
};

export default useAxios;
