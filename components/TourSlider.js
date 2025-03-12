import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TourPackageSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numVisible, setNumVisible] = useState(1); // State to track number of visible packages

  // Fetch data from the API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tour-packages-slider");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTourPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update number of visible packages based on screen size
  useEffect(() => {
    const updateNumVisible = () => {
      if (window.innerWidth >= 1024) {
        setNumVisible(4);
      } else if (window.innerWidth >= 768) {
        setNumVisible(2);
      } else {
        setNumVisible(1);
      }
    };

    // Initial call to set the correct number of visible packages
    updateNumVisible();

    // Add event listener for window resize
    window.addEventListener("resize", updateNumVisible);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateNumVisible);
  }, []);

  const visiblePackages = useMemo(() => {
    if (!tourPackages?.length) return [];
    const packages = [];
    for (let i = 0; i < numVisible; i++) {
      const currentIndex = (startIndex + i) % tourPackages.length;
      packages.push(tourPackages[currentIndex]);
    }
    return packages;
  }, [startIndex, tourPackages, numVisible]);

  const nextPackages = () => {
    if (!tourPackages?.length) return;
    setStartIndex((prevIndex) => (prevIndex + 1) % tourPackages.length);
  };

  const prevPackages = () => {
    if (!tourPackages?.length) return;
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? tourPackages.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 h-64 flex items-center justify-center">
        <div className="text-gray-600">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 h-64 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!tourPackages?.length) {
    return (
      <div className="max-w-6xl mx-auto p-4 h-64 flex items-center justify-center">
        <div className="text-gray-600">No tour packages available.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={prevPackages}
          className="absolute -left-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg disabled:opacity-50"
          disabled={loading || tourPackages.length <= 1}
          aria-label="Previous package"
        >
          <ChevronLeft className="text-gray-700 h-6 w-6" />
        </button>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4">
          {visiblePackages.map((pkg, index) => (
            <div
              key={`${pkg._id}-${index}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              {/* Image with fallback */}
              <div className="h-48 w-full bg-gray-200">
                <img
                  src={pkg.image || "/api/placeholder/400/320"}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/320";
                  }}
                />
              </div>

              {/* Package Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden line-clamp-2">
                  {pkg.description}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="font-semibold text-gray-700">Duration</p>
                    <p className="text-gray-600">{pkg.duration || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Price</p>
                    <p className="text-gray-600">
                      {typeof pkg.price === "number"
                        ? `₹${pkg.price.toLocaleString()}`
                        : pkg.price || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Package Type</p>
                    <p className="text-gray-600">{pkg.difficulty || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPackages}
          className="absolute -right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg disabled:opacity-50"
          disabled={loading || tourPackages.length <= 1}
          aria-label="Next package"
        >
          <ChevronRight className="text-gray-700 h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TourPackageSlider;
