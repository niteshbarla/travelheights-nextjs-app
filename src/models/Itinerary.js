import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: [{ type: String }],
  days: [
    {
      heading: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  images: [{ type: String }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  otherInfo: { type: String },
  cost: { type: String, required: true },
});

export default mongoose.models.Itinerary ||
  mongoose.model("Itinerary", itinerarySchema);
