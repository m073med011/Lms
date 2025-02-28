import axios from 'axios';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import { Filters } from '../pages/store/types/type';

export const fetchCourses = async (filters: Filters, page: number, limit: number = 10) => {
    const response = await axios.get(API_ENDPOINTS.COURSES, {
        params: {
            category: filters.category,
            level: filters.level,
            search: filters.search,
            page,
            limit,
        }
    });
    return response.data;
};

export const createCourse = async (courseData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_ENDPOINTS.CREATECOURSES, courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchUserCourses = async (userId: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_ENDPOINTS.COURSES}/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};