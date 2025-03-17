import { API_ENDPOINTS } from '../api/apiEndpoints';
import { Filters } from '../pages/store/types/type';
import axios, { AxiosError } from "axios";

// ... (other unchanged functions like addMaterial, updateMaterial, deleteMaterial)

export const fetchCourses = async (filters: Filters, page: number, limit: number = 10) => {
  const response = await axios.get(API_ENDPOINTS.COURSES, {
    params: {
      category: filters.category,
      level: filters.level,
      search: filters.search,
      page,
      limit,
    },
  });
  return response.data;
};

export const createCourse = async (courseData: FormData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_ENDPOINTS.CREATECOURSES, courseData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const buyCourse = async (courseId: string, userId: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      API_ENDPOINTS.BUYCOURSE(courseId, userId),
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add auth header
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to buy course.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const getStudentCourses = async (userId: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(API_ENDPOINTS.STUDENT_COURSES(userId), {
      headers: {
        'Authorization': `Bearer ${token}`, // Add auth header
      },
    });
    return response.data.courses;
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw new Error('Failed to fetch student courses. Please try again.');
  }
};

export const getCourseById = async (courseId: string) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GetOneCourse(courseId));
    return response.data.course;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw new Error('Failed to fetch course details. Please try again.');
  }
};