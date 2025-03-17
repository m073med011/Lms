import { useEffect, useState } from 'react';
import { fetchCourses, createCourse,getStudentCourses,getCourseById  } from '../service/coursesService';
import { Course, Filters } from '../pages/store/types/type';
import axios from "axios";

// export const useAddMaterial = () => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const add = async (courseId: string, materialData: FormData) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await addMaterial(courseId, materialData);
//             return response; // Return response for further use if needed
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Failed to add material.';
//             setError(errorMessage);
//             throw err; // Re-throw to handle in component
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { add, isLoading, error };
// };

// export const useUpdateMaterial = () => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const update = async (courseId: string, materialId: string, materialData: FormData) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await updateMaterial(courseId, materialId, materialData);
//             return response;
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Failed to update material.';
//             setError(errorMessage);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { update, isLoading, error };
// };

// export const useDeleteMaterial = () => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const remove = async (courseId: string, materialId: string) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             // const response = await deleteMaterial(courseId, materialId);
//             return response;
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Failed to delete material.';
//             setError(errorMessage);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { remove, isLoading, error };
// };

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

export const useStudentCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;
  
    const fetchCourses = async () => {
      if (!userId) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }
  
      setLoading(true);
      try {
        const data = await getStudentCourses(userId);
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCourses();
    }, [userId]);
  
    return { courses, loading, error, refetch: fetchCourses };
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

export const useBuyCourse = () => {
    const API_URL = "http://localhost:5000/api/courses";
    const STATUS_URL = "http://localhost:5000/api/payment/status";
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [iframeUrl, setIframeUrl] = useState<string | null>(null);
    const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
    const [purchaseId, setPurchaseId] = useState<string | null>(null);
  
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;
    const token = localStorage.getItem("token");
  
    const buy = async (courseId: string) => {
      if (!userId || !token) {
        setError("User not authenticated. Please log in.");
        alert("User not authenticated. Please log in.");
        return;
      }
  
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(
          `${API_URL}/${courseId}/buy/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.success && response.data.paymentURL) {
          setIframeUrl(response.data.paymentURL);
          setPurchaseId(response.data.purchaseId); // Store purchaseId
          setPaymentCompleted(false);
        } else {
          throw new Error(response.data.message || "Failed to get payment URL.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(errorMessage);
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Poll for payment status
    useEffect(() => {
      if (!iframeUrl || !purchaseId || paymentCompleted) return;
  
      const pollInterval = setInterval(async () => {
        try {
          const response = await axios.get(`${STATUS_URL}/${purchaseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.status === "Paid") {
            markPaymentCompleted();
            clearInterval(pollInterval);
          } else if (response.data.status === "Failed") {
            setError("Payment failed. Please try again.");
            setIframeUrl(null);
            clearInterval(pollInterval);
          }
        } catch (err) {
          console.error("Error polling payment status:", err);
        }
      }, 3000); // Poll every 3 seconds
  
      return () => clearInterval(pollInterval);
    }, [iframeUrl, purchaseId, paymentCompleted, token]);
  
    const resetIframe = () => {
      setIframeUrl(null);
      setPurchaseId(null);
      setPaymentCompleted(false);
    };
  
    const markPaymentCompleted = () => {
      setPaymentCompleted(true);
      setIframeUrl(null);
      setPurchaseId(null);
    };
  
    return { buy, isLoading, error, iframeUrl, resetIframe, paymentCompleted, markPaymentCompleted };
  };