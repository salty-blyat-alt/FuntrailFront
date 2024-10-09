import { useEffect, useState } from "react";
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
  setResponseData: (data: T) => void;
  triggerFetch?: (data?: U) => void;
  finished: boolean;
}

// Function to fetch the CSRF token
const fetchCsrfToken = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true, // Ensure cookies are sent with the request
    });
    console.log("CSRF token fetched successfully");
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

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

  // Fetch CSRF token on hook initialization
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchData = async (data?: U) => {
    setLoading(true);
    setError(null);
    try {
      // Retrieve the CSRF token from cookies
      const csrfToken = getCsrfTokenFromCookies();

      let requestOption = {
        url: `${baseUrl ?? process.env.PUBLIC_BASE_URL}${endpoint}`,
        method,
        ...config,
        headers: {
          ...config.headers,
          "X-XSRF-TOKEN": csrfToken, // Include CSRF token in headers
        },
        withCredentials: true, // Ensure cookies are sent with the request
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

export default useAxios;
