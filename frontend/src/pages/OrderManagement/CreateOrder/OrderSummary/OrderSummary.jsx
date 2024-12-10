// Import React to use JSX syntax and create the component
import React from "react";

// Import the CSS file for styling the OrderSummary component
import "./OrderSummary.css";

// OrderSummary component accepts 'customer' and 'productList' as props
const OrderSummary = ({ customer, productList }) => {
  // Calculate the total MRP (Maximum Retail Price) by summing the price of each product times its quantity
  const totalMRP = productList.reduce(
    (total, product) => total + product.MRP * product.quantity, // Multiply MRP by quantity for each product and sum the total
    0 // Initial value for the sum is 0
  );

  return (
    // Main container div for the OrderSummary component with a class for styling
    <div className="order-summary">
      {/* Heading for the Order Summary section */}
      <h3>Order Summary</h3>

      {/* Section to display customer details */}
      <div className="customer-details">
        {/* Customer name */}
        <p>
          <strong>Customer Name:</strong> {customer ? customer.Party : "N/A"}
          {/* If customer exists, display customer.Party, otherwise display "N/A" */}
        </p>
        {/* Customer contact number */}
        <p>
          <strong>Contact Number:</strong> {customer ? customer.Mobile : "N/A"}
          {/* If customer exists, display customer.Mobile, otherwise display "N/A" */}
        </p>
        {/* Customer email */}
        <p>
          <strong>Email:</strong> {customer ? customer.Email : "N/A"}
          {/* If customer exists, display customer.Email, otherwise display "N/A" */}
        </p>
        {/* Customer address */}
        <p>
          <strong>Address:</strong> {customer ? customer.Address : "N/A"}
          {/* If customer exists, display customer.Address, otherwise display "N/A" */}
        </p>
      </div>

      {/* Section to display the total MRP (Maximum Retail Price) */}
      <div className="total-mrp">
        <h4>Total MRP: ₹{totalMRP}</h4>
        {/* Display the total MRP value, formatted with the ₹ currency symbol */}
      </div>

      {/* Additional note section with a textarea for input */}
      <p>
        <strong>Additional Note</strong>
        <textarea className="texting" name="" id=""></textarea>
        {/* A textarea for adding additional notes, with class 'texting' for styling */}
      </p>
    </div>
  );
};

// Export the OrderSummary component so it can be used in other parts of the application
export default OrderSummary;
