import mongoose, { Schema } from "mongoose";

const CheckoutPartSchema = new Schema(
  {
    title: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    shippingCosts: [
      {
        location: { type: String, required: true },
        cost: { type: Number, required: true },
      },
    ],
    footer: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Checkoutpart ||
  mongoose.model("Checkoutpart", CheckoutPartSchema);