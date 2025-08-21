import mongoose, { Schema } from "mongoose";

const CardSectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  productPartTitle: { type: String },
});

export default mongoose.models.CardSection ||
  mongoose.model("CardSection", CardSectionSchema);