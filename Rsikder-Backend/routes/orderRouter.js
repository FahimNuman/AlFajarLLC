import express from "express";
// import { createOrder } from "../controllers/order/orderController.js";
import { getOrderDetails } from "../controllers/order/getOrderDetails.js";
import { getUserOrders } from "../controllers/order/getUserOrders.js";
import { updateOrderStatus } from "../controllers/order/updateOrderStatus.js";
import { placeOrder } from "../controllers/order/createOrder.js";
import { getPlaceOrderDetails } from "../controllers/order/getPlaceOrderDetails.js";
import { getOrderList } from "../controllers/order/getOrderList.js";

const orderRouter = express.Router();


orderRouter.get("/list", getOrderList);
orderRouter.post("/details", getPlaceOrderDetails); // Create a new order
orderRouter.post("/create", placeOrder); // Create a new order
orderRouter.get("/user/:userId", getUserOrders); // Get all orders for a user
orderRouter.get("/:orderId", getOrderDetails); // Get order details
orderRouter.put("/:orderId/status", updateOrderStatus); // Update order status (Admin)


export default orderRouter;
