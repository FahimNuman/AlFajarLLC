import mongoose from "mongoose";
import { cartSchema } from "./cartModel.js";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  carts: [cartSchema],
  total: { type: Number, required: true },
  paymentDetails: {
    method: {
      type: String,
      required: true,
      enum: ["COD", "Credit Card", "PayPal", "Stripe", "AuthorizeNet"],
    },
    transactionId: { type: String },
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
