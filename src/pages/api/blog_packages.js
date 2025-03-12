import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db(); // Specify your database name if required: client.db("yourDatabaseName")
      const { keywords } = req.query;

      const keywordArray = keywords ? keywords.split(",") : [];
  
      const packages = await db
        .collection("tour_packages")
        .find({ keywords: { $in: keywordArray } })
        .limit(4)
        .toArray();

      res.status(200).json({ packages });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
