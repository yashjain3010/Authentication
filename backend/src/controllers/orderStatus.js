const {fetchOrderFulfillmentList,fetchAllStatusList,fetchTrackOrderofCustomer} = require('../utils/fetchData');

const orderFulfillmentList = async (req, res) => {
  try {
    const orderFulfillmentData = await fetchOrderFulfillmentList();
    
    // Log the number of items retrieved
    console.log(`Retrieved ${orderFulfillmentData.length} order fulfillment items`);
    
    res.json(orderFulfillmentData);
  } catch (error) {
    console.error("Error fetching order fulfillment", error);
    res.status(500).json({
      message: "Error fetching order fulfillment",
      error: error.message,
    });
  }
};

const orderStatusList = async (req, res) => {
    try {
        const orderStatusListData = await fetchAllStatusList();
        
        // Log the number of items retrieved
        console.log(`Retrieved ${orderStatusListData.length} order status list items`);
        
        res.json(orderStatusListData);
    } catch (error) {
        console.error("Error fetching order status list", error);
        res.status(500).json({
        message: "Error fetching order status list",
        error: error.message,
        });
    }
}

const trackOrderList = async (req, res) => {
  try {
    const trackOrderListData = await fetchTrackOrderofCustomer();
    console.log(trackOrderListData); // Log the actual data
    res.json(trackOrderListData);
  } catch (error) {
    console.error("Error fetching track order list", error);
    res.status(500).json({
      message: "Error fetching track order list",
      error: error.message,
    });
  }
};

module.exports = {
    orderFulfillmentList,
    orderStatusList,
    trackOrderList
}