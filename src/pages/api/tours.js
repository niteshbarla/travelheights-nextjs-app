import clientPromise from "../../lib/db"; // Import default export
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Wait for the MongoDB client connection
    const client = await clientPromise;
    const db = client.db("travelheights"); // Make sure this matches your database name

    // CREATE
    if (req.method === "POST") {
      const { title, description, duration, price, difficulty, image } =
        req.body;
      const result = await db.collection("tourpackages_slider").insertOne({
        title,
        description,
        duration,
        price,
        difficulty,
        image,
      });
      res.status(201).json({
        success: true,
        data: {
          _id: result.insertedId,
          title,
          description,
          duration,
          price,
          difficulty,
          image,
        },
      });
    }

    // READ
    else if (req.method === "GET") {
      const tours = await db
        .collection("tourpackages_slider")
        .find({})
        .toArray();
      res.status(200).json({ success: true, data: tours });
    }

    // UPDATE
    else if (req.method === "PUT") {
      const { id, ...updateData } = req.body;
      const result = await db
        .collection("tourpackages_slider")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.modifiedCount === 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: "Tour not found" });
      }
    }

    // DELETE
    else if (req.method === "DELETE") {
      const { id } = req.body;
      const result = await db
        .collection("tourpackages_slider")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: "Tour not found" });
      }
    }

    // Unsupported Method
    else {
      res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
