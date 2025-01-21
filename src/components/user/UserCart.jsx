import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserCart.css"; // Import styling for the cart

const UserCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (index, increment) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + increment;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1); // Remove item if quantity is zero
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.pcost * (item.quantity || 1), 0);

  const proceedToPayment = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add items to proceed to payment.");
      return;
    }
    // Redirect to payment or perform payment action
    alert("Proceeding to payment!");
  };

  const handleContinueShopping = (category) => {
    navigate(`/user/${category}`);
  };

  return (
    <div className="cart-container">
      
      {cart.length === 0 ? (
        <div className="error-msg">
            <p className="empty-cart">Your cart is empty. Add items to continue.</p>
            <button
                className="shop-more-btn"
                onClick={() => handleContinueShopping("mobiles")}
                >
                Shop Mobiles
                </button>
                <button
                className="shop-more-btn"
                onClick={() => handleContinueShopping("laptops")}
                >
                Shop Laptops
                </button>
        </div>
      ) : (
        <>
          <div className="cart">
            <div className="cart-title">
                <h1>Your Cart</h1>
            </div>
            <div className="cart-bill">
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Add/Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                        <td>{item.pname}</td>
                        <td>₹{item.pcost}</td>
                        <td>{item.quantity || 1}</td>
                        <td>₹{(item.pcost * (item.quantity || 1)).toFixed(2)}</td>
                        <td>
                            <button
                            className="quantity-btn-plus"
                            onClick={() => handleQuantityChange(index, 1)}
                            >
                            +
                            </button>
                            <button
                            className="quantity-btn-minus"
                            onClick={() => handleQuantityChange(index, -1)}
                            >
                            -
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="cart-summary">
                <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
                <button
                className="checkout-btn"
                onClick={proceedToPayment}
                disabled={cart.length === 0}
                >
                Proceed to Payment
                </button>
                <button
                className="shop-more-btn"
                onClick={() => handleContinueShopping("mobiles")}
                >
                Shop Mobiles
                </button>
                <button
                className="shop-more-btn"
                onClick={() => handleContinueShopping("laptops")}
                >
                Shop Laptops
                </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCart;
