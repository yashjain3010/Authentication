import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Import the `X` icon from the `lucide-react` library
import "./ProductDetails.css"; // Import the CSS file for styling

const ProductDetails = ({ onProductListUpdate }) => {
  // State to store available products
  const [products, setProducts] = useState([]);
  // State to store the user's search input
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the list of selected products
  const [selectedProducts, setSelectedProducts] = useState([]);
  // State to manage quantities for each selected product
  const [quantities, setQuantities] = useState({});

  // Handle search input change and update the search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add a product to the selected list and initialize its quantity
  const addProduct = (productName) => {
    if (!selectedProducts.includes(productName)) {
      setSelectedProducts([...selectedProducts, productName]);
      setQuantities((prev) => ({ ...prev, [productName]: 1 }));
    }
  };

  // Remove a product from the selected list and update parent component
  const removeProduct = (productName) => {
    setSelectedProducts(selectedProducts.filter((p) => p !== productName));
    const newQuantities = { ...quantities };
    delete newQuantities[productName];
    setQuantities(newQuantities);

    // Notify the parent component of the updated product list
    onProductListUpdate(
      selectedProducts
        .filter((p) => p !== productName)
        .map((p) => ({
          name: p,
          quantity: quantities[p],
          price: products.find((prod) => prod.name === p)?.price || 0,
        }))
    );
  };

  // Update the quantity of a product within the stock limits
  const updateQuantity = (productName, change) => {
    const newQuantity = Math.max(1, (quantities[productName] || 1) + change);
    const product = products.find((p) => p.name === productName);

    if (product && newQuantity <= product.stock) {
      setQuantities((prev) => ({
        ...prev,
        [productName]: newQuantity,
      }));

      // Update parent component with new product list
      const updatedProducts = selectedProducts.map((p) => ({
        name: p,
        quantity: p === productName ? newQuantity : quantities[p],
        price: products.find((prod) => prod.name === p)?.price || 0,
      }));
      onProductListUpdate(updatedProducts);
    }
  };

  // Calculate the total price of all selected products
  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [product, quantity]) => {
      const productPrice = products.find((p) => p.name === product)?.price || 0;
      return total + productPrice * quantity;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Product Selection Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Search Product*</h2>
        <div className="relative">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search for medicines"
            className="w-full p-3 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Search icon */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            🔍
          </span>
        </div>

        {/* Selected products display */}
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedProducts.map((product) => (
            <div
              key={product}
              className="bg-[#A67B7B] text-white px-3 py-1.5 rounded-md flex items-center gap-2"
            >
              {product}
              {/* Button to remove the product */}
              <button onClick={() => removeProduct(product)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Quantity Section */}
      {selectedProducts.length > 0 && (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Product Quantity</h2>
          <div className="space-y-6">
            {selectedProducts.map((productName) => {
              const product = products.find((p) => p.name === productName);
              return (
                <div key={productName} className="grid grid-cols-1 gap-4">
                  {/* Product details */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{productName}</p>
                      <p className="text-sm text-gray-500">
                        Stock Availability: {product?.stock}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(productName, -1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={quantities[productName] || 1}
                          className="w-12 h-8 text-center border rounded-md"
                          readOnly
                        />
                        <button
                          onClick={() => updateQuantity(productName, 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      {/* Product price */}
                      <span className="text-gray-600 min-w-[80px] text-right">
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* MRP Total */}
            <div className="flex justify-between pt-4 border-t mt-4">
              <span className="font-medium">MRP Total</span>
              <span className="font-medium">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
