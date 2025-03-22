import orderModel from "../../models/orderModel.js";


export const getOrderList = async (req, res) => {
  try {
    const orders = await orderModel.find(); // Fetch all orders
    res.status(200).json({
      success: true,
      message: "Order list fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching order list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order list",
      error: error.message,
    });
  }
};
