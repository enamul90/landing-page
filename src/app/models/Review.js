import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  image: { type: String, required : true},
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);