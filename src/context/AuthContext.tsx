"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import bcrypt from "bcryptjs";

type User = {
  id: string;
  fname: string;
  lname: string;
  email: string;
};

type StoredUser = User & {
  passwordHash: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (payload: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_COOKIE_KEY = "app_users";
const CURRENT_USER_COOKIE_KEY = "current_user_email";

const COOKIE_MAX_AGE_DAYS = 7;

const setCookie = (name: string, value: string, days = COOKIE_MAX_AGE_DAYS) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const parseUsersFromCookie = (): StoredUser[] => {
  try {
    const raw = getCookie(USERS_COOKIE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveUsersToCookie = (users: StoredUser[]) => {
  setCookie(USERS_COOKIE_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load current user from cookies on mount
  useEffect(() => {
    const loadUser = () => {
      const currentEmail = getCookie(CURRENT_USER_COOKIE_KEY);
      if (!currentEmail) {
        setLoading(false);
        return;
      }

      const users = parseUsersFromCookie();
      const storedUser = users.find((u) => u.email === currentEmail);
      if (storedUser) {
        const { passwordHash, ...safeUser } = storedUser;
        void passwordHash;
        setUser(safeUser);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const signup = useCallback(
    async (payload: {
      fname: string;
      lname: string;
      email: string;
      password: string;
    }) => {
      setError(null);

      const users = parseUsersFromCookie();
      const existing = users.find(
        (u) => u.email.toLowerCase() === payload.email.toLowerCase()
      );

      if (existing) {
        setError("User already exists");
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        passwordHash: hashedPassword,
      };

      const updatedUsers = [...users, newUser];
      saveUsersToCookie(updatedUsers);
      setCookie(CURRENT_USER_COOKIE_KEY, newUser.email);

      const { passwordHash: _passwordHash, ...safeUser } = newUser;
      void _passwordHash;
      setUser(safeUser);
    },
    []
  );

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      setError(null);

      const users = parseUsersFromCookie();
      const storedUser = users.find(
        (u) => u.email.toLowerCase() === payload.email.toLowerCase()
      );

      if (!storedUser) {
        setError("Invalid email or password");
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(
        payload.password,
        storedUser.passwordHash
      );

      if (!isMatch) {
        setError("Invalid email or password");
        throw new Error("Invalid email or password");
      }

      setCookie(CURRENT_USER_COOKIE_KEY, storedUser.email);
      const { passwordHash, ...safeUser } = storedUser;
      void passwordHash;
      setUser(safeUser);
    },
    []
  );

  const logout = useCallback(() => {
    deleteCookie(CURRENT_USER_COOKIE_KEY);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

