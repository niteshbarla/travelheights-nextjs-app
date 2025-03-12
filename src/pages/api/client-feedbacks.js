import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("travelheights"); // Replace with your actual database name
    const collection = db.collection("clientFeedbacks");

    if (req.method === "GET") {
      // Fetch all feedbacks
      const feedbacks = await collection.find({}).toArray();
      res.status(200).json(feedbacks);
    } else if (req.method === "POST") {
      // Add new feedback
      const { name, location, feedback, rating, image } = req.body;
      if (!name || !location || !feedback || !rating || !image) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newFeedback = { name, location, feedback, rating, image };
      const result = await collection.insertOne(newFeedback);

      res.status(201).json({ message: "Feedback added", data: result });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
