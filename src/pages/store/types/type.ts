// Define an enum for course levels
export enum CourseLevel {
    ''='',
    Beginner = "beginner",
    Intermediate = "intermediate",
    Advanced = "advanced",
}

// Define an enum for material types
export enum MaterialType {
    Video = "video",
    PDF = "pdf",
    Quiz = "quiz",
}

// Define the User interface
export interface User {
    _id: string; // Simplified ObjectId
    name: string;
    email: string;
    role: "student" | "instructor" | "admin"; // Define user roles
    avatar?: string; // Optional avatar URL
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the CourseMaterial interface
export interface CourseMaterial {
    _id: string; // MongoDB ObjectId
    title: string;
    type: MaterialType; // Use the enum here
    url: string; // File URL or Video URL
    duration?: number; // Optional duration in minutes (for videos)
    createdAt?: string;
    updatedAt?: string;
}

// Define the Course interface
export interface Course {
    _id: string; // Use string instead of `{ $oid: string }`
    title: string;
    rating: number;
    thumbnail: string;
    description: string;
    instructor: User; // Now references the User type
    enrolledStudents: string[]; // List of student IDs
    category: string;
    duration: number;
    level: CourseLevel; // Use enum for type safety
    price: number;
    isPublished: boolean;
    materials: CourseMaterial[]; // Corrected from `unknown[]`
    purchases: Purchase[];
    createdAt: string;
    updatedAt: string;
    slug: string;
    __v?: number; // Optional Mongoose version key
}

// Define the Purchase interface
export interface Purchase {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    purchaseDate: string;
    amount: number;
    paymentStatus: "pending" | "completed" | "failed"; // Payment status
    createdAt?: string;
    updatedAt?: string;
}

// Define the Filters interface for course filtering
export interface Filters {
    category: string;
    level: CourseLevel; // Use enum for type safety
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
    pagination?: Pagination;
}

// Define the Enrollment interface
export interface Enrollment {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    enrolledAt: string;
    progress?: number; // Optional progress percentage
    completed?: boolean; // Optional completion status
    createdAt?: string;
    updatedAt?: string;
}

// Define the Review interface
export interface Review {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    rating: number; // Rating out of 5
    comment?: string; // Optional comment
    createdAt?: string;
    updatedAt?: string;
}
