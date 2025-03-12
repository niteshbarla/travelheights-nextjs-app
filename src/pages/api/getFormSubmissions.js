import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env.local file
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("travelheights"); // Replace with your database name
      const collection = database.collection("formSubmissions");

      // Fetch all form submissions
      const submissions = await collection.find({}).toArray();

      res.status(200).json(submissions);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch form submissions", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
