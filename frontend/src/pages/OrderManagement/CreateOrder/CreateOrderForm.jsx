import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails/CustomerDetails"; // Component for customer info
import ProductSearch from "./ProductSearch/ProductSearch"; // Component for searching products
import OrderSummary from "./OrderSummary/OrderSummary"; // Component for displaying order summary
import ProductQuantity from "./ProductQuantity/ProductQuantity"; // Component for product quantity adjustment
import NavBar from "./TopBar/TopBar"; // Navigation bar component
import Button from "@mui/material/Button"; // Material UI Button component
import "./CreateOrderForm.css"; // CSS file for styling

const CreateOrderForm = () => {
  // State variables to store customer details, product list, address, and selected products
  const [customer, setCustomer] = useState(null); // Holds customer details
  const [productList, setProductList] = useState([]); // Holds list of added products
  const [fullAddress, setFullAddress] = useState(""); // Holds customer's full address
  const [selectedProduct, setSelectedProduct] = useState([]); // Holds selected products with quantities

  // Handles the change in selected products (product search result)
  const handleSelectedProductsChange = (products) => {
    setSelectedProduct(products);
    setProductList(products); // Update productList if needed for OrderSummary
  };

  // Handles the change in quantity of selected products
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = selectedProduct.map((product) =>
      product.value === productId
        ? { ...product, quantity: newQuantity } // Update the quantity of the specific product
        : product
    );

    setSelectedProduct(updatedProducts); // Update selectedProduct state

    // Sync updated selected products with productList
    setProductList(updatedProducts); // Keep productList in sync
  };

  // Handles the change in customer's address
  const handleAddressChange = (address) => {
    setFullAddress(address);
  };

  // Handles the update of customer details when modified in CustomerDetails component
  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  // Handles form submission and sends the order data to the server
  const handleSubmitOrder = async () => {
    // Create order data object to send to the backend
    const orderData = {
      customer: {
        customerId: customer.Value,
        name: customer.Party,
        address: customer.Address,
        phone: customer.Mobile,
        email: customer.Email,
        age: customer.Age,
        sex: customer.Sex,
      },
      products: productList.map((product) => ({
        productId: product.value,
        name: product.label,
        quantity: product.quantity,
        price: product.MRP,
      })),
      // Calculate the total MRP of all products in the order
      totalMRP: productList.reduce(
        (sum, product) => sum + product.MRP * product.quantity,
        0
      ),
    };

    console.log(orderData); // Debug: Log order data to console

    try {
      // Send order data to backend API
      const response = await fetch("http://localhost:3000/api/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json(); // Parse JSON response

      // Check if the response was successful
      if (response.ok) {
        alert("Order saved successfully"); // Display success message
      } else {
        alert("Failed to save order"); // Display error message if response is not okay
      }
    } catch (error) {
      // Handle errors (network issues, etc.)
      console.error("Error submitting order:", error);
      alert("Error submitting order"); // Display error message to user
    }
  };

  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      <div className="display">
        {" "}
        {/* Main container for the order form */}
        <div className="displaying">
          {" "}
          {/* Flexbox layout for the first section */}
          <CustomerDetails
            onAddressUpdate={handleAddressChange} // Pass address update handler to CustomerDetails
            onCustomerUpdate={handleCustomerUpdate} // Pass customer update handler to CustomerDetails
          />
          <OrderSummary
            customer={customer} // Pass customer data to OrderSummary
            productList={selectedProduct} // Pass selected product list to OrderSummary
          />
        </div>
        <ProductSearch
          selectedProduct={selectedProduct} // Pass selected products to ProductSearch
          onSelectedProductsChange={handleSelectedProductsChange} // Handle product selection changes
        />
        <ProductQuantity
          selectedProduct={selectedProduct} // Pass selected products to ProductQuantity
          onQuantityChange={handleQuantityChange} // Handle quantity changes for products
        />
        <Button
          variant="contained"
          onClick={handleSubmitOrder}
          disableElevation
        >
          Submit Order {/* Submit order button */}
        </Button>
      </div>
    </div>
  );
};

export default CreateOrderForm; // Export the OrderForm component for use in other parts of the app
