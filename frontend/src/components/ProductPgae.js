import React, { useState, useEffect } from 'react';
import './ProductPage.css';
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedColor && selectedSize) {
      // Perform the action to add the selected product to the cart here
      console.log(`Product added to cart: ${selectedProduct.name}, Color: ${selectedColor}, Size: ${selectedSize}`);
    } else {
      alert('Please select a product, color, and size before adding to cart.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold underline">Product Page</h2>
      {products.map((product) => (
        <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', flex : 1 , flexDirection :'row' }}>
          <h3>{product.name}</h3>
          <div>
            <label>Select Color:</label>
            <select onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Select a color</option>
              {product.colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Size:</label>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select a size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
