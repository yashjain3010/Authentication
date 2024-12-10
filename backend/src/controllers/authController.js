// Import Modules
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Controller function to handle user signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Controller function to handle user signin
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({
      message: "Login Successful",
      token,
    });
  } catch (err) {
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
