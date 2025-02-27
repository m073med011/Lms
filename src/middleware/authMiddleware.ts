import { useAuthStore } from "../store/authStore";

import { NavigateFunction } from 'react-router-dom';

export const authMiddleware = (navigate: NavigateFunction) => {
  const { isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    navigate("/login");
  }
};
