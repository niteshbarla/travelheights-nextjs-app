"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch About content from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };
    fetchAboutData();
  }, []);

  if (!aboutData)
    return <p className="text-center text-gray-700">Loading About Info...</p>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Expandable About Section */}
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>

        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "4.5rem" }} // Adjusted for approx 3 lines
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          <p className="text-gray-700">{aboutData?.content}</p>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-blue-600 hover:underline focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Circular Image Section */}
      <div className="mt-12">
        <div className="w-56 h-56 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
          <img
            src={aboutData?.imageUrl || "/images/about-img1.jpg"} // Fetch image from DB
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
