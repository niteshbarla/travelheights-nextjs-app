import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri); // Debug log

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// No need for deprecated options in MongoDB Driver 4.0.0+
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    console.log("Connected to MongoDB (Development)");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client and connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("Connected to MongoDB (Production)");
}

export default clientPromise;
