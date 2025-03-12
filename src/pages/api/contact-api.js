import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Verify Google reCAPTCHA

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

  const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });
  const recaptchaData = await recaptchaResponse.json();

  if (!recaptchaData.success) {
    return res.status(400).json({ message: "reCAPTCHA verification failed." });
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db("travelheights");
    const collection = db.collection("contacts");

    // Insert data
    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    client.close();
    return res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
