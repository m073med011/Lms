import React, { useState } from 'react';
import { useCourses, useCreateCourse } from '../../../hooks/useCourses';
import CreateCourseModal from '../Components/CreateCourseModal';
import SidebarFilters from '../Components/SidebarFilters';
import DynamicCard from '../../../components/ui/DynamicCard/DynamicCard'; // Fixed typo
import { Filters, CourseLevel } from '../types/type';
import Button from '../../../components/ui/button/Button';
import PageMeta from "../../../components/common/PageMeta";

const Store: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({
        category: '',
        level: CourseLevel.None, // Now valid as CourseLevel.None
        search: '',
    });
    const [page, setPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const { courses, totalPages, loading, error } = useCourses(filters, page);
    const { create, isLoading: isCreating, error: createError } = useCreateCourse();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        setPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: e.target.value });
        setPage(1);
    };

    return (
        <div className="store-page p-4">
            <PageMeta
                title="Store | Academix"
                description="This is React.js Form Elements Dashboard page for Academix - React.js Tailwind CSS Admin Dashboard Template"
            />
            <h1 className="text-3xl mb-4 text-gray-800 dark:text-gray-100">Course Store</h1>

            <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <input 
                    type="text" 
                    placeholder="Search Courses" 
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border rounded-lg w-full sm:max-w-80 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-5">
                    <Button onClick={() => setIsSidebarOpen(true)} className="w-full sm:w-auto">
                        Filters
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
                        Create Course
                    </Button>
                </div>
            </div>

            <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-gray-800 dark:text-gray-100">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                        <DynamicCard // Fixed typo
                            key={index}
                            price={course.price} 
                            imageUrl={course.thumbnail} 
                            rating={course.rating} // Fixed hardcoded value
                            title={course.title} 
                            description={course.description} 
                            category={course.category}
                            link={`/course/${course._id}`}
                        />
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-gray-100">No courses found.</p>
                )}
            </div>

            <div className="pagination mt-4 flex justify-center space-x-4">
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-800 dark:text-gray-100">{page} / {totalPages}</span>
                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>

            {isSidebarOpen && (
                <SidebarFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}

            {isModalOpen && (
                <CreateCourseModal 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={create} 
                    isLoading={isCreating} 
                    error={createError}
                />
            )}
        </div>
    );
};

export default Store;