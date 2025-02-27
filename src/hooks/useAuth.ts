import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginUser = useAuthStore((state) => state.loginUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);
//   const getUserProfile = useAuthStore((state) => state.getUserProfile);

  return { user, token, isAuthenticated, loginUser, logoutUser };
};
