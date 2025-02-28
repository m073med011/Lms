import React, { useEffect, useRef } from 'react';
import { Filters } from '../types/type'; // Adjust the import path as needed

const SidebarFilters: React.FC<{
    filters: Filters;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClose: () => void;
}> = ({ filters, onChange, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={sidebarRef}
            className="fixed top-0 z-99999 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4 py-8  transition-transform duration-300 ease-in-out transform translate-x-0"
        >
            <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-100">Filters</h2>
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-xl text-gray-800 dark:text-gray-100"
                aria-label="Close filters"
            >
                ×
            </button>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-800 dark:text-gray-100">
                    Category:
                </label>
                <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                    <option key="all" value="">
                        All
                    </option>
                    <option key="programming" value="programming">
                        Programming
                    </option>
                    <option key="design" value="design">
                        Design
                    </option>
                    <option key="business" value="business">
                        Business
                    </option>
                    <option key="marketing" value="marketing">
                        Marketing
                    </option>
                    <option key="data-science" value="Data Science">
                        Data Science
                    </option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="level" className="block text-gray-800 dark:text-gray-100">
                    Level:
                </label>
                <select
                    id="level"
                    name="level"
                    value={filters.level}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                    <option key="all-levels" value="">
                        All Levels
                    </option>
                    <option key="beginner" value="beginner">
                        Beginner
                    </option>
                    <option key="intermediate" value="intermediate">
                        Intermediate
                    </option>
                    <option key="advanced" value="advanced">
                        Advanced
                    </option>
                </select>
            </div>
        </div>
    );
};

export default SidebarFilters;