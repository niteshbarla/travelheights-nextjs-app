import { useState } from "react";
import { motion } from "framer-motion";

const TourPackageExpandableContent = ({ content, previewLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: isExpanded ? "auto" : `${previewLines * 1.5}rem` }} // Adjusts height based on lines
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
      >
        <p className="text-gray-700">{content}</p>
      </motion.div>

      {/* Show More / Less Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-600 hover:underline focus:outline-none"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default TourPackageExpandableContent;
