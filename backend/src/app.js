// Import necessary modules
const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const customerproductRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors"); 
require("dotenv").config(); 

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Retrieve MongoDB connection URI from environment variables
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  })
  .then(() => console.log("Connected to MongoDB")) // Log successful connection
  .catch((error) => console.error("MongoDB connection error:", error)); // Handle and log connection errors

// Use the orderRoutes for all routes prefixed with "/api"
app.use("/api", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", customerproductRoutes);

// Define the server's port, using the value from environment variables or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


