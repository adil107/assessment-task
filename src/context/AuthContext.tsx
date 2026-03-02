"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const USERS_LOCALSTORAGE_KEY = "app_users";
const LOGIN_USER_LOCALSTORAGE_KEY = "login_user";

const parseUsersStorage = () => {
  try {
    const raw = localStorage.getItem(USERS_LOCALSTORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const parseUser = () => {
  try {
    const raw = localStorage.getItem(LOGIN_USER_LOCALSTORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return [];
  }
};

const saveUsersToCookie = (users: StoredUser[]) => {
  // setCookie(USERS_LOCALSTORAGE_KEY, JSON.stringify(users))/;
  localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users))
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // // Load current user from cookies on mount
  useEffect(() => {
    const loadUser = () => {
      const user = parseUser()
      setUser(user??null)
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

      const users = parseUsersStorage();
      const existing = users.find(
        (u) => u.email.toLowerCase() === payload.email.toLowerCase(),
      );
      if (existing) {
        const message = "User already exists";
        setError(message);
        toast.error(message);
        return;
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser: StoredUser = {
        id: uuidv4(),
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        passwordHash: hashedPassword,
      };

      const updatedUsers = [...users, newUser];
      saveUsersToCookie(updatedUsers);

      const { passwordHash: _passwordHash, ...safeUser } = newUser;
      void _passwordHash;
      setUser(safeUser);
    },
    [],
  );

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      setError(null);

      const users = parseUsersStorage();
      const storedUser = users.find(
        (u) => u.email.toLowerCase() === payload.email.toLowerCase(),
      );

      if (!storedUser) {
        const message = "Invalid email or password";
        setError(message);
        toast.error(message);
        return;
      }

      const isMatch = await bcrypt.compare(
        payload.password,
        storedUser.passwordHash,
      );

      if (!isMatch) {
        const message = "Invalid email or password";
        setError(message);
        toast.error(message);
        return;
      }

      const { passwordHash, ...safeUser } = storedUser;
      void passwordHash;
      setUser(safeUser);
    },
    [],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/remove-cookie", {
      method: "POST",
    });

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

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
