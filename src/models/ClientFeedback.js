import mongoose from "mongoose";

const ClientFeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ClientFeedback ||
  mongoose.model("ClientFeedback", ClientFeedbackSchema);
