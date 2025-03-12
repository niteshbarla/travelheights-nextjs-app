import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  try {
    console.log("Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("Successfully connected to MongoDB");

    const db = client.db("travelheights"); // Replace with your actual database name
    console.log("Using database:", db.databaseName);

    console.log("Fetching tour packages from collection: tourpackages");
    const tourPackages = await db
      .collection("tourpackages_slider")
      .find({})
      .toArray();
    console.log("Successfully fetched tour packages:", tourPackages);

    res.status(200).json(tourPackages);
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
