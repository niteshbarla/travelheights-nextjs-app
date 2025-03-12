import { MongoClient } from "mongodb";
import axios from "axios";

const uri = process.env.MONGODB_URI; // Ensure you have this environment variable set
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const RECAPTCHA_SECRET_KEY = "6Lc63tUqAAAAAHkuJgem_frvXZ8fB7rFtwpqbyFj"; // Your reCAPTCHA secret key

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      fullName,
      email,
      phone,
      destination,
      travelDate,
      duration,
      travelers,
      hotelType,
      message,
      recaptchaToken, // Assuming the reCAPTCHA token is sent from the frontend
    } = req.body;

    // Validate reCAPTCHA token
    try {
      const recaptchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
      );

      if (!recaptchaResponse.data.success) {
        return res
          .status(400)
          .json({ message: "reCAPTCHA validation failed." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to validate reCAPTCHA.", error });
    }

    // Proceed with form submission if reCAPTCHA validation is successful
    try {
      await client.connect();
      const database = client.db("travelheights"); // Replace with your database name
      const collection = database.collection("formSubmissions");

      const result = await collection.insertOne({
        fullName,
        email,
        phone,
        destination,
        travelDate,
        duration,
        travelers,
        hotelType,
        message,
        submittedAt: new Date(),
      });

      res.status(201).json({ message: "Form submitted successfully!", result });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit form.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
