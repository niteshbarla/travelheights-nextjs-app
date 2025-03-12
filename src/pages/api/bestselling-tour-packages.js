import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

// Reuse the MongoDB client instead of reconnecting on every request
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("travelheights"); // Use your actual database name
      const collection = db.collection("best_selling_packages");

      // Fetch all packages but exclude the "image" field if it's not needed
      const packages = await collection
        .find({}, { projection: { image: 0 } }) // Excludes image field
        .toArray();

      res.status(200).json(packages);
    } catch (error) {
      console.error("Error fetching best-selling packages:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
