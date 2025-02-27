import React, { useState } from 'react';
import axios from 'axios';
import { Course, CourseLevel } from '../types/type';

interface CreateCourseModalProps {
    onClose: () => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<Omit<Course, '_id' | 'slug' | 'instructor' | 'materials' | 'enrolledStudents' | 'purchases' | 'isPublished'>>({
        title: '',
        description: '',
        category: '',
        level: CourseLevel.Beginner,
        price: 0,
        duration: 0,
        thumbnail: 'https://placehold.co/600x400',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post<Course>('/api/courses', formData);
            onClose(); // Close the modal after successful creation
        } catch (err) {
            console.error('Error creating course:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2>Create New Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="duration" placeholder="Duration (hours)" value={formData.duration} onChange={handleChange} required />
                <button type="submit">Create</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateCourseModal;