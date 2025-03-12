import clientPromise from "../../lib/db"; // Ensure this import is correct

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("travelheights"); // Replace with your DB name
    const blogs = await db.collection("blogs").find({}).toArray();

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
