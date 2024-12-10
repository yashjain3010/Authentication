// Import the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");
const crypto = require("crypto");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
})

const Counter = mongoose.model("Counter", CounterSchema);

function generateAlphaChar(){
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

// Define a schema for the Customer model
const customerSchema = new mongoose.Schema(
  {
    swilId: { type: String, required: false, unique: true },
    crudoId: {
      type: String,
      required: false,
      unique: true,
      default: null,
    },
    // Define the 'fullname' field, which is a required string
    fullname: { type: String, required: true },

    // Define the 'email' field, which is a required string
    email: { type: String, required: true, trim: true },

    // Define the 'phoneNumber' field, which is a required string
    phoneNumber: { type: String, required: true, trim: true },

    // Define the 'alias' field, which is a required string
    alias: { type: String, required: true, unique: true },

    // Define the 'abhanumber' field, which is an optional number
    abhanumber: { type: Number, required: false },

    // Define the 'pincode' field, which is a required number
    pincode: { type: Number, required: true },

    // Define the 'station' field, which is a required string
    station: { type: String, required: true, trim: true },

    // Define the 'age' field, which is a required number
    age: { type: Number, required: false },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Active",
    },
  
    // Define the 'sex' field, which is a required string with specific allowed values
    sex: { type: String, enum: ["Male", "Female", "Other"], required: false },

    // Define the 'address' field, which is a required string
    address: { type: String, required: true },
    remarks: { type: String, required: false },
  },
  {
    timestamps: true,

    indexes: [
      { swilId: 1 },
      { crudoId: 1 },
      { alias: 1 },
      { email: 1 },
      { phoneNumber: 1 },
    ],
  }
);

customerSchema.pre("save", async function (next) {
  // Only generate crudoId if it's not already set
  if (!this.crudoId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "customerId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Ensure counter and seq are defined
      if (counter && counter.seq !== undefined) {
        // Generate a unique CrudoId in CR000001A format
        const randomAlpha = generateAlphaChar();
        this.crudoId = `CR${counter.seq
          .toString()
          .padStart(6, "0")}${randomAlpha}`;
      } else {
        // Fallback generation if counter fails
        const randomAlpha = generateAlphaChar();
        this.crudoId = `CR${Date.now()
          .toString()
          .slice(-6)
          .padStart(6, "0")}${randomAlpha}`;
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

customerSchema.statics.findBySwilId = function(swilId){
  return this.findOne({swilId});
}

customerSchema.statics.findByCrudoId = function(crudoId){
  return this.findOne({crudoId});
}

// Create a Mongoose model called 'Customer' based on the customerSchema
const Customer = mongoose.model("Customer", customerSchema);

// Export the Customer model to make it accessible in other modules
module.exports = Customer;
