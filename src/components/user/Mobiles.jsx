import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Mobiles.css';  // Import styling

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/mobile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMobiles(response.data);
      } catch (err) {
        setError("Failed to fetch mobiles.");
        console.error(err);
      }
    };

    fetchMobiles();
  }, []);

  // Add mobile to the cart
  const addToCart = (mobile) => {
    setCart((prevCart) => [...prevCart, mobile]);
  };

  // Function to render images
  const renderImage = (mobile) => {
    if (mobile.imageData) {
      return (
        <img
          src={`data:${mobile.imageType};base64,${mobile.imageData}`}
          alt={mobile.pname}
          className="mobile-image"
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
    <div className="mobiles-container">
      {/* Cart Button */}
      <div className="cart-container" onClick={toggleCart}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cart.length}</span>
      </div>

      <h1>Mobiles</h1>
      {error && <p className="error-message">{error}</p>}
      {mobiles.length > 0 ? (
        <div className="mobiles-list">
          {mobiles.map((mobile) => (
            <div key={mobile.pid} className="mobile-card">
              {renderImage(mobile)}
              <div className="mobile-details">
                <h3>{mobile.pname}</h3>
                <p>Cost: ₹{mobile.pcost}</p>
                <p>Quantity: {mobile.pqty}</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(mobile)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading mobiles...</p>
      )}

      {/* Cart Modal */}
      {cartVisible && (
        <div className="cart-modal">
          <h2>Your Cart</h2>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map((mobile, index) => (
                <div key={index} className="cart-item">
                  <span>{mobile.pname}</span>
                  <span>Cost: ₹{mobile.pcost}</span>
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

export default Mobiles;
