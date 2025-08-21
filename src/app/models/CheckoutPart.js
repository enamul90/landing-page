import mongoose, { Schema } from "mongoose";

const CheckoutPartSchema = new Schema(
  {
    title: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    shippingCosts: [{ type: String }],
    footer: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.CheckoutPart ||
  mongoose.model("CheckoutPart", CheckoutPartSchema);