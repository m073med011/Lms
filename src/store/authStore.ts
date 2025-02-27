import { create } from "zustand";

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"), // Persist user data
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  loginUser: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Save user data
    set({ user, token, isAuthenticated: true });
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
