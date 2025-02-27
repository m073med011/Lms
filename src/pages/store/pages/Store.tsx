import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCourseModal from '../Components/CreateCourseModal'; // Assuming you have a CreateCourseModal component
import { Course, Filters } from '../types/type'; // Import your types
import DaynamicCard from '../../../components/ui/DynamicCard/DynamicCard'; // Assuming you have a CourseCard component

const Store: React.FC = () => {
    // State for courses
    const [courses, setCourses] = useState<Course[]>([]);

    // State for filters
    const [filters, setFilters] = useState<Filters>({
        category: '',
        level: '',
        search: '',
    });

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Fetch courses from the API
    const fetchCourses = async () => {
        try {
            const response = await axios.get<{ courses: Course[] }>('http://localhost:5000/api/courses');
            setCourses(response.data.courses); // Set the courses state
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    // Fetch courses when filters change
    useEffect(() => {
        fetchCourses();
    }, [filters]);

    // Handle filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="store-page">
            <h1>Course Store</h1>

            {/* Filters and Search Bar */}
            <div className="filters">
                <input
                    type="text"
                    name="search"
                    placeholder="Search courses..."
                    value={filters.search}
                    onChange={handleFilterChange}
                />
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="mobile-development">Mobile Development</option>
                </select>
                <select name="level" value={filters.level} onChange={handleFilterChange}>
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <button onClick={() => setIsModalOpen(true)}>Create New Course</button>
            </div>

            {/* Course List */}
            <div className="course-list flex gap-3 p-3">
                {courses.length > 0 ? (
                    courses.map((course) => (
                       <DaynamicCard price={course.price} imageUrl={course.thumbnail} rating={3}  />
                    ))
                ) : (
                    <p>No courses found.</p>
                )}
            </div>

            {/* Create Course Modal */}
            {isModalOpen && (
                <CreateCourseModal
                    onClose={() => setIsModalOpen(false)}
                    
                />
            )}
        </div>
    );
};

export default Store;