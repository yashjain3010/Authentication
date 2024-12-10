// Import the User model to interact with the database for user-related operations
const User = require("../models/userModel");

// Import the jsonwebtoken module to handle token generation and verification
const jwt = require("jsonwebtoken");

// Import bcryptjs for hashing and comparing passwords
const bcrypt = require("bcryptjs");

// Controller function to handle user signup
const signup = async (req, res) => {
  // Extract name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // Create a new user in the database with the provided details
    const user = await User.create({ name, email, password });

    // Send a success response with the created user details
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    // Handle errors, such as database constraints or validation errors
    res.status(500).json({
      error: err.message,
    });
  }
};

// Controller function to handle user signin
const signin = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Find a user in the database with the given email
    const user = await User.findOne({ email });

    // If no user is found, send a 400 error response with a message
    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords do not match, send a 400 error response
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign(
      {
        userId: user._id, // Include user ID in the token payload
      },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: "10h" } // Set token expiration time
    );

    // Send a success response with the token
    res.json({
      message: "Login Successful",
      token,
    });
  } catch (err) {
    // Handle unexpected errors, such as server or database issues
    res.status(500).json({
      error: err.message,
    });
  }
};

// Export the signup and signin functions to be used in route handlers
module.exports = {
  signup,
  signin,
};
