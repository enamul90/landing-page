import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    products: [
      {
        productId: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
        sellPrice: Number,
        size: String,
        color: String,
      },
    ],
    shippingCost: String,
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "new",
        "hold",
        "incomplete",
        "ongoing",
        "complete",
        "cancel",
        "failed",
      ],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", orderSchema);