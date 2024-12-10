import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./ProductSearch.css";

const ProductSearch = ({ onSelectedProductsChange, selectedProduct = [] }) => {
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  // Fetch products data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  // Update selected products, adding new ones with quantity 1
  const handleProductChange = (selected) => {
    if (!Array.isArray(selectedProduct)) {
      console.error("selectedProduct is not an array!");
      return;
    }

    // Keep existing selected products and add the new ones
    const updatedSelectedProducts = selected
      ? selected.map((item) => ({
          ...item,
          quantity: 1, // Initialize new products with quantity 1
        }))
      : [];

    // Merge selected products with previously selected ones without resetting quantities
    const mergedProducts = [
      ...selectedProduct,
      ...updatedSelectedProducts.filter(
        (newProduct) =>
          !selectedProduct.some(
            (existingProduct) => existingProduct.value === newProduct.value
          )
      ),
    ];

    // Pass updated list back to parent
    onSelectedProductsChange(mergedProducts);
  };

  // Remove product from the selection
  const removeProduct = (productToRemove) => {
    const updatedProducts = selectedProduct.filter(
      (product) => product.value !== productToRemove.value
    );
    onSelectedProductsChange(updatedProducts);
  };

  // Filter products based on search input
  const filterProducts = () => {
    return products.filter((product) =>
      product.NameToDisplay.toLowerCase().includes(productSearch.toLowerCase())
    );
  };

  // Prepare product options for the Select component
  const productOptions = filterProducts().map((product) => ({
    label: product.NameToDisplay,
    value: product.PKID,
    MRP: product.MRP,
    Stock: product.Stock,
  }));

  return (
    <div className="product-details-container">
      <div className="card">
        <h2 className="section-header">Product Selection</h2>
        <div className="search-container">
          <Select
            className="search-input"
            options={productOptions}
            onChange={handleProductChange}
            placeholder="🔍 Search for a product"
            isMulti
          />
          {Array.isArray(selectedProduct) && selectedProduct.length > 0 && (
            <div>
              <ul>
                {selectedProduct.map((product) => (
                  <li className="product-info" key={product.value}>
                    {product.label}
                    <button
                      className="remove-btn"
                      onClick={() => removeProduct(product)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
