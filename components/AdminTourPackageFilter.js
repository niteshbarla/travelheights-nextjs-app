import { useState, useEffect } from "react";
import axios from "axios";

const AdminTourPackageForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: "",
    start_location: "",
    image_url: "",
    itinerary: "",
    slug: "", // Slug field
  });

  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  // 🔹 Fetch all tour packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get("/api/tour_packages_filter_admin");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure `price` & `duration` are always numbers
    const numericFields = ["price", "duration"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value.replace(/[^0-9]/g, "")
        : value,
    }));
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert `price` & `duration` to numbers before sending to API
    const formattedData = {
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
    };

    try {
      if (editingPackage) {
        await axios.put("/api/tour_packages_filter_admin", {
          _id: editingPackage._id,
          ...formattedData,
        });
      } else {
        await axios.post("/api/tour_packages_filter_admin", formattedData);
      }
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  // 🔹 Delete a package
  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/tour_packages_filter_admin", {
        data: { id },
      });
      fetchPackages();
      resetForm();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // 🔹 Edit an existing package
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      price: String(pkg.price), // Convert to string for input field
      duration: String(pkg.duration), // Convert to string for input field
    });
  };

  // 🔹 Reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      duration: "",
      start_location: "",
      image_url: "",
      itinerary: "",
      slug: "",
    });
    setEditingPackage(null);
  };

  return (
    <div className="p-4">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded-lg shadow"
      >
        <h2 className="text-lg font-bold">
          {editingPackage ? "Edit Package" : "Create Package"}
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded-lg"
          required
        />

        {/* Price Input (Number Only) */}
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full p-2 border rounded-lg"
          required
        />

        {/* Duration Input (Number Only) */}
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (Days)"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="start_location"
          value={formData.start_location}
          onChange={handleChange}
          placeholder="Start Location"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug (e.g., 04nights-05days-bhutan-tour)"
          className="w-full p-2 border rounded-lg"
          required
        />

        <textarea
          name="itinerary"
          value={formData.itinerary}
          onChange={handleChange}
          placeholder="Itinerary"
          className="w-full p-2 border rounded-lg"
          required
        />

        {/* Submit & Delete Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingPackage ? "Update Package" : "Create Package"}
          </button>

          {editingPackage && (
            <button
              type="button"
              onClick={() => handleDelete(editingPackage._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete Package
            </button>
          )}
        </div>
      </form>

      {/* Display Packages */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">All Tour Packages</h2>
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-md font-semibold">{pkg.title}</h3>
                <p className="text-gray-600">
                  Price: ₹{pkg.price.toLocaleString()} | Duration:{" "}
                  {pkg.duration} days
                </p>
                <p className="text-gray-600">
                  Start Location: {pkg.start_location}
                </p>
                <p className="text-gray-600">Slug: {pkg.slug}</p>
              </div>
              <button
                onClick={() => handleEdit(pkg)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTourPackageForm;
