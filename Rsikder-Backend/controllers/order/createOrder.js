import { validateAndCalculateCarts } from "../../helpers/orderHelpers.js";
import cartModel from "../../models/cartModel.js";
import orderModel from "../../models/orderModel.js";

// ------------------------------- Create Order -------------------------------
export const placeOrder = async (req, res) => {
  const { userId, cartIds, address, paymentDetails } = req.body;

  // console.log("--------------------");
  // console.log("req body", req.body);
  // process.exit();

  try {
    // Validate and recalculate totals to prevent tampering
    const { items: carts, total } = await validateAndCalculateCarts(
      cartIds,
      userId
    );

    // Create the order
    const newOrder = new orderModel({
      user: userId,
      carts: { user: carts.user, items: carts },
      total,
      address,
      paymentDetails: paymentDetails || {},
      status: "pending",
    });

    console.log("items:", carts);

    await newOrder.save();

    // Remove selected carts
    await cartModel.deleteMany({ _id: { $in: cartIds } });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
