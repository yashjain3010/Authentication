// Import required modules
const { fetchCustomer, fetchCustomerOrders } = require("../utils/fetchData");
const axios = require("axios");
const Customer = require("../models/customerModel");

// Function to sync customer data with Swil ERP

const syncCustomerDataFromSwilERP = async () => {
  try {
    let pageNo = 1;
    let pageSize = 100;
    let hasMoreCustomers = true;

    while (hasMoreCustomers) {
      const swilCustomers = await fetchCustomer(pageNo, pageSize);

      if (!swilCustomers || swilCustomers.length === 0) {
        hasMoreCustomers = false;
        break;
      }

      for (const swilCustomer of swilCustomers) {
        const existingCustomer = await Customer.findOne({
          swilId: swilCustomer.PKID,
        });

        const customerData = {
          swilId: swilCustomer.PKID,
          fullname: swilCustomer.Party,
          email:
            swilCustomer.Email ||
            `${swilCustomer.Party.replace(
              /\s+/g,
              ""
            ).toLowerCase()}@example.com`,
          phoneNumber: swilCustomer.Mobile || "0000000000",
          alias: swilCustomer.Alias || generateAlias(swilCustomer.Party),
          pincode: swilCustomer.Pincode
            ? parseInt(swilCustomer.Pincode)
            : 0,
          station: swilCustomer.Station || "UNKNOWN",
          address: swilCustomer.Address || "NO ADDRESS",
          status: swilCustomer.Status === "Active" ? "Active" : "Inactive",
          age: swilCustomer.Age || 0,
          sex: swilCustomer.Sex || "Other",
          remarks: swilCustomer.Remarks || "NO REMARKS",
        };

        if (!existingCustomer) {
          const newCustomer = new Customer(customerData);
          await newCustomer.save();
          console.log(`Customer created: ${newCustomer.fullname}`);
        } else {
          Object.assign(existingCustomer, customerData);
          await existingCustomer.save();
          console.log(`Customer updated: ${existingCustomer.fullname}`);
        }
      }
      pageNo++;
    }
    console.log("Customer sync completed");
    return true;
  } catch (error) {
    console.error("Error syncing customer data:", error);
    throw error;
  }
};

const generateAlias = (fullname) => {
  const sanitizedName = fullname.replace(/\s+/g, "").toLowerCase();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${sanitizedName}_${randomSuffix}`;
};

const getCustomers = async (req, res) => {
  // Extract page number, page size, and search query from the request query parameters
  // Default values: pageNo = 1, pageSize = -1 (no limit), search = empty string
  const { pageNo = 1, pageSize = -1, search = "" } = req.query;

  try {
    // Fetch customers based on the provided filters (pagination and search)
    const customers = await fetchCustomer(pageNo, pageSize, search);

    // Send the fetched customers as a JSON response
    res.json(customers);
  } catch (error) {
    // Handle any errors during the customer fetching process
    res.status(500).json({
      message: "Error fetching customers", // User-friendly error message
      error: error.message, // Detailed error information
    });
  }
};

// Define an asynchronous function to handle the creation of a new customer
const createCustomer = async (req, res) => {
  try {
    // Extract customer details from the request body
    const {
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      abhanumber,
      age,
      sex,
      address,
    } = req.body;

    // Construct the customer data object to send to the Swil ERP API
    const swilERPCustomerData = {
      Address: address,
      Customer: fullname,
      Email: email,
      Mobile: phoneNumber,
      Alias: alias,
      Pincode: pincode,
      Station: station.trim().toUpperCase(),
    };

    // Send a POST request to the Swil ERP API to create a new customer
    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/master/customer/CreateCustomerMobile",
      swilERPCustomerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    );

    console.log("Swil ERP Response:", JSON.stringify(response.data, null, 2));

    // Extract the Swil Customer ID from the API response
    const swilId =
      response.data.PKID ||
      response.data.Id ||
      response.data.ID ||
      response.data.id;

    // Throw an error if the Swil Customer ID is not received
    if (!swilId) {
      throw new Error("Failed to receive Swil Customer ID");
    }

    // Create a new customer record in the database
    const newCustomer = new Customer({
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      age,
      sex,
      address,
      abhanumber,
      swilId,
    });

    // Save the new customer to the database
    try {
      await newCustomer.save();
    } catch (dbError) {
      console.error("Database save error:", dbError);
      throw new Error("Failed to save customer to the database.");
    }

    // Respond with the created customer and Swil ERP data
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
      swilERPCustomerData: response.data,
    });
  } catch (error) {
    // Handle any errors during customer creation
    res.status(500).json({
      message: "Error creating customer",
      error: error.message,
    });
  }
};

// Define an asynchronous function to handle customer updates
const updateCustomer = async (req, res) => {
  try {
    // Extract updated customer details from the request body
    const {
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      age,
      sex,
      address,
      swilId,
    } = req.body;

    // Construct the customer data object for the Swil ERP API update request
    const swilERPUpdateCustomerData = {
      PKID: swilId,
      Address: address,
      Customer: fullname,
      Email: email,
      Mobile: phoneNumber,
      Alias: alias,
      Pincode: pincode,
      Station: station,
    };

    console.log(swilERPUpdateCustomerData);

    // Send a POST request to update customer data in the Swil ERP API
    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/master/customer/UpdateMobile",
      swilERPUpdateCustomerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    );

    // Update the customer record in the database
    const updatedCustomer = await Customer.findOneAndUpdate(
      { swilId: swilId },
      {
        fullname,
        email,
        phoneNumber,
        alias,
        pincode,
        station,
        age,
        sex,
        address,
      },
      { new: true, runValidators: true } // Ensure updated data is validated
    );

    // Return 404 if no customer is found for the given Swil ID
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    console.log(swilERPUpdateCustomerData);

    // Respond with the updated customer and Swil ERP data
    res.status(201).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
      swilERPUpdateCustomerData: response.data,
    });
  } catch (error) {
    // Handle any errors during customer update
    res.status(500).json({
      message: "Error updating customer",
      error: error.message,
    });
  }
};

// Define an asynchronous function to handle fetching orders for a specific customer
const getCustomerOrders = async (req, res) => {
  // Extract the customerId from the request parameters
  const customerId = req.params.customerId;

  try {
    // Validate that the customerId is provided
    if (!customerId) {
      return res.status(400).json({
        message: "Customer ID is required",
      });
    }

    // Fetch customer orders using the fetchCustomerOrders function
    const customerOrders = await fetchCustomerOrders(customerId);

    // Respond with the fetched orders
    res.json({
      message: "Customer orders fetched successfully",
      ordersCount: customerOrders.length, // Include the total number of orders
      orders: customerOrders, // Include the list of orders
    });
  } catch (error) {
    // Handle any errors during order fetching
    res.status(500).json({
      message: "Error fetching customer orders",
      error: error.message,
    });
  }
};

const syncCustomer = async (req,res) => {
  try{
    const syncResult = await syncCustomerDataFromSwilERP();
    res.status(200).json({
      message: "Customer data sync successful",
      timeStamp: new Date().toISOString(),
      result: syncResult,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error syncing customer data",
      error: error.message,
    });
  }
}

// Export the functions to make them available to other modules
module.exports = {
  getCustomers,
  getCustomerOrders,
  createCustomer,
  updateCustomer,
  syncCustomer,
};
