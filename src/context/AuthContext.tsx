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
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      document.cookie = `session_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get(APIPATHS.PROFILE)
        .then((res) => {
          setUser(res.data.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    document.cookie = `session_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = `session_token=; path=/; max-age=0`;
    delete api.defaults.headers.common["Authorization"];
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