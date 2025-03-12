import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb";
import { getRelatedBlogs } from "../../lib/blogApi";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("travelheights"); // Ensure this is your correct database name
    const collection = db.collection("blogs_details"); // Ensure this matches your MongoDB collection

    if (req.method === "GET") {
      const { slug } = req.query;

      if (slug) {
        // Fetch a single blog by slug
        const blog = await collection.findOne({ slug });
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Fetch related blogs based on keywords
        const relatedBlogs = await getRelatedBlogs(blog.keywords);
        return res.status(200).json({ blog, relatedBlogs });
      } else {
        // Fetch all blogs
        const blogs = await collection.find({}).toArray();
        return res.status(200).json({ blogs });
      }
    }

    if (req.method === "POST") {
      try {
        const newBlog = req.body;
        await collection.insertOne(newBlog);
        return res.status(201).json({ message: "Blog created", blog: newBlog });
      } catch (error) {
        console.error("Error inserting blog:", error);
        return res.status(500).json({ error: "Failed to create blog" });
      }
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      try {
        const updatedBlog = req.body;
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedBlog },
          { returnDocument: "after" }
        );

        if (!result.value)
          return res.status(404).json({ error: "Blog not found" });
        return res
          .status(200)
          .json({ message: "Blog updated", blog: result.value });
      } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ error: "Failed to update blog" });
      }
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Blog not found" });
      return res.status(200).json({ message: "Blog deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
