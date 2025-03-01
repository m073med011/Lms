import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../service/coursesService';
import { Course } from '../../pages/store/types/type';
import PageMeta from "../../components/common/PageMeta";

const CourseDetails: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId) {
                setError('Course ID is missing in the URL.');
                setLoading(false);
                return;
            }

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

    if (loading) return <p className="text-gray-800 dark:text-gray-100">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!course) return <p className="text-gray-800 dark:text-gray-100">No course found.</p>;

    return (
        <div className="p-4">
            <PageMeta
        title="my course| Academix"
        description="This is React.js Form Elements  Dashboard page for Academix - React.js Tailwind CSS Admin Dashboard Template"
      />
            {/* Course Thumbnail */}
            <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg"
            />

            {/* Course Title */}
            <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-100">
                {course.title}
            </h1>

            {/* Course Description */}
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                {course.description}
            </p>

            {/* Course Metadata */}
            <div className="mt-4 flex gap-10">
                <p className="text-gray-700 dark:text-gray-200">
                    <strong>Category:</strong> {course.category}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                    <strong>Level:</strong> {course.level}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                    <strong>Duration:</strong> {course.duration} hours
                </p>
            </div>

            {/* Course Materials */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Course Materials
                </h2>
                <div className="mt-4 space-y-4">
                    {course.materials.map((material, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {material.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Type: {material.type}
                            </p>
                            {material.type === 'video' && (
                                <div className="mt-2">
                                    <video controls className="w-full">
                                        {/* <source src={material.content} type="video/mp4" />
                                        Your browser does not support the video tag. */}
                                    </video>
                                </div>
                            )}
                            {material.type === 'document' && (
                                <div className="mt-2">
                                    <a
                                        // href={material.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        View Document
                                    </a>
                                </div>
                            )}
                            {material.type === 'quiz' && (
                                <div className="mt-2">
                                    {/* <p className="text-gray-600 dark:text-gray-300">
                                        Quiz Content: {material.content}
                                    </p> */}
                                    <a
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        View Quiz
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default CourseDetails;