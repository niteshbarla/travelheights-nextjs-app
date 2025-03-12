// lib/api.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB connection string in .env.local
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fetch all itineraries
export async function getAllItineraries() {
  try {
    await client.connect();
    const db = client.db("travelheights"); // Replace with your database name
    const collection = db.collection("itineraries"); // Replace with your collection name

    const itineraries = await collection.find({}).toArray();
    return JSON.parse(JSON.stringify(itineraries)); // Convert to plain JavaScript objects
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Fetch a single itinerary by slug
export async function getItineraryBySlug(slug) {
  try {
    await client.connect();
    const db = client.db("travelheights"); // Replace with your database name
    const collection = db.collection("itineraries"); // Replace with your collection name

    const itinerary = await collection.findOne({ slug });
    return JSON.parse(JSON.stringify(itinerary)); // Convert to plain JavaScript object
  } catch (error) {
    console.error("Error fetching itinerary by slug:", error);
    throw error;
  } finally {
    await client.close();
  }
}
