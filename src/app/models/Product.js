import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    stock: { type: Number, default: 0 },
    brand: { type: String },
    price: { type: Number, required: true },
    sellPrice: { type: Number },
    description: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    showOnLanding: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);