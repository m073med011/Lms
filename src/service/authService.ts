import axios from "axios";
import { API_ENDPOINTS } from "../api/apiEndpoints";

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data?.message || "Registration failed. Try again.";
    } else {
      throw "Registration failed. Try again.";
    }
  }
};

// Logout function - No API call, just clears local storage
export const logout = async () => {
  localStorage.removeItem("token"); // Clear token from storage
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const response = await axios.get(API_ENDPOINTS.USER_PROFILE, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
