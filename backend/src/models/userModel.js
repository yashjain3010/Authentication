// Import the mongoose library to define and work with schemas and models
const mongoose = require("mongoose");

// Import bcryptjs for hashing passwords
const bcrypt = require("bcryptjs");

// Define the schema for a user, specifying the structure and validation rules
const userSchema = new mongoose.Schema({
  // User's name (required field)
  name: { type: String, required: true },

  // User's email address (required field)
  email: { type: String, required: true },

  // User's password (required field)
  password: { type: String, required: true },
});

// Middleware to hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified; if not, skip this middleware
  if (!this.isModified("password")) return next();

  // Generate a salt for hashing the password
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the generated salt and update the password field
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware or save the document
  next();
});

// Create a Mongoose model named 'User' based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
