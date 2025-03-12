import { useState, useEffect } from "react";
import Image from "next/image";
import AdminLayout from "../../../components/AdminLayout";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    slug: "",
    keywords: "", // Add keywords field
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload state

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blog-card-admin-api");
    const data = await res.json();
    setBlogs(data);
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Automatically generate slug from the title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace special characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    setForm({ ...form, title, slug });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file); // Use "files" as the field name

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, image: data.urls[0] }); // Set the uploaded image URL
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, _id: editId } : form;

    const res = await fetch("/api/blog-card-admin-api", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setForm({
        title: "",
        description: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
        slug: "",
        keywords: "", // Reset keywords field
      });
      setEditId(null);
      fetchBlogs();
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const res = await fetch("/api/blog-card-admin-api", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchBlogs();
    }
  };

  // Handle edit
  const handleEdit = (blog) => {
    setForm(blog);
    setEditId(blog._id);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Blog Cards
        </h1>

        {/* Blog Cards Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editId ? "Edit Blog" : "Add New Blog"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={form.title}
              onChange={handleTitleChange} // Use handleTitleChange for title
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="slug"
              placeholder="Blog Slug (e.g., my-blog-post)"
              value={form.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              placeholder="Blog Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
            <input
              type="text"
              name="keywords"
              placeholder="Keywords (comma-separated)"
              value={form.keywords}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {form.image && (
                <div className="mt-2">
                  <img
                    src={form.image}
                    alt="Uploaded"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {editId ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>

        {/* Blog List */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {blog.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(blog.date).toDateString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Slug: {blog.slug}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Keywords: {blog.keywords}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="w-full bg-yellow-500 text-dark px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
