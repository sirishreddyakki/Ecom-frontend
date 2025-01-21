import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/LaptopsAdmin.css";

const LaptopsAdmin = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/laptop", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLaptops(response.data); // Set the fetched laptop data
      } catch (err) {
        setError("Failed to fetch laptops.");
        console.error(err);
      }
    };

    fetchLaptops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/laptop/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLaptops(laptops.filter((laptop) => laptop.pid !== id)); // Remove deleted laptop from state
      alert("Laptop deleted successfully!");
    } catch (err) {
      alert("Failed to delete laptop: " + err.response?.data || err.message);
    }
  };

  const renderImage = (laptop) => {
    if (laptop.imageData) {
      return (
        <img
          src={`data:${laptop.imageType};base64,${laptop.imageData}`}
          alt={laptop.pname || "Laptop"}
        />
      );
    }
    return <p>Image not available</p>;
  };
  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <div className="laptop-adminpage">
        <div className="nav-bar">
          <p className="nav-bar-title">Ecommerce App</p>
          <div className="nav-bar-btns">
            <Link to="/admin/laptops/add" className="addlaptop-btn">
              Add Laptop
            </Link>
            <button className="cart-btn">Cart</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="laptops-admin">
          {error ? (
            <p>{error}</p>
          ) : laptops.length > 0 ? (
            <div className="laptop-container">
              {laptops.map((laptop) => (
                <div key={laptop.pid} className="laptop-item">
                  <div className="laptop-item-img">{renderImage(laptop)}</div>
                  <div className="laptop-item-details">
                    <h3>{laptop.pname}</h3>
                    <p>
                      <span>Cost:</span> <strong>₹{laptop.pcost}</strong>
                    </p>
                    <p>
                      <span>Quantity:</span> <strong>{laptop.pqty}</strong>
                    </p>
                  </div>
                  <div className="laptop-item-buttons">
                    <Link
                      to={`/admin/laptops/update/${laptop.pid}`}
                      className="update-btn"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(laptop.pid)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No laptops available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LaptopsAdmin;
