import AdminLayout from "../../../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminTourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    inclusions: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await axios.get("/api/bestselling-tour-packages-admin-api");
    setPackages(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;

    await axios({
      method,
      url: "/api/bestselling-tour-packages-admin-api",
      data: body,
    });
    setForm({ title: "", duration: "", price: "", inclusions: "" });
    setEditId(null);
    fetchPackages();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    await axios.delete("/api/bestselling-tour-packages-admin-api", {
      data: { id },
    });
    fetchPackages();
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setEditId(pkg._id);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Best-Selling Tour Packages
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Package" : "Add New Package"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Package Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={form.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="inclusions"
              placeholder="Inclusions"
              value={form.inclusions}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editId ? "Update Package" : "Add Package"}
            </button>
          </div>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Tour Packages</h2>
          <ul className="space-y-4">
            {packages.map((pkg) => (
              <li
                key={pkg._id}
                className="p-4 border rounded-lg hover:shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {pkg.title} ({pkg.duration})
                    </p>
                    <p className="text-gray-600">Price: ₹{pkg.price}</p>
                    <p className="text-gray-600">
                      Inclusions: {pkg.inclusions}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-green-500 text-black px-5 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:bg-green-600 hover:scale-105 active:scale-95 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:bg-red-600 hover:scale-105 active:scale-95 focus:outline-none"
                    >
                      Delete
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

export default AdminTourPackages;
