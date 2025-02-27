import React, { useState } from 'react';

// Define the props interface with all optional fields
interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    onSubmit?: (data: { name: string; price: number; category: string; description: string }) => void;
    className?: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
    isOpen,
    onClose,
    title = 'Create New Product',
    onSubmit,
    className = '',
}) => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ${className}`}
            onClick={onClose} // Close modal when clicking outside
        >
            <div
                className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-full max-w-md"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Modal Body */}
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        {/* Name Field */}
                        <div className="col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required
                            />
                        </div>

                        {/* Price Field */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                                required
                            />
                        </div>

                        {/* Category Field */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>

                        {/* Description Field */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Product Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="me-1 -ms-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Add new product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DynamicModal;