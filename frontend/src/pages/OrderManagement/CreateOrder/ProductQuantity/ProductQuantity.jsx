import React from "react";
import "./ProductQuantity.css"; // Import the CSS for styling

const ProductQuantity = ({ selectedProduct, onQuantityChange }) => {
  // Function to handle changes in product quantity
  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity >= 1) {
      // Ensure the minimum quantity is 1
      onQuantityChange(product.value, newQuantity);
    }
  };

  return (
    <div className="product-details-container">
      {/* Card Container */}
      <div className="card">
        {/* Section Header */}
        <h2 className="section-header">Product Quantity</h2>
        <div>
          {/* Check if there are selected products */}
          {selectedProduct && selectedProduct.length > 0 ? (
            selectedProduct.map((product) => (
              <div key={product.value}>
                <div>
                  <div className="display-1">
                    {/* Product Details Section */}
                    <div className="product-details">
                      <div>
                        <h3>{product.label}</h3> {/* Display product name */}
                      </div>
                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        {/* Decrease quantity button */}
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity - 1)
                          }
                          disabled={product.quantity <= 1} // Disable if quantity is 1
                        >
                          -
                        </button>
                        {/* Input field for quantity */}
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product,
                              parseInt(e.target.value) || 1 // Ensure valid number input
                            )
                          }
                          min="1"
                        />
                        {/* Increase quantity button */}
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Display product's MRP */}
                    <div>
                      <p>₹{product.MRP}</p>
                    </div>
                  </div>
                  {/* Display available stock */}
                  <p className="stock">Stock Available: {product.Stock}</p>
                </div>
              </div>
            ))
          ) : (
            // Fallback when no products are selected
            <p>No products selected</p>
          )}
        </div>
        {/* Total MRP Section */}
        {selectedProduct && selectedProduct.length > 0 && (
          <div className="total-section">
            <h3>
              Total MRP: ₹
              {selectedProduct
                .reduce(
                  (sum, product) => sum + product.MRP * product.quantity, // Calculate total MRP
                  0
                )
                .toFixed(2)}{" "}
              {/* Display total with two decimal places */}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductQuantity;
