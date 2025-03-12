import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true },
  keywords: { type: String },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
