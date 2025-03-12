import { useEffect, useState } from "react";
import axios from "axios";
import CustomPackage from "./CustomPackage";

const TourPackagesTable = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/api/bestselling-tour-packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="mt-8 container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">
        Bestselling Bhutan Tour Packages
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bhutan Tour Package
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Duration
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price*
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Inclusions
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {pkg.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {Number(pkg.duration) || 0} Nights /{" "}
                    {Number(pkg.duration) + 1 || 1} Days
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{pkg.price?.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pkg.inclusions || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-600">
                    <a
                      href={`/packages/${pkg._id}`}
                      className="hover:underline"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No packages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomPackage />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bestselling-tour-packages"
    );
    console.log("API Response:", response.data); // Log the API response
    const packages = response.data || []; // Fallback to an empty array

    return {
      props: {
        packages, // Pass the fetched data as props
      },
    };
  } catch (error) {
    console.error("Error fetching packages:", error);
    return {
      props: {
        packages: [], // Fallback to an empty array if there's an error
      },
    };
  }
}

export default TourPackagesTable;
