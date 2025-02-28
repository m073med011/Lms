import { useEffect, useState } from 'react';
import { fetchCourses, fetchUserCourses, createCourse } from '../service/coursesService';
import { Course, Filters } from '../pages/store/types/type';

export const useCourses = (filters: Filters, page: number) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCourses = async () => {
            setLoading(true);
            try {
                const data = await fetchCourses(filters, page);
                setCourses(data.courses);
                setTotalPages(data.pages);
            } catch {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        getCourses();
    }, [filters, page]);

    return { courses, totalPages, loading, error };
};

export const useUserCourses = (userId: string) => {
    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUserCourses = async () => {
            setLoading(true);
            try {
                const data = await fetchUserCourses(userId);
                setUserCourses(data);
            } catch {
                setError('Failed to fetch user courses');
            } finally {
                setLoading(false);
            }
        };

        getUserCourses();
    }, [userId]);

    return { userCourses, loading, error };
};

export const useCreateCourse = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (courseData: FormData) => {
        setIsLoading(true);
        try {
            await createCourse(courseData);
        } catch {
            setError('Failed to create course');
        } finally {
            setIsLoading(false);
        }
    };

    return { create, isLoading, error };
};