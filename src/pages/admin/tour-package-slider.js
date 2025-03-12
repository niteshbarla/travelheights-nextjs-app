import AdminLayout from "../../../components/AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    difficulty: "",
    image: "", // Store the image URL here
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload state

  // Fetch all tours
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const res = await axios.get("/api/tours");
    setTours(res.data.data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file); // Use "files" as the field name

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.urls && res.data.urls.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          image: res.data.urls[0], // Set the uploaded image URL
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put("/api/tours", { id: editId, ...formData });
      } else {
        await axios.post("/api/tours", formData);
      }

      // Reset form data
      setFormData({
        title: "",
        description: "",
        duration: "",
        price: "",
        difficulty: "",
        image: "",
      });
      setEditId(null);
      fetchTours(); // Refresh the list of tours
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle edit
  const handleEdit = (tour) => {
    setFormData({
      title: tour.title,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      difficulty: tour.difficulty,
      image: tour.image,
    });
    setEditId(tour._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete("/api/tours", { data: { id } });
    fetchTours();
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Tour Package Slider
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Duration:
            </label>
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Difficulty:
            </label>
            <input
              type="text"
              name="difficulty"
              placeholder="Difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image:
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              required={!editId} // Only required when creating a new tour
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-md"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Tour Packages</h2>
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li key={tour._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
              <p className="text-gray-700 mb-2">{tour.description}</p>
              <p className="text-gray-700 mb-2">
                <strong>Duration:</strong> {tour.duration}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Price:</strong> {tour.price}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Difficulty:</strong> {tour.difficulty}
              </p>
              <img
                src={tour.image}
                alt={tour.title}
                className="w-24 h-24 object-cover rounded-md mb-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="bg-red-600 text-gray-900 font-semibold py-2 px-4 rounded-md border border-red-700 shadow-md
             hover:bg-red-700 hover:border-red-800 transition duration-200 
             focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-600 text-gray-900 font-semibold py-2 px-4 rounded-md border border-red-700 shadow-md
             hover:bg-red-700 hover:border-red-800 transition duration-200 
             focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
