import { useState, useEffect } from "react";
import axios from "axios";
import AdminTourPackageFilter from "../../../components/AdminTourPackageFilter";
import AdminLayout from "../../../components/AdminLayout";

const AdminTourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/api/tour-packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSuccess = () => {
    setSelectedPackage(null); // Reset form
    fetchPackages(); // Refresh package list
  };

  return (
    <AdminLayout>  
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Tour Package Filter</h1>

        {/* Package Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {selectedPackage ? "Edit Package" : "Create New Package"}
          </h2>
          <AdminTourPackageFilter
            packageToEdit={selectedPackage}
            onSuccess={handleSuccess}
          />
        </div>

        {/* Package List
        <div>
          <h2 className="text-xl font-semibold mb-4">All Packages</h2>
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{pkg.title}</h3>
                  <p className="text-gray-700">{pkg.itinerary}</p>
                </div>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
};

export default AdminTourPackages;
