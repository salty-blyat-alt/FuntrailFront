"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import useAxios from "../hooks/use-axios";
import { getCookie, setCookie } from "cookies-next";

// Define the shape of the context value
interface AuthContextType {
  user?: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchProfile: ((data?: undefined) => void) | undefined;
}

// Define the User type (you can customize this according to your needs)
interface User {
  id?: number;
  username?: string;
  email?: string;
  balance?: string;
  user_type?: string;
  province?: number;
  phone_number?: string;
  profile_img?: string;
  establishment_id?: number;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap around parts of the app that need auth
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false); // Track if the profile has been fetched
  const access_token = getCookie("access_token");
  const { triggerFetch: fetchProfile, responseData: profile } = useAxios<
    any,
    undefined
  >({
    endpoint: "/api/auth/profile",
    method: "GET",
    config: {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  });

  useEffect(() => {
    // Fetch profile only if access token exists and it hasn't been fetched yet
    if (access_token && !hasFetchedProfile) {
      fetchProfile?.();
      setHasFetchedProfile(true); // Mark as fetched
    }
  }, [access_token, hasFetchedProfile]);

  useEffect(() => {
    // Update user state when the profile response changes
    if (profile) {
      setUser(profile);
      setCookie("establishment_id", profile.establishment_id, {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        secure: true,
        sameSite: true,
      });
    }
  }, [profile]);

  const contextValue = { user, setUser, fetchProfile };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
