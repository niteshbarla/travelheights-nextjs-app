import { useState, useEffect, useRef } from "react";
import { FaFilter, FaArrowDown } from "react-icons/fa";
import StaticOfferButton from "./StaticOfferButton"; // Static button
import axios from "axios";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/router"; // Import useRouter

const TourFilter = ({ initialPackages }) => {
  const router = useRouter();
  const [filteredPackages, setFilteredPackages] = useState(
    initialPackages || []
  ); // Fallback to an empty array
  const [filters, setFilters] = useState({
    priceRange: [],
    duration: [],
    start_location: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterContentRef = useRef(null);

  // Fetch filtered packages from the API
  const fetchPackages = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.priceRange.length > 0)
        params.append("price", filters.priceRange.join(","));

      if (filters.duration.length > 0)
        params.append("duration", filters.duration.join(","));

      if (filters.start_location.length > 0)
        params.append("start_location", filters.start_location.join(","));

      const response = await axios.get(
        `/api/tour-packages?${params.toString()}`
      );

      setFilteredPackages(response.data.data || []); // Fallback to an empty array
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // Fetch packages whenever filters change
  useEffect(() => {
    fetchPackages();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const updated = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value) // Remove if already selected
        : [...prev[category], value]; // Add if not selected
      return { ...prev, [category]: updated };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      priceRange: [],
      duration: [],
      start_location: [],
    });
  };

  // Scroll filter content
  const scrollFilterContent = () => {
    if (filterContentRef.current) {
      filterContentRef.current.scrollBy({
        top: 200, // Scroll down by 200px
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="tour-filter-section min-h-screen bg-gray-50 py-8">
      <div className="tour-filter-container mx-auto px-4 max-w-7xl">
        <div className="mb-4 flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-semibold">Select Your Package Here</h2>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsFilterOpen(true)}
          >
            <FaFilter /> Filter
          </button>
        </div>

        <div className="tour-filter-wrapper flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div
            className={`tour-filter-sidebar w-full lg:w-1/4 fixed lg:sticky top-0 left-0 h-full lg:h-screen bg-white lg:bg-transparent shadow-lg p-4 transform ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform lg:translate-x-0 z-50 lg:z-auto`}
          >
            <div className="flex justify-between items-center lg:hidden">
              <h2 className="text-xl font-semibold">Filter Packages</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div
              ref={filterContentRef}
              className="mt-4 border p-4 rounded-lg bg-white shadow-lg overflow-auto max-h-[70vh] lg:max-h-[80vh] relative"
            >
              <h2 className="text-xl font-semibold mb-4">Filter Packages</h2>

              {/* Price Range Filter */}
              <div className="tour-price-filter">
                <h3 className="font-medium mb-2">Price Range (per person)</h3>
                {[
                  "0-10000",
                  "10001-20000",
                  "20001-30000",
                  "30001-40000",
                  "40001-50000",
                  "50001",
                ].map((range, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded"
                      onChange={() => handleFilterChange("priceRange", range)}
                      checked={filters.priceRange.includes(range)}
                    />
                    <span className="text-gray-700">
                      ₹{range.replace("-", " - ₹")}
                    </span>
                  </label>
                ))}
              </div>

              {/* Duration Filter */}
              <div className="tour-duration-filter mt-6">
                <h3 className="font-medium mb-2">Duration (in Days)</h3>
                {["0-3", "4-5", "6-7", "8-9", "10+"].map((range, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded"
                      onChange={() => handleFilterChange("duration", range)}
                      checked={filters.duration.includes(range)}
                    />
                    <span className="text-gray-700">
                      {range.replace("-", " - ")} Days
                    </span>
                  </label>
                ))}
              </div>

              {/* Starting Location Filter */}
              <div className="tour-starting-location-filter mt-6">
                <h3 className="font-medium mb-2">Starting From</h3>
                {[
                  "Kolkata",
                  "Delhi",
                  "Guwahati railway station",
                  "Guwahati Airport",
                ].map((location, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded"
                      onChange={() =>
                        handleFilterChange("start_location", location)
                      }
                      checked={filters.start_location.includes(location)}
                    />
                    <span className="text-gray-700">{location}</span>
                  </label>
                ))}
              </div>

              {/* Reset Filters Button */}
              <div className="mt-6">
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>

              {/* Down Arrow Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={scrollFilterContent}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                >
                  <FaArrowDown className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Packages List */}
          <div className="tour-packages-list w-full lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Available Packages
            </h2>
            <div className="space-y-6">
              {filteredPackages && filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="border rounded-xl shadow-lg bg-white p-6 flex flex-col lg:flex-row items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => router.push(`/tour-itinerary/${pkg.slug}`)}
                  >
                    {/* Image Section */}
                    <img
                      src={pkg.image_url}
                      alt={pkg.title}
                      className="w-full lg:w-60 h-56 object-cover rounded-lg"
                    />

                    {/* Package Details */}
                    <div className="ml-0 lg:ml-6 mt-4 lg:mt-0 flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {pkg.title}
                      </h3>
                      <p className="text-md text-gray-700 mt-2">
                        {pkg.itinerary}
                      </p>

                      {/* Additional Details */}
                      <div className="mt-4 space-y-1">
                        <p className="text-lg font-semibold text-blue-600">
                          Price: ₹{pkg.price.toLocaleString()}
                        </p>
                        <p className="text-md text-gray-700">
                          <strong>Duration:</strong> {pkg.duration} days
                        </p>
                        <p className="text-md text-gray-700">
                          <strong>Start Location:</strong> {pkg.start_location}
                        </p>
                      </div>

                      {/* Book Now Button */}
                      <div
                        className="mt-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <StaticOfferButton
                          onClick={() => console.log("Offer Clicked")}
                          className="bg-blue-600 hover:bg-blue-700"
                          label="Book Now"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 text-lg">
                  No packages found. Adjust filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Server-Side Rendering (SSR)
export async function getServerSideProps() {
  try {
    // Fetch data from your API or database
    const response = await axios.get("http://localhost:3000/api/tour-packages");
    const initialPackages = response.data.data || []; // Fallback to an empty array

    return {
      props: {
        initialPackages,
      },
    };
  } catch (error) {
    console.error("Error fetching initial packages:", error);
    return {
      props: {
        initialPackages: [], // Fallback to an empty array
      },
    };
  }
}

export default TourFilter;
