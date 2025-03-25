import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBuyCourse, useGetCouseById, useStudentCourses } from "../../hooks/useCourses";
import Button from "../../components/ui/button/Button";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading, error } = useGetCouseById(courseId || "");
  const {
    buy,
    isLoading,
    iframeUrl,
    resetIframe,
    paymentCompleted,
    markPaymentCompleted,
  } = useBuyCourse();
  const {
    courses: studentCourses,
    loading: studentLoading,
    error: studentError,
    refetch,
  } = useStudentCourses();

  const [showIframe, setShowIframe] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (studentCourses && courseId) {
      const purchased = studentCourses.some((c) => c._id === courseId);
      setIsPurchased(purchased);
    }
  }, [studentCourses, courseId]);

  useEffect(() => {
    if (paymentCompleted) {
      refetch();
    }
  }, [paymentCompleted, refetch]);

  useEffect(() => {
    const handlePaymentSuccess = (event: MessageEvent) => {
      // Make sure the message is from Paymob
      if (event.origin === "https://accept.paymob.com") {
        console.log("📨 Message received from Paymob:");
        console.log(event.data);

        // Check if payment was successful
        if (event.data.success) {
          console.log("✅ Payment successful!");
          markPaymentCompleted();
        } else {
          console.log("❌ Payment failed or was cancelled.");
        }
      } else {
        console.warn("⚠️ Message from unknown origin:", event.origin);
      }
    };

    window.addEventListener("message", handlePaymentSuccess);
    return () => window.removeEventListener("message", handlePaymentSuccess);
  }, [markPaymentCompleted]);

  if (loading || studentLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (studentError) return <p>Student Error: {studentError}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Course Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden md:flex">
        {/* Thumbnail */}
        <div className="md:w-1/2">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover md:h-full"
          />
        </div>

        {/* Course Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {course.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Level:</strong> {course.level}</p>
              <p><strong>Duration:</strong> {course.duration} hours</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <p><strong>Status:</strong> {course.isPublished ? "Published" : "Draft"}</p>
            </div>
          </div>

          {/* Instructor */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Instructor:</p>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-300 dark:bg-gray-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                {course.instructor.name.charAt(0)}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200">{course.instructor.name}</p>
                <p className="text-xs text-gray-500">{course.instructor.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="mt-8">
        {isPurchased ? (
          <p className="text-green-500 font-semibold">✅ You have already purchased this course!</p>
        ) : (
          <Button
            onClick={async () => {
              await buy(courseId || "");
              setShowIframe(true);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
        )}
      </div>

      {/* Iframe */}
      {iframeUrl && showIframe && (
        <div
          className="fixed z-999999 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80"
          onClick={() => {
            setShowIframe(false);
            resetIframe();
            refetch();
          }}
        >
          <div
            className="relative bg-white rounded-lg p-2 shadow-lg w-full max-w-4xl h-[80vh] md:h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => {
                setShowIframe(false);
                resetIframe();
                refetch();
              }}
            >
              ×
            </button>
            <iframe
              src={iframeUrl}
              className="md:h-[90vh] overflow-hidden w-full h-full border-none rounded-md"
            />
          </div>
        </div>
      )}

      {/* Payment Message */}
      {paymentCompleted && (
        <p className="text-green-600 mt-6 text-center font-semibold">
          🎉 Payment successful! You are now enrolled in this course.
        </p>
      )}
    </div>
  );
};

export default CourseDetails;
