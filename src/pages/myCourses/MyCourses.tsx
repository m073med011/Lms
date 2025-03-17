import React, { useState } from "react";
import { useStudentCourses } from "../../hooks/useCourses";
import DynamicCard from "../../components/ui/DynamicCard/DynamicCard"; // Fixed typo
import { Course, CourseMaterial } from "../store/types/type";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";

const MyCourses: React.FC = () => {
    const { courses, loading, error } = useStudentCourses();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [materialForm, setMaterialForm] = useState<{ courseId: string; title: string; type: string; file?: File }>({
    //     courseId: "",
    //     title: "",
    //     type: "pdf", // Aligned with MaterialType
    // });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isInstructor = user?.role === "instructor";

    const handleViewCourse = (courseId?: string) => {
        if (courseId) navigate(`/course/${courseId}`);
    };

    // const handleAddMaterial = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!materialForm.file || !materialForm.courseId) {
    //         alert("Please select a course and upload a file.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("title", materialForm.title);
    //     formData.append("type", materialForm.type);
    //     formData.append("content", materialForm.file);

    //     try {
    //         await addMaterial(materialForm.courseId, formData);
    //         alert("Material added successfully!");
    //         setMaterialForm({ courseId: "", title: "", type: "pdf" });
    //         setIsModalOpen(false);
    //         window.location.reload();
    //     } catch {
    //         alert("Failed to add material.");
    //     }
    // };

    // const handleDeleteMaterial = async (courseId: string, materialId: string) => {
    //     if (window.confirm("Are you sure you want to delete this material?")) {
    //         try {
    //             await deleteMaterial(courseId, materialId);
    //             alert("Material deleted successfully!");
    //             window.location.reload();
    //         } catch {
    //             alert("Failed to delete material.");
    //         }
    //     }
    // };

    return (
        <div className="store-page p-4">
            <PageMeta title="My Courses | Academix" description="Manage your courses and materials." />
            <h1 className="text-3xl mb-4 text-gray-800 dark:text-gray-100">My Courses</h1>

            {isInstructor && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add New Material
                </button>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-100">Add New Material</h2>
                        {/* <form onSubmit={handleAddMaterial}>
                            <select
                                value={materialForm.courseId}
                                onChange={(e) => setMaterialForm({ ...materialForm, courseId: e.target.value })}
                                className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Material Title"
                                value={materialForm.title}
                                onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                                className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                            />
                            <select
                                value={materialForm.type}
                                onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })}
                                className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                            >
                                <option value="pdf">PDF</option>
                                <option value="video">Video</option>
                                <option value="quiz">Quiz</option>
                            </select>
                            <input
                                type="file"
                                onChange={(e) => setMaterialForm({ ...materialForm, file: e.target.files?.[0] })}
                                className="mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={addLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    {addLoading ? "Adding..." : "Add Material"}
                                </button>
                            </div>
                            {addError && <p className="text-red-500 mt-2">{addError}</p>}
                        </form> */}
                    </div>
                </div>
            )}

            <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-gray-800 dark:text-gray-100">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : courses.length > 0 ? (
                    courses.map((course: Course, index: number) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md dark:bg-gray-800">
                            <DynamicCard
                                id={course._id}
                                buttonText="View Course"
                                price={course.price}
                                imageUrl={course.thumbnail}
                                rating={course.rating || 0}
                                title={course.title}
                                description={course.description}
                                category={course.category}
                                onButtonClick={() => handleViewCourse(course._id)}
                                isButtonDisabled={false}
                            />

                            {course.materials && course.materials.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Course Materials
                                    </h3>
                                    <ul className="mt-2 space-y-2">
                                        {course.materials.map((material: CourseMaterial, idx: number) => (
                                            <li
                                                key={idx}
                                                className="p-2 border rounded-md dark:border-gray-600 flex justify-between items-center"
                                            >
                                                <div>
                                                    {material.type === "video" ? (
                                                        <div>
                                                            <p className="text-gray-800 dark:text-gray-100">{material.title}</p>
                                                            <video controls className="w-full rounded-md mt-2">
                                                                <source src={material.url} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>
                                                    ) : material.type === "pdf" ? (
                                                        <div>
                                                            <p className="text-gray-800 dark:text-gray-100">{material.title}</p>
                                                            <a
                                                                href={material.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                                            >
                                                                View Document
                                                            </a>
                                                        </div>
                                                    ) : material.type === "quiz" ? (
                                                        <button
                                                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                                                            onClick={() => navigate(`/quiz/${course._id}/${idx}`)}
                                                        >
                                                            Take Quiz
                                                        </button>
                                                    ) : null}
                                                </div>
                                                {/* {isInstructor && (
                                                    <button
                                                        onClick={() => handleDeleteMaterial(course._id, material._id)}
                                                        disabled={deleteLoading}
                                                        className="px-2 py-1 bg-red-600 text-white rounded-md disabled:bg-gray-400 hover:bg-red-700"
                                                    >
                                                        {deleteLoading ? "Deleting..." : "Delete"}
                                                    </button>
                                                )} */}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>} */}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-gray-100">No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default MyCourses;