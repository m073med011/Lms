// types.ts

// Define an enum for course levels
export enum CourseLevel {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
}

// Define the User interface
export interface User {
    _id: string;
    name: string;
    email: string;
    // Add other user fields as needed
}

// Define the Course interface
export interface Course {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string; // Optional thumbnail
    description: string;
    instructor?: User; // Optional instructor (populated user object)
    enrolledStudents: User[]; // Array of User objects
    category: string;
    duration: number;
    level: CourseLevel; // Use the enum here
    price: number;
    isPublished: boolean;
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Material interface
export interface Material {
    _id: string;
    title: string;
    url: string;
    type: 'video' | 'pdf' | 'quiz'; // Example types
}

// Define the Purchase interface
export interface Purchase {
    _id: string;
    student: string; // User ID
    purchaseDate: string;
    amount: number;
}

// Define the Filters interface
export interface Filters {
    category: string;
    level: string;
    search: string;
}