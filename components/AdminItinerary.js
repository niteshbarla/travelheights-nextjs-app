import { useState, useEffect } from "react";

export default function AdminItinerary() {
  const [itineraries, setItineraries] = useState([]);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    keywords: "",
    days: "",
    images: [],
    inclusions: "",
    exclusions: "",
    otherInfo: "",
    cost: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, []);

  async function fetchItineraries() {
    const res = await fetch("/api/itinerary_api_admin");
    const data = await res.json();
    setItineraries(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";

    const formattedDays = formData.days.split("\n---\n").map((day) => {
      const lines = day.split("\n");
      return {
        heading: lines[0]?.trim(),
        description: lines.slice(1).join("\n").trim(),
      };
    });

    const formattedData = {
      ...formData,
      keywords: formData.keywords.split(",").map((k) => k.trim()),
      days: formattedDays,
      inclusions: formData.inclusions.split(",").map((inc) => inc.trim()),
      exclusions: formData.exclusions.split(",").map((exc) => exc.trim()),
    };

    const body = editingId
      ? { _id: editingId, ...formattedData }
      : formattedData;

    await fetch("/api/itinerary_api_admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    resetForm();
    fetchItineraries();
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file); // ✅ Ensure field name matches API (`files`)
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.urls) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...data.urls],
        }));

        const previewUrls = data.urls.map((url) => url);
        setImagePreviews((prev) => [...prev, ...previewUrls]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function handleEdit(itinerary) {
    setFormData({
      ...itinerary,
      keywords: itinerary.keywords.join(", "),
      days: itinerary.days
        .map((day) => `${day.heading}\n${day.description}`)
        .join("\n---\n"),
      images: itinerary.images,
      inclusions: itinerary.inclusions.join(", "),
      exclusions: itinerary.exclusions.join(", "),
    });

    // Set previews for existing images
    setImagePreviews(itinerary.images.map((img) => img));
    setEditingId(itinerary._id);
  }

  async function handleDelete(id) {
    await fetch("/api/itinerary_api_admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    fetchItineraries();
  }

  function resetForm() {
    setFormData({
      slug: "",
      title: "",
      description: "",
      keywords: "",
      days: "",
      images: [],
      inclusions: "",
      exclusions: "",
      otherInfo: "",
      cost: "",
    });
    setImagePreviews([]);
    setEditingId(null);
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Manage Itineraries
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 w-full rounded h-24"
          required
        />
        <input
          type="text"
          placeholder="Keywords (comma separated)"
          value={formData.keywords}
          onChange={(e) =>
            setFormData({ ...formData, keywords: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Days (Heading on first line, details below. Separate days with '---')"
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="border p-2 w-full rounded h-48"
        />

        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="border p-2 w-full rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Uploaded preview"
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Inclusions (comma separated)"
          value={formData.inclusions}
          onChange={(e) =>
            setFormData({ ...formData, inclusions: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Exclusions (comma separated)"
          value={formData.exclusions}
          onChange={(e) =>
            setFormData({ ...formData, exclusions: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Other Information"
          value={formData.otherInfo}
          onChange={(e) =>
            setFormData({ ...formData, otherInfo: e.target.value })
          }
          className="border p-2 w-full rounded h-20"
        />
        <input
          type="text"
          placeholder="Cost"
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {editingId ? "Update Itinerary" : "Add Itinerary"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <ul className="space-y-4">
        {itineraries.map((itinerary) => (
          <li
            key={itinerary._id}
            className="border p-4 rounded-lg flex justify-between items-center bg-gray-100"
          >
            <span className="font-semibold">{itinerary.title}</span>
            <div>
              <button
                onClick={() => handleEdit(itinerary)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(itinerary._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
