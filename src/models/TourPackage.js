import mongoose from "mongoose";

const TourPackageSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  price: String,
  packagetype: String,
  image: String,
});

export default mongoose.models.TourPackage ||
  mongoose.model("TourPackage", TourPackageSchema);
