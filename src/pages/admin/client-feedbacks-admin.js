import AdminLayout from "../../../components/AdminLayout";
import { useEffect, useState } from "react";

const AdminClientFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    feedback: "",
    rating: 5,
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/client-feedbacks-admin-api");
    const data = await res.json();
    setFeedbacks(data);
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;

    const res = await fetch("/api/client-feedbacks-admin-api", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setForm({ name: "", location: "", feedback: "", rating: 5, image: "" });
      setEditId(null);
      fetchFeedbacks();
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    const res = await fetch("/api/client-feedbacks-admin-api", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchFeedbacks();
    }
  };

  // Handle edit
  const handleEdit = (feedback) => {
    setForm(feedback);
    setEditId(feedback._id);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Client Feedbacks
        </h1>

        {/* Feedback Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editId ? "Edit Feedback" : "Add New Feedback"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="feedback"
              placeholder="Feedback"
              value={form.feedback}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={form.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="5"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {editId ? "Update Feedback" : "Add Feedback"}
            </button>
          </div>
        </form>

        {/* Feedback List */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Client Feedbacks
          </h2>
          <ul className="space-y-4">
            {feedbacks.map((feedback) => (
              <li
                key={feedback._id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {feedback.name}{" "}
                      <span className="text-sm text-gray-500">
                        ({feedback.location})
                      </span>
                    </p>
                    <p className="text-gray-600 mt-1">{feedback.feedback}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="text-gray-700 ml-1">
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="flex items-center justify-center gap-2 w-24 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="flex items-center justify-center gap-2 w-24 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminClientFeedbacks;
