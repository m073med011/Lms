import React from 'react';
import { Course } from '../types/type'; // Import your types

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="course-card">
            <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Duration:</strong> {course.duration} hours</p>
        </div>
    );
};

export default CourseCard;