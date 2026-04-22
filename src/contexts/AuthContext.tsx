import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "provider";
  phone: string;
  location: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: "user" | "provider";
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    isAuthenticated: false,
    isLoading: true,
  });

  // On mount, validate existing token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }

    fetch(`${BASE_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((user: AuthUser) => {
        setState({
          user,
          accessToken: token,
          refreshToken: localStorage.getItem("refresh_token"),
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch(() => {
        // Token expired or invalid — clear everything
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setState({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      });
  }, []);

  const saveTokens = useCallback((access: string, refresh: string, user: AuthUser) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setState({
      user,
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // DRF returns validation errors in various shapes
      const msg =
        err.non_field_errors?.[0] ||
        err.detail ||
        (Array.isArray(err) ? err[0] : null) ||
        "Invalid email or password";
      throw new Error(msg);
    }

    const data = await res.json();
    saveTokens(data.access, data.refresh, data.user);
  }, [saveTokens]);

  const register = useCallback(async (payload: RegisterData) => {
    const res = await fetch(`${BASE_URL}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // Collect all field errors into one message
      const messages: string[] = [];
      for (const [field, errors] of Object.entries(err)) {
        if (Array.isArray(errors)) {
          messages.push(...errors.map((e: string) => `${field}: ${e}`));
        } else if (typeof errors === "string") {
          messages.push(errors);
        }
      }
      throw new Error(messages.join(". ") || "Registration failed");
    }

    const data = await res.json();
    saveTokens(data.access, data.refresh, data.user);
  }, [saveTokens]);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
