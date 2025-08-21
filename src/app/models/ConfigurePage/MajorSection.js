import mongoose from "mongoose";

const majorSectionSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, required: true },
    sliderTitle: { type: String, required: true },
    videoTitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    productTitle: { type: String, required: true },
    reviewTitle: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.MajorSection ||
  mongoose.model("MajorSection", majorSectionSchema);