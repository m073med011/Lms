import { API_ENDPOINTS } from '../api/apiEndpoints';
import { Filters } from '../pages/store/types/type';
import axios, { AxiosError } from "axios";


// Existing functions remain unchanged...

export const addMaterial = async (courseId: string, materialData: FormData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${API_ENDPOINTS.COURSES}/${courseId}/materials`,
            materialData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            throw new Error(error.response.data.message || 'Failed to add material.');
        }
        throw new Error('Network error. Please try again.');
    }
};

export const updateMaterial = async (courseId: string, materialId: string, materialData: FormData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            `${API_ENDPOINTS.COURSES}/${courseId}/materials/${materialId}`,
            materialData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            throw new Error(error.response.data.message || 'Failed to update material.');
        }
        throw new Error('Network error. Please try again.');
    }
};

export const deleteMaterial = async (courseId: string, materialId: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(
            `${API_ENDPOINTS.COURSES}/${courseId}/materials/${materialId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            throw new Error(error.response.data.message || 'Failed to delete material.');
        }
        throw new Error('Network error. Please try again.');
    }
};


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

export const buyCourse = async (courseId: string, userId: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.BUYCOURSE(courseId, userId));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data) {
            throw new Error(error.response.data.message || "Failed to buy course.");
        }
        throw new Error("Network error. Please try again.");
    }
};



export const getStudentCourses = async (userId:string) => {
    try {
        const response = await axios.get(API_ENDPOINTS.STUDENT_COURSES(userId), {
        });
        return response.data.courses; // Return the courses array
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
}