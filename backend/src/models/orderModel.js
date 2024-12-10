// Import the mongoose library to define and work with schemas and models
const mongoose = require("mongoose");

// Define the schema for an order, specifying the structure and validation rules
const orderSchema = new mongoose.Schema({
  // Customer details object
  customer: {
    customerId: { type: Number, required: true },
    // Customer's name (required field)
    name: { type: String, required: true },

    // Customer's email address (required field)
    email: { type: String, required: true },

    // Customer's phone number (required field)
    phone: { type: Number, required: true },

    // Customer's address (required field)
    address: { type: String, required: true },

    // Customer's age (optional field)
    age: { type: Number, required: true },

    // Customer's gender with limited options (optional field)
    sex: { type: String, enum: ["Male", "Female", "Other"], required: true },

    // Customer's ABHA (Ayushman Bharat Health Account) number (optional field)
    abhanumber: { type: Number },
  },

  // Array of products included in the order
  products: [
    {
      // Unique identifier for the product (required field)
      productId: { type: Number, required: true },

      // Name of the product (required field)
      name: { type: String, required: true },

      // Quantity of the product ordered (required field)
      quantity: { type: Number, required: true },

      // Price of the product (required field)
      price: { type: Number, required: true },
    },
  ],

  // Total Maximum Retail Price (MRP) for the order (required field)
  totalMRP: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, index: -1 },
});

// Create a Mongoose model named 'Order' based on the orderSchema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model for use in other parts of the application
module.exports = Order;
