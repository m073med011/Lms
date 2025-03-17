import React from 'react';

interface DynamicCardProps {
    id?: string;
    imageUrl?: string;
    title?: string;
    description?: string;
    rating?: number;
    price?: number;
    className?: string;
    level?: string;
    category?: string;
    link?: string;
    onClick?: () => void; // Added for interactivity
}

const DynamicCard: React.FC<DynamicCardProps> = ({
    imageUrl = 'https://placehold.co/400',
    title = 'Product Title',
    description = 'Product Description',
    rating = 0,
    price = 0,
    className = '',
    level = 'Beginner',
    category = 'Uncategorized',
    link = '#',
    onClick,
}) => {
    const renderRatingStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5; // More precise half-star threshold

        for (let i = 0; i < 5; i++) {
            const StarIcon = (
                <svg
                    className={`w-4 h-4 ${
                        i < fullStars 
                            ? 'text-yellow-300' 
                            : hasHalfStar && i === fullStars 
                            ? 'text-yellow-300' 
                            : 'text-gray-200 dark:text-gray-600'
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );

            stars.push(
                <span key={i}>
                    {i === fullStars && hasHalfStar ? (
                        <div className="relative w-4 h-4">
                            {StarIcon}
                            <div className="absolute top-0 left-0 w-2 h-4 overflow-hidden">
                                <svg
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        StarIcon
                    )}
                </span>
            );
        }
        return stars;
    };

    const CardContent = (
        <div className={`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}>
            <div className="overflow-hidden">
                <img
                    className="p-2 rounded-2xl max-h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                    src={imageUrl}
                    alt={title}
                    loading="lazy" // Added for performance
                />
            </div>

            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                    {title}
                </h5>

                {description && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                        {description}
                    </p>
                )}

                <div className="flex gap-3 mt-2">
                    {level && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Level:</strong> {level}
                        </p>
                    )}
                    {category && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Category:</strong> {category}
                        </p>
                    )}
                </div>

                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1">
                        {renderRatingStars()}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {rating.toFixed(1)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${price.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );

    return link === '#' ? (
        <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
            {CardContent}
        </div>
    ) : (
        <a href={link} className="block">
            {CardContent}
        </a>
    );
};

export default DynamicCard;