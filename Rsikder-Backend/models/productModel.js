import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sku: { type: String },
  sku_id: { type: String },
  price: { type: Number}, // Base price if required
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "image",
    },
  ],
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  colors: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "color" },
      images: [
        {
          image: { type: String }, 
          cloudImageId: { type: String }
        },
      ],
      sizes: [
        {
          size: { type: mongoose.Schema.Types.ObjectId, ref: "size" }, // Reference to the size model
          price: { type: Number, required: true }, // Price for this size
        },
      ],
    },
  ],
  brand_name: { type: String },
  style_id: { type: String },
  popular: { type: Boolean },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
