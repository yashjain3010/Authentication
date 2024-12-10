// Import the fetchProduct function from the fetchData utility module
const { fetchProduct } = require("../utils/fetchData");

// Define an asynchronous function to handle the GET request for products
const getProducts = async (req, res) => {
  // Extract page number, page size, and search query from the request query parameters
  // Set default values if not provided: pageNo = 1, pageSize = 2, search = ''
  const { pageNo = 1, pageSize = -1, search = "" } = req.query;

  try {
    // Call fetchProduct to retrieve products based on page number, page size, and search query
    const products = await fetchProduct(pageNo, pageSize, search);

    // Respond with the fetched products as a JSON object
    res.json(products);
  } catch (error) {
    // Handle any errors during product fetching
    // Respond with a 500 status and an error message in JSON format
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
