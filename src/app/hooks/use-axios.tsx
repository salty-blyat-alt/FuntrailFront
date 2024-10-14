import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export type AxiosMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseAxiosProps {
  endpoint: string;
  method?: AxiosMethod;
  config?: AxiosRequestConfig;
  baseUrl?: string;
}

interface CustomAxiosResponse<T = any> extends AxiosResponse {
  data: {
    result: boolean;
    result_code: number;
    result_message: string;
    body: T;
  };
}

interface UseAxiosReturn<T, U> {
  loading: boolean;
  error: string | null;
  responseData: T | null;
  setResponseData: (data: T) => void;
  setResponseDataWithStat: (data: {
    result: boolean;
    result_code: number;
    result_message: string;
    body: T;
  }) => void; // Adjusted type
  responseDataWithStat: {
    result: boolean;
    result_code: number;
    result_message: string;
    body: T;
  } | null; // Adjusted type
  triggerFetch?: (data?: U) => void;
  finished: boolean;
}

// Function to fetch the CSRF token
const fetchCsrfToken = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true, // Ensure cookies are sent with the request
    });
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

const useAxios = <T, U>({
  endpoint,
  method = "GET",
  config = {},
  baseUrl = "localhost:8000",
}: UseAxiosProps): UseAxiosReturn<T, U> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [responseDataWithStat, setResponseDataWithStat] = useState<{
    result: boolean;
    result_code: number;
    result_message: string;
    body: T;
  } | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchData = async (data?: U) => {
    setLoading(true);
    setError(null);
    try {
      const csrfToken = getCsrfTokenFromCookies();
      const access_token = getAccessToken();

      let requestOption = {
        url: `http://${baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        method,
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${access_token}`,
          "X-XSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      };

      if (data) {
        requestOption = {
          ...requestOption,
          data: data,
        };
      }

      const response: CustomAxiosResponse<T> = await axios({
        ...requestOption,
      });

      const statusCode = response.status;
      console.log("statusCode", statusCode);

      const { body, result, result_code, result_message } = response.data;
      setResponseData(body);
      // Set only the relevant data in responseDataWithStat
      setResponseDataWithStat({ result, result_code, result_message, body });
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        // Redirect to login page on 401 Unauthorized
        window.location.href = "/auth/login";
      } else {
        setError(err.message || "Something went wrong!");
      }
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
    responseDataWithStat,
    setResponseDataWithStat,
    responseData,
    triggerFetch,
    finished,
  };
};

// Helper function to get CSRF token from cookies
const getCsrfTokenFromCookies = () => {
  const name = "XSRF-TOKEN=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");

  for (let cookie of cookiesArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

const getAccessToken = () => {
  const name = "access_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");

  for (let cookie of cookiesArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export default useAxios;
