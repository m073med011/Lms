import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Course, User } from '../../pages/store/types/type';
import Button from '../ui/button/Button';

const Payment: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const user: User = {
        _id: userData?.id || '67a8f61bad19ec497b51874a',
        name: userData?.name || 'CEO',
        email: userData?.email || 'admin@academix.com',
        role: userData?.role || 'student',
        createdAt: userData?.createdAt || '2025-02-09T18:38:19.911Z',
    };

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>(
                    `${process.env.REACT_APP_BACKEND_URL}/api/courses`
                );
                setCourses(response.data);
            } catch (err) {
                const error = err as AxiosError;
                console.error('Error fetching courses:', error);
                setError('Failed to load courses');
            }
        };
        fetchCourses();
    }, []);

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCourseId = e.target.value;
        setCourseId(selectedCourseId);
        const course = courses.find(c => c._id === selectedCourseId);
        setAmount(course ? course.price : 0);
        setError(null);
        setSuccess(false);
    };

    const handlePayment = async () => {
        if (!user._id) {
            setError('Please log in to purchase a course.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // Step 1: Initiate Paymob payment
            const paymentResponse = await axios.post<{ paymentKey: string }>(
                `${process.env.REACT_APP_BACKEND_URL}/api/payment/initiate-payment`,
                {
                    amount,
                    user,
                    courseId,
                }
            );
            const { paymentKey } = paymentResponse.data;

            // Step 2: Redirect to Paymob iframe
            const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${process.env.REACT_APP_PAYMOB_INTEGRATION_ID}?payment_token=${paymentKey}`;
            console.log('Redirecting to:', iframeURL);
            window.location.href = iframeURL;
        } catch (err) {
            const error = err as AxiosError;
            console.error('Payment error:', error.response?.data || error.message);
            setError('Failed to initiate payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Handle success after redirect (requires return URL)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const successParam = urlParams.get('success');
        if (successParam === 'true' && courseId) {
            const confirmPurchase = async () => {
                try {
                    await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}/buy/${user._id}`
                    );
                    setSuccess(true);
                    setError(null);
                } catch (err) {
                    const error = err as AxiosError;
                    console.error('Error confirming purchase:', error);
                    setError('Failed to confirm purchase. Please contact support.');
                }
            };
            confirmPurchase();
        }
    }, [courseId, user._id]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Buy a Course</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Course purchased successfully!</p>}
            <div className="flex flex-col gap-4">
                <select
                    value={courseId}
                    onChange={handleCourseChange}
                    required
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                    <option value="">Select a Course</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>
                            {course.title} - ${course.price.toFixed(2)}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Enter amount"
                    disabled
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <Button
                    onClick={handlePayment}
                    disabled={loading || !courseId || !amount}
                    className="w-full sm:w-auto"
                >
                    {loading ? 'Processing...' : 'Buy Now'}
                </Button>
            </div>
        </div>
    );
};

export default Payment;