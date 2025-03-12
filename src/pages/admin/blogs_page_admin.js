import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    content: "",
    highlight: "normal",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload state

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs_details");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file); // Use "files" as the field name

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.urls && res.data.urls.length > 0) {
        setForm({ ...form, image: res.data.urls[0] }); // Set the uploaded image URL
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/blogs_details?id=${editId}`, form);
      } else {
        await axios.post("/api/blogs_details", form);
      }
      fetchBlogs();
      setForm({
        title: "",
        slug: "",
        image: "",
        content: "",
        highlight: "normal",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog) => {
    const { _id, ...editableFields } = blog; // Exclude `_id`
    setForm(editableFields);
    setEditId(_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/blogs_details?id=${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>

        {/* Blog Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-4 shadow-md rounded-md"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 mb-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border p-2 mb-2 rounded-md"
            required
          />
          <div className="flex flex-col space-y-2 mb-2">
            <label className="text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded-md"
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            {form.image && (
              <div className="mt-2">
                <img
                  src={form.image}
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <textarea
            placeholder="Content (Use '---' to separate sections, first line after '---' will be the heading)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border p-2 mb-2 rounded-md"
            required
          />
          {/* Highlight Selection */}
          <label className="block text-sm font-medium mb-1">
            Highlight Heading:
          </label>
          <select
            value={form.highlight}
            onChange={(e) => setForm({ ...form, highlight: e.target.value })}
            className="w-full border p-2 mb-2 rounded-md"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="underline">Underline</option>
            <option value="color">Blue Color</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded-md"
          >
            {editId ? "Update Blog" : "Create Blog"}
          </button>
        </form>

        {/* Blog List */}
        <ul>
          {blogs.map((blog) => {
            const sections = blog.content
              .split("---")
              .map((section) => section.trim());

            return (
              <li
                key={blog._id}
                className="border p-4 mb-4 bg-gray-50 shadow-md rounded-md"
              >
                <h2 className="text-xl font-bold">{blog.title}</h2>
                {sections.map((section, index) => {
                  const [firstLine, ...contentLines] = section.split("\n");
                  const contentParagraphs = contentLines.join("\n").trim();

                  const headingClass =
                    blog.highlight === "bold"
                      ? "font-bold text-lg"
                      : blog.highlight === "underline"
                      ? "underline text-lg"
                      : blog.highlight === "color"
                      ? "text-blue-600 text-lg"
                      : "text-lg font-semibold";

                  return (
                    <div key={index} className="mt-3">
                      {firstLine && (
                        <h3 className={headingClass}>{firstLine}</h3>
                      )}
                      <hr className="my-2 border-gray-300" />
                      <p className="text-gray-600 whitespace-pre-line">
                        {contentParagraphs}
                      </p>
                    </div>
                  );
                })}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
