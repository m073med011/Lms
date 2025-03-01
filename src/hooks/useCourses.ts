import { useEffect, useState } from 'react';
import { fetchCourses, createCourse,buyCourse,getStudentCourses,getCourseById } from '../service/coursesService';
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
            window.location.reload();
        }
    };

    return { create, isLoading, error };
};


export const useBuyCourse = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    const buy = async (courseId: string) => {
        // Check if the user is authenticated
        if (!userId) {
            setError("User not authenticated. Please log in.");
            alert("User not authenticated. Please log in.");
            return;
        }

        setIsLoading(true);
        setError(null); // Reset error before making a new request

        try {
            // Call the buyCourse function
            await buyCourse(courseId, userId);
            alert("Course purchased successfully!"); // Notify the user of success
        } catch (err) {
            // Handle errors
            const errorMessage = err instanceof Error ? err.message : "Failed to buy course.";
            setError(errorMessage);
            alert(errorMessage); // Notify the user of the error
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return { buy, isLoading, error };
};

export const useGetCouseById = (courseId: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseById(courseId);
                setCourse(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    return { course, loading, error };
}



export const useStudentCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getStudentCourses(userId);
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch courses.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, loading, error };
};