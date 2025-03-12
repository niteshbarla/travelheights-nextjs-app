import clientPromise from "../../lib/db"; // Import database connection

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 🔹 Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("travelheights");
    const collection = db.collection("tour_packages");

    // 🔹 Extract query parameters
    const { price, duration, start_location } = req.query;

    console.log("Received Filters:", { price, duration, start_location });

    let filter = {}; // Initialize filter
    let conditions = [];

    // ✅ Fix: Parse price filter properly
    if (price) {
      const priceRanges = price.split(",");
      const priceConditions = priceRanges
        .map((range) => {
          if (range === "50001") {
            return { price: { $gte: 50001 } };
          } else if (range.includes("-")) {
            const [min, max] = range.split("-").map(Number);
            return { price: { $gte: min, $lte: max } };
          }
          return null;
        })
        .filter(Boolean); // Remove null values

      if (priceConditions.length > 0) {
        conditions.push({ $or: priceConditions });
      }
    }

    // ✅ Fix: Parse duration filter properly
    if (duration) {
      const durations = duration.split(",");
      const durationConditions = durations
        .map((d) => {
          if (d === "10+") {
            return { duration: { $gte: 10 } };
          } else if (d.includes("-")) {
            const [min, max] = d.split("-").map(Number);
            return { duration: { $gte: min, $lte: max } };
          }
          return null;
        })
        .filter(Boolean); // Remove null values

      if (durationConditions.length > 0) {
        conditions.push({ $or: durationConditions });
      }
    }

    // ✅ Fix: Parse start location filter properly
    if (start_location) {
      const locations = start_location.split(",");
      conditions.push({ start_location: { $in: locations } });
    }

    // ✅ Apply Filters if any
    if (conditions.length > 0) {
      filter.$and = conditions;
    }

    console.log("Final MongoDB Query:", JSON.stringify(filter, null, 2));

    // 🔹 Fetch packages from the database
    const packages = await collection.find(filter).toArray();

    if (packages.length === 0) {
      return res
        .status(200)
        .json({ message: "No tour packages found", data: [] });
    }

    console.log("Filtered Packages:", packages);

    // 🔹 Send response
    res.status(200).json({ data: packages });
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
