// Define an enum for course levels
export enum CourseLevel {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
}

// Define an enum for material types
export enum MaterialType {
    Video = 'video',
    PDF = 'pdf',
    Quiz = 'quiz',
}

// Define the User interface
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin'; // Define user roles
    avatar?: string; // Optional avatar URL
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Course interface
export interface Course {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string; // Optional thumbnail URL
    description: string;
    instructor?: User; // Optional instructor (populated user object)
    enrolledStudents: User[]; // Array of User objects
    category: string;
    duration: number; // Duration in hours
    level: CourseLevel; // Use the enum here
    price: number;
    isPublished: boolean;
    materials?: Material[]; // Optional array of materials
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Material interface
export interface Material {
    _id: string;
    title: string;
    url: string;
    type: MaterialType; // Use the enum here
    duration?: number; // Optional duration in minutes (for videos)
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Purchase interface
export interface Purchase {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    purchaseDate: string;
    amount: number;
    paymentStatus: 'pending' | 'completed' | 'failed'; // Payment status
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Filters interface for course filtering
export interface Filters {
    category: string;
    level: string;
    search: string;
}

// Define the Pagination interface for API responses
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

// Define the API Response interface for courses
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    pagination?: Pagination; // Optional pagination data
}

// Define the Enrollment interface
export interface Enrollment {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    enrolledAt: string;
    progress?: number; // Optional progress percentage
    completed?: boolean; // Optional completion status
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Review interface
export interface Review {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    rating: number; // Rating out of 5
    comment?: string; // Optional comment
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}