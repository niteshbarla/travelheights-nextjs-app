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
    const collection = db.collection("best_selling_packages");

    switch (req.method) {
      case "GET":
        const packages = await collection.find({}).toArray();
        res.status(200).json(packages);
        break;

      case "POST":
        const newPackage = req.body;
        const result = await collection.insertOne(newPackage);
        res
          .status(201)
          .json({ message: "Package created", id: result.insertedId });
        break;

      case "PUT":
        const { _id, ...updatedData } = req.body;
        await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updatedData }
        );
        res.status(200).json({ message: "Package updated" });
        break;

      case "DELETE":
        const { id } = req.body;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: "Package deleted" });
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
