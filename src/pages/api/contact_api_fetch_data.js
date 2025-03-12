import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const uri = process.env.MONGODB_URI; // MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("travelheights");
    const collection = database.collection("contacts");

    // Fetch all contacts from the collection
    const contacts = await collection.find({}).toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts from MongoDB:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  } finally {
    await client.close();
  }
}
