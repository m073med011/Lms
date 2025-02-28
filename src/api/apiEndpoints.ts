export const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  USER_PROFILE: `${API_BASE_URL}/auth/me`,
  COURSES: `${API_BASE_URL}/courses`,
  CREATECOURSES: `${API_BASE_URL}/courses/create`,
  GetOneCourse: (id: string | number) => `${API_BASE_URL}/courses/${id}`,
};
