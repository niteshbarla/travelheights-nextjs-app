import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("travelheights");
    const collection = db.collection("itineraries");

    switch (req.method) {
      case "GET":
        const itineraries = await collection.find({}).toArray();
        res.status(200).json(itineraries);
        break;

      case "POST":
        const newItinerary = req.body;
        await collection.insertOne(newItinerary);
        res.status(201).json({ message: "Itinerary added successfully" });
        break;

      case "PUT":
        const { _id: updateId, ...updatedItinerary } = req.body;
        await collection.updateOne(
          { _id: new ObjectId(updateId) },
          { $set: updatedItinerary }
        );
        res.status(200).json({ message: "Itinerary updated successfully" });
        break;

      case "DELETE":
        const { _id: deleteId } = req.body;
        await collection.deleteOne({ _id: new ObjectId(deleteId) });
        res.status(200).json({ message: "Itinerary deleted successfully" });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling itinerary request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
