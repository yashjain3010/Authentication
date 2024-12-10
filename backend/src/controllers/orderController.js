//Import required modules
const Order = require("../models/orderModel");
const axios = require("axios");
const { fetchOrderDetails } = require("../utils/fetchData");

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const { customer, products, totalMRP } = req.body;
    const newOrder = new Order({ customer, products, totalMRP });
    await newOrder.save();

    const prodDtl = [];
    for(const product of products){
      const {productId,quantity,price} = product;
      prodDtl.push({
        Batch: "ABC",
        PklotId: 0,
        FkProdID: productId,
        MRP: price * quantity,
        Qty: quantity,
        QtyUnit: 1,
        Rate: price,
      });
    }
   
    const swilERPData = {
      ApplyPromotion: false,
      DraftMode: 0,
      FkPartyID: customer.customerId,
      FkReferByID: 0,
      FkSalesPerID: 0,
      FkSeriesID: 10000013,
      Party: "",
      ProdDtl: prodDtl,
    };

    // Make a POST request to the SwilERP API to create a new sales order
    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/transaction/salesorder/CreateSalesOrdMobile",
      swilERPData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    )

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      swilERPResponse: response.data,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Error creating order",
      error: err.message,
    });
  }
};

const orderDetails = async (req, res) => {
  const { id, FkID } = req.query;

  try {
    const orderDetail = await fetchOrderDetails(id, FkID);
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order details", 
      error: error.message,
    });
  }
};


// Export the createOrder function to be used in route handlers
module.exports = {
  createOrder,
  orderDetails,
};
