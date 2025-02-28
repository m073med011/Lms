import React from 'react';

// Define the props interface with all optional fields
interface DynamicCardProps {
    imageUrl?: string;
    title?: string;
    description?: string;
    rating?: number;
    price?: number;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
    level?: string; // New level property
    category?: string; // New category property
}

const DynamicCard: React.FC<DynamicCardProps> = ({
    imageUrl = 'https://placehold.co/400', // Default image
    title = 'Product Title',
    description = 'Product Description',
    rating = 0,
    price = 0,
    buttonText = 'Add to Cart',
    onButtonClick,
    className = '',
    level = 'Beginner', // Default level
    category = 'Uncategorized', // Default category
}) => {
    // Generate rating stars
    const renderRatingStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            } else if (hasHalfStar && i === fullStars) {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className={`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}>
            {/* Image */}
            <div>
                <img
                    className="p-2 rounded-2xl max-h-64"
                    src={imageUrl || "default-image-url.jpg"}
                    alt={title || "Default Image"}
                />
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
                {/* Title */}
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                </a>

                {/* Description */}
                {description && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
<div className="flex gap-3">
                

                {/* Level */}
                {level && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <strong>Level:</strong> {level}
                    </p>
                )}

                {/* Category */}
                {category && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <strong>Category:</strong> {category}
                    </p>
                )}
</div>
                {/* Rating */}
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {renderRatingStars()}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${price.toFixed(2)}
                    </span>
                    <button
                        onClick={onButtonClick}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicCard;