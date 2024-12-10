// Import the Express framework to create a router for handling order-related routes
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the createOrder function from the orderController
const { createOrder, orderDetails } = require("../controllers/orderController");
const { orderFulfillmentList, trackOrderList, orderStatusList } = require("../controllers/orderStatus");

// Define the route for creating an order
// This route handles POST requests to "/order" and invokes the createOrder function from the controller
router.post("/createorder", createOrder);
router.get("/orderdetails", orderDetails);
router.get("/orderfulfillment", orderFulfillmentList);
router.get("/orderstatus", orderStatusList);
router.get("/trackorder", trackOrderList);

// Export the router to be used in the main app or other modules
module.exports = router;
