import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Laptops.css';  // Import separate styling file if necessary

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/laptop", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLaptops(response.data);
      } catch (err) {
        setError("Failed to fetch laptops.");
        console.error(err);
      }
    };

    fetchLaptops();
  }, []);

  // Add laptop to the cart
  const addToCart = (laptop) => {
    setCart((prevCart) => [...prevCart, laptop]);
  };

  // Function to render images
  const renderImage = (laptop) => {
    if (laptop.imageData) {
      return (
        <img
          src={`data:${laptop.imageType};base64,${laptop.imageData}`}
          alt={laptop.pname}
          className="laptop-image"
        />
      );
    }
    return <p>Image not available</p>;
  };

  // Cart toggle visibility
  const toggleCart = () => {
    setCartVisible((prevState) => !prevState);
  };

  return (
    <div className="laptops-container">
      {/* Cart Button */}
      <div className="cart-container" onClick={toggleCart}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cart.length}</span>
      </div>

      <h1>Laptops</h1>
      {error && <p className="error-message">{error}</p>}
      {laptops.length > 0 ? (
        <div className="laptops-list">
          {laptops.map((laptop) => (
            <div key={laptop.pid} className="laptop-card">
              {renderImage(laptop)}
              <div className="laptop-details">
                <h3>{laptop.pname}</h3>
                <p>Cost: ${laptop.pcost}</p>
                <p>Quantity: {laptop.pqty}</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(laptop)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading laptops...</p>
      )}

      {/* Cart Modal */}
      {cartVisible && (
        <div className="cart-modal">
          <h2>Your Cart</h2>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map((laptop, index) => (
                <div key={index} className="cart-item">
                  <span>{laptop.pname}</span>
                  <span>Cost: ₹{laptop.pcost}</span>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <button onClick={toggleCart} className="close-cart-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laptops;
