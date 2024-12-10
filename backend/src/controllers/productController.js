// Import the fetchProduct function from the fetchData utility module
const { fetchProduct } = require("../utils/fetchData");

// Define an asynchronous function to handle the GET request for products
const getProducts = async (req, res) => {
  const { pageNo = 1, pageSize = -1, search = "" } = req.query;

  try {
    const products = await fetchProduct(pageNo, pageSize, search);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Export the getProducts function to make it available for other modules
module.exports = {
  getProducts,
};
