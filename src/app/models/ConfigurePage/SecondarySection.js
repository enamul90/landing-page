import mongoose, { Schema } from "mongoose";

const secondarySectionSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    type: {
      type: String,
      enum: ["List item", "Single image", "Text editor"],
      required: true,
    },
    rank: Number,
    showOnLanding: { type: Boolean, default: true },
    contentType: {
      type: String,
      enum: ["list", "image", "html"],
      required: true,
    },
    content: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.models.SecondarySection ||
  mongoose.model("SecondarySection", secondarySectionSchema);