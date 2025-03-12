import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB connection string in .env.local
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("travelheights"); // Replace with your database name
    const collection = db.collection("clientFeedbacks"); // Collection for feedbacks

    switch (req.method) {
      case "GET":
        // Fetch all client feedbacks
        const feedbacks = await collection.find({}).toArray();
        res.status(200).json(feedbacks);
        break;

      case "POST":
        // Create a new client feedback
        const newFeedback = req.body;
        const result = await collection.insertOne(newFeedback);
        res
          .status(201)
          .json({ message: "Feedback created", id: result.insertedId });
        break;

      case "PUT":
        // Update an existing client feedback
        const { _id, ...updatedData } = req.body;
        if (!_id) return res.status(400).json({ message: "ID is required" });

        await collection.updateOne(
          { _id: new ObjectId(_id) }, // Convert _id to ObjectId
          { $set: updatedData }
        );
        res.status(200).json({ message: "Feedback updated" });
        break;

      case "DELETE":
        // Delete a client feedback
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "ID is required" });

        await collection.deleteOne({ _id: new ObjectId(id) }); // Convert id to ObjectId
        res.status(200).json({ message: "Feedback deleted" });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
