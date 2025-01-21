// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./styles/Mobiles.css"; // Import styling

// const Mobiles = () => {
//   const [mobiles, setMobiles] = useState([]);
//   const [error, setError] = useState("");
//   const [cart, setCart] = useState([]);
//   const [cartVisible, setCartVisible] = useState(false);

//   useEffect(() => {
//     const fetchMobiles = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/user/mobile", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setMobiles(response.data);
//       } catch (err) {
//         setError("Failed to fetch mobiles.");
//         console.error(err);
//       }
//     };

//     fetchMobiles();
//   }, []);

//   // Add mobile to the cart
//   const addToCart = (mobile) => {
//     setCart((prevCart) => {
//       const existingIndex = prevCart.findIndex((item) => item.pid === mobile.pid);
//       if (existingIndex !== -1) {
//         const updatedCart = [...prevCart];
//         updatedCart[existingIndex].quantity += 1;
//         return updatedCart;
//       }
//       return [...prevCart, { ...mobile, quantity: 1 }];
//     });
//   };

//   // Increase quantity
//   const incrementQuantity = (index) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       updatedCart[index].quantity += 1;
//       return updatedCart;
//     });
//   };

//   // Decrease quantity and remove if it reaches 0
//   const decrementQuantity = (index) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       if (updatedCart[index].quantity > 1) {
//         updatedCart[index].quantity -= 1;
//       } else {
//         updatedCart.splice(index, 1); // Remove the item if quantity reaches 0
//       }
//       return updatedCart;
//     });
//   };

//   // Calculate total cost
//   const calculateTotal = () =>
//     cart.reduce((total, item) => total + item.pcost * item.quantity, 0);

//   // Function to render images
//   const renderImage = (mobile) => {
//     if (mobile.imageData) {
//       return (
//         <img
//           src={`data:${mobile.imageType};base64,${mobile.imageData}`}
//           alt={mobile.pname}
//           className="mobile-image"
//         />
//       );
//     }
//     return <p>Image not available</p>;
//   };

//   // Cart toggle visibility
//   const toggleCart = () => {
//     setCartVisible((prevState) => !prevState);
//   };

//   return (
//     <div className="mobiles-container">
//       {/* Nav Bar */}
//       <div className="nav-bar">
//         <p className="nav-bar-title">Ecommerce App</p>
//         <div className="nav-bar-cart" onClick={toggleCart}>
//           <span className="cart-icon">CART🛒</span>
//           <span className="cart-count">{cart.length}</span>
//         </div>
//       </div>

//       <h1>Mobiles</h1>
//       {error && <p className="error-message">{error}</p>}
//       {mobiles.length > 0 ? (
//         <div className="mobiles-list">
//           {mobiles.map((mobile) => (
//             <div key={mobile.pid} className="mobile-card">
//               {renderImage(mobile)}
//               <div className="mobile-details">
//                 <h3>{mobile.pname}</h3>
//                 <p>Cost: ₹{mobile.pcost}</p>
//                 <p>Quantity: {mobile.pqty}</p>
//               </div>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => addToCart(mobile)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading mobiles...</p>
//       )}

//       {/* Cart Modal */}
//       {cartVisible && (
//         <div className="cart-modal">
//           <div className="cart-box">
//             <p className="cart-title">Your Cart</p>
//             <div className="cart-items">
//               {cart.length === 0 ? (
//                 <p>No items in cart</p>
//               ) : (
//                 cart.map((mobile, index) => (
//                   <div key={index} className="cart-item">
//                     <span>{mobile.pname}</span>
//                     <span>Cost: ₹{mobile.pcost}</span>
//                     <span>Quantity: {mobile.quantity}</span>
//                     <div className="quantity-controls">
//                       <button
//                         onClick={() => decrementQuantity(index)}
//                         className="quantity-btn"
//                       >
//                         -
//                       </button>
//                       <button
//                         onClick={() => incrementQuantity(index)}
//                         className="quantity-btn"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="cart-footer">
//               <span>Total Cost: ₹{calculateTotal()}</span>
//               <button
//                 onClick={() => alert("Proceeding to payment...")}
//                 className="proceed-to-payment-btn"
//                 disabled={cart.length === 0} // Disable if cart is empty
//               >
//                 Proceed to Payment
//               </button>
//               <button onClick={toggleCart} className="close-cart-btn">
//                 Close
//               </button>
//             </div>
//           </div>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Mobiles;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Mobiles.css"; // Import styling

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const navigate = useNavigate();

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

  const addToCart = (mobile) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, mobile];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  const toggleCart = () => {
    navigate("/user/cart"); // Navigate to Cart page
  };

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

  return (
    <div className="mobiles-container">
      <div className="nav-bar">
        <p className="nav-bar-title">Ecommerce App</p>
        <div className="nav-bar-cart" onClick={toggleCart}>
          <span className="cart-icon">CART🛒</span>
          <span className="cart-count">{cart.length}</span>
        </div>
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
    </div>
  );
};

export default Mobiles;
