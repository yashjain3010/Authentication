// Import the Express framework to create a router for handling authentication routes
const express = require("express");

// Import the signup and signin functions from the authController
const { signup, signin } = require("../controllers/authController");

// Create a new router instance for defining authentication-related routes
const router = express.Router();

// Define the route for user signup
// This route handles POST requests to "/signup" and invokes the signup function from the controller
router.post("/signup", signup);

// Define the route for user signin
// This route handles POST requests to "/signin" and invokes the signin function from the controller
router.post("/signin", signin);

// Export the router to be used in the main app or other modules
module.exports = router;
