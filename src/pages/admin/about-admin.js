"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({ content: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch existing About Us content
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        if (data) {
          setAboutData({ ...data });
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("About Us updated successfully!");
      } else {
        setMessage(result.message || "Failed to update.");
      }
    } catch (error) {
      console.error("Error updating About Us:", error);
      setMessage("Error updating About Us.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <AdminLayout>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
        <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Admin - Update About Us
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* About Content */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                About Content
              </label>
              <textarea
                name="content"
                rows="6"
                value={aboutData.content}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={aboutData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Update About Us
            </button>

            {/* Success/Error Message */}
            {message && (
              <p className="text-center text-green-600 font-semibold">
                {message}
              </p>
            )}
          </form>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AboutAdmin;
