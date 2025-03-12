import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Set this in your .env.local
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db("travelheights"); // Use your database name
    const collection = database.collection("about"); // Collection for About page

    switch (req.method) {
      case "GET":
        // Fetch About content (Assuming only one document for the About page)
        const aboutData = await collection.findOne({});
        res.status(200).json(aboutData);
        break;

      case "POST":
        // Create About content (Only needed if no data exists)
        const newAbout = req.body;
        const insertResult = await collection.insertOne(newAbout);
        res
          .status(201)
          .json({ message: "About content added", data: insertResult });
        break;

      case "PUT":
        // Update About content
        const { _id, ...updatedData } = req.body;
        if (!_id) {
          return res.status(400).json({ message: "Missing About content ID" });
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updatedData }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "No changes made or About content not found" });
        }

        res.status(200).json({ message: "About content updated successfully" });
        break;

      case "DELETE":
        // Delete About content
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ message: "Missing About content ID" });
        }

        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(id),
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: "About content not found" });
        }

        res.status(200).json({ message: "About content deleted successfully" });
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
