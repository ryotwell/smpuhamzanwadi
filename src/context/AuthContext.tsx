"use client";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import api from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";

interface User {
  user_id: string;
  fullname?: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: async () => { },
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(APIPATHS.PROFILE);
        setUser(data.data);
        setIsAuthenticated(true);
      } catch (error) {
        // console.error(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post(APIPATHS.LOGOUT);
    } catch (error) {
      console.error("Logout failed", error);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};