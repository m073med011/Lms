import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBuyCourse, useGetCouseById, useStudentCourses } from "../../hooks/useCourses";
import Button from "../../components/ui/button/Button";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading, error } = useGetCouseById(courseId || "");
  const { buy, isLoading, iframeUrl, resetIframe, paymentCompleted, markPaymentCompleted } = useBuyCourse();
  const { courses: studentCourses, loading: studentLoading, error: studentError, refetch } = useStudentCourses();
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
      if (event.origin === "https://accept.paymob.com" && event.data.success) {
        markPaymentCompleted();
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
    <div className="p-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>

      {isPurchased ? (
        <p className="text-green-500">You have already purchased this course!</p>
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

      {iframeUrl && showIframe && (
        <div
          className="fixed z-99999 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-80"
          onClick={() => {
            setShowIframe(false);
            resetIframe();
            refetch();
          }}
        >
          <div
            className="relative bg-white rounded-lg p-1 shadow-lg w-full max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => {
                setShowIframe(false);
                resetIframe();
                refetch();
              }}
            >
              X
            </button>
            <iframe
              src={iframeUrl}
              className="w-full h-full border-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            />
          </div>
        </div>
      )}

      {paymentCompleted && (
        <p className="text-green-500 mt-4">Payment successful! You are now enrolled in the course.</p>
      )}
    </div>
  );
};

export default CourseDetails;