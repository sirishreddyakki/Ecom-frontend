import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Laptops.css"; // Import styling

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (laptop) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.pid === laptop.pid);
      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      const updatedCart = [...prevCart, { ...laptop, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const toggleCart = () => {
    navigate("/user/cart");
  };

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

  return (
    <div className="laptops-container">
      <div className="nav-bar">
        <p className="nav-bar-title">Ecommerce App</p>
        <div className="nav-bar-cart" onClick={toggleCart}>
          <span className="cart-icon">CART🛒</span>
          <span className="cart-count">{cart.length}</span>
        </div>
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
                <p>Cost: ₹{laptop.pcost}</p>
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
    </div>
  );
};

export default Laptops;
