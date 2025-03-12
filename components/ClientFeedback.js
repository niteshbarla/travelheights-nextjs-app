import React, { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

const ClientFeedbackSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clientFeedbacks, setClientFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/client-feedbacks"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setClientFeedbacks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (clientFeedbacks.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % clientFeedbacks.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [clientFeedbacks]);

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`inline-block ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
        size={20}
        fill={index < rating ? "#FFC107" : "none"}
      />
    ));
  };

  if (isLoading) {
    return <div className="text-center py-16">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  if (clientFeedbacks.length === 0) {
    return <div className="text-center py-16">No feedbacks available.</div>;
  }

  const currentFeedback = clientFeedbacks[currentIndex];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Client Image */}
          <div className="flex justify-center py-6">
            <img
              src={currentFeedback.image}
              alt={currentFeedback.name}
              className="w-56 h-56 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Feedback Content */}
          <div className="text-center px-8 pb-8">
            <Quote className="mx-auto text-blue-500 mb-4" size={40} />

            <p className="text-gray-700 italic mb-4">
              "{currentFeedback.feedback}"
            </p>

            <div className="mb-2">{renderStars(currentFeedback.rating)}</div>

            <div>
              <h3 className="font-bold text-gray-800">
                {currentFeedback.name}
              </h3>
              <p className="text-gray-600">{currentFeedback.location}</p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center pb-4 space-x-2">
            {clientFeedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedbackSlider;
