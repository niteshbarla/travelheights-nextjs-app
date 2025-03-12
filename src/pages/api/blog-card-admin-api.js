import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env.local file
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db("travelheights"); // Replace with your database name
    const collection = database.collection("blogs");

    switch (req.method) {
      case "GET":
        // Fetch all blogs
        const blogs = await collection.find({}).toArray();
        res.status(200).json(blogs);
        break;

      case "POST":
        // Create a new blog
        const newBlog = req.body;

        // Ensure keywords is an array
        if (newBlog.keywords && typeof newBlog.keywords === "string") {
          newBlog.keywords = newBlog.keywords
            .split(",")
            .map((keyword) => keyword.trim());
        } else if (!Array.isArray(newBlog.keywords)) {
          newBlog.keywords = []; // Default to an empty array if keywords is not provided or invalid
        }

        // Check if a blog with the same slug already exists
        const existingBlog = await collection.findOne({ slug: newBlog.slug });
        if (existingBlog) {
          return res
            .status(400)
            .json({ error: "A blog with this slug already exists" });
        }

        // Insert the new blog
        const result = await collection.insertOne(newBlog);
        res
          .status(201)
          .json({ message: "Blog added successfully", data: result.ops[0] });
        break;

      case "PUT":
        // Update a blog
        const { _id, ...updatedBlog } = req.body;

        if (!_id) {
          return res.status(400).json({ message: "Missing blog ID" });
        }

        // Ensure keywords is an array
        if (updatedBlog.keywords && typeof updatedBlog.keywords === "string") {
          updatedBlog.keywords = updatedBlog.keywords
            .split(",")
            .map((keyword) => keyword.trim());
        } else if (!Array.isArray(updatedBlog.keywords)) {
          updatedBlog.keywords = []; // Default to an empty array if keywords is not provided or invalid
        }

        // Check if a blog with the same slug already exists (excluding the current blog)
        const existingSlugBlog = await collection.findOne({
          slug: updatedBlog.slug,
          _id: { $ne: new ObjectId(_id) },
        });

        if (existingSlugBlog) {
          return res
            .status(400)
            .json({ error: "A blog with this slug already exists" });
        }

        // Update the blog
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updatedBlog }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "Blog not found or no changes made" });
        }

        res.status(200).json({ message: "Blog updated successfully" });
        break;

      case "DELETE":
        // Delete a blog
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ message: "Missing blog ID" });
        }

        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(id),
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
        break;

      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    await client.close();
  }
}
