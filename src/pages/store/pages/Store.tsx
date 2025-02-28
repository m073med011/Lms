import React, { useState } from 'react';
import { useCourses, useCreateCourse } from '../../../hooks/useCourses';
import CreateCourseModal from '../Components/CreateCourseModal';
import SidebarFilters from '../Components/SidebarFilters';
import DaynamicCard from '../../../components/ui/DynamicCard/DynamicCard';
import { Filters } from '../types/type';
import Button from '../../../components/ui/button/Button';

const Store: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({
        category: '',
        level: '',
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
            <h1 className="text-3xl mb-4 text-gray-800 dark:text-gray-100">Course Store</h1>

            {/* Search Bar and Buttons */}
            <div className="mb-4 flex justify-between gap-4">
                <input 
                    type="text" 
                    placeholder="Search Courses" 
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="px-4 max-w-80 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <div className="flex gap-5">
                <Button children={"Filters"} onClick={() => setIsSidebarOpen(true)} />
                <Button children={"Create Course"} onClick={() => setIsModalOpen(true)} />
                </div>
            </div>

            {/* Course List */}
            <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-gray-800 dark:text-gray-100">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                        <DaynamicCard 
                            key={index}
                            buttonText="Buy" 
                            price={course.price} 
                            imageUrl={course.thumbnail} 
                            rating={3} 
                            title={course.title} 
                            description={course.description} 
                            category={course.category}
                        />
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-gray-100">No courses found.</p>
                )}
            </div>

            {/* Pagination Controls */}
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

            {/* Sidebar Popup for Filters */}
            {isSidebarOpen && (
                <SidebarFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Create Course Modal */}
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