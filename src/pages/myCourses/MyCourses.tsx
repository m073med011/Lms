import React from 'react';
import { useStudentCourses } from '../../hooks/useCourses'; // Import the custom hook
import DaynamicCard from '../../components/ui/DynamicCard/DynamicCard';
import { Course } from '../store/types/type';
import { useNavigate } from 'react-router-dom'; 
import PageMeta from "../../components/common/PageMeta";

const Mycourses: React.FC = () => {
    const { courses, loading, error } = useStudentCourses();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleViewCourse = (courseId?: string) => {
        if (courseId) {
            navigate(`/course/${courseId}`); // Navigate to the course details page
        }
    };

    return (
        <div className="store-page p-4">
            <PageMeta
        title="My courses | Academix"
        description="This is React.js Form Elements  Dashboard page for Academix - React.js Tailwind CSS Admin Dashboard Template"
      />
            <h1 className="text-3xl mb-4 text-gray-800 dark:text-gray-100">My Courses</h1>

            {/* Course List */}
            <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-gray-800 dark:text-gray-100">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : courses.length > 0 ? (
                    courses.map((course: Course, index: number) => (
                        <DaynamicCard 
                            key={index}
                            id={course._id} // Pass the course id
                            buttonText="View Course" 
                            price={course.price} 
                            imageUrl={course.thumbnail} 
                            rating={course.rating || 0} // Use course rating if available
                            title={course.title} 
                            description={course.description} 
                            category={course.category}
                            onButtonClick={handleViewCourse} // Pass the handler
                            isButtonDisabled={false} // Enable the button
                        />
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-gray-100">No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default Mycourses;