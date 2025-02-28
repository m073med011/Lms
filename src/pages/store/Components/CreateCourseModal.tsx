import React, { useState } from 'react';
import { Course, CourseLevel } from '../types/type';

interface CreateCourseModalProps {
    onClose: () => void;
    onCreate: (courseData: FormData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ onClose, onCreate, isLoading, error }) => {
    const [formData, setFormData] = useState<Partial<Course>>({
        title: '',
        description: '',
        category: '',
        level: CourseLevel.Beginner,
        price: 0,
        duration: 0,
        isPublished: false,
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: isChecked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!thumbnail) {
            setErrorMessage('Please upload a thumbnail for the course.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        if (!userId) {
            setErrorMessage('User not authenticated. Please log in.');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title as string);
        data.append('description', formData.description as string);
        data.append('category', formData.category as string);
        data.append('level', formData.level as string);
        data.append('price', formData.price?.toString() || '0');
        data.append('duration', formData.duration?.toString() || '0');
        data.append('isPublished', formData.isPublished?.toString() || 'false');
        data.append('instructor', userId);
        data.append('thumbnail', thumbnail);

        await onCreate(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="p-6">
                    <h2 className="text-2xl mb-4 text-gray-800 dark:text-gray-100">Create New Course</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Course Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                            <option value="marketing">Marketing</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration (hours)"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isPublished"
                                checked={formData.isPublished}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <span className="text-gray-800 dark:text-gray-100">Publish Now</span>
                        </label>

                        {(error || errorMessage) && (
                            <p className="text-red-500">{error || errorMessage}</p>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : null}
                                {isLoading ? 'Creating...' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourseModal;