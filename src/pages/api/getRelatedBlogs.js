import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { keywords } = req.query; // Keywords from the itinerary

  try {
    const client = await clientPromise;
    const db = client.db("travelheights"); // Replace with your database name

    console.log("Fetching related blogs for keywords:", keywords); // Debugging line

    // Convert keywords to an array if it's a string
    const keywordsArray = Array.isArray(keywords)
      ? keywords
      : keywords.split(",");

    // Fetch blogs where at least one keyword matches
    const relatedBlogs = await db
      .collection("blogs")
      .find({
        keywords: { $in: keywordsArray }, // Match any keyword in the array
      })
      .toArray();

    console.log("Related Blogs fetched:", relatedBlogs); // Debugging line

    res.status(200).json({ blogs: relatedBlogs });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
