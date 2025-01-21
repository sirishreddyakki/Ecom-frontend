import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/MobilesAdmin.css";

const MobilesAdmin = () => {
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/mobile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMobiles(response.data); // Set the fetched mobile data
      } catch (err) {
        setError("Failed to fetch mobiles.");
        console.error(err);
      }
    };

    fetchMobiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/mobile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMobiles(mobiles.filter((mobile) => mobile.pid !== id)); // Remove deleted mobile from state
      alert("Mobile deleted successfully!");
    } catch (err) {
      alert("Failed to delete mobile: " + err.response?.data || err.message);
    }
  };

  const renderImage = (mobile) => {
    if (mobile.imageData) {
      return (
        <img
          src={`data:${mobile.imageType};base64,${mobile.imageData}`}
          alt={mobile.pname || "Mobile"}
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
      <div className="mobile-adminpage">
        <div className="nav-bar">
          <p className="nav-bar-title">Ecommerce App</p>
          <div className="nav-bar-btns">
            <Link to="/admin/mobiles/add" className="addmobile-btn">
              Add Mobile
            </Link>
            <button className="cart-btn">Cart</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="mobiles-admin">
          {error ? (
            <p>{error}</p>
          ) : mobiles.length > 0 ? (
            <div className="mobile-container">
              {mobiles.map((mobile) => (
                <div key={mobile.pid} className="mobile-item">
                  <div className="mobile-item-img">{renderImage(mobile)}</div>
                  <div className="mobile-item-details">
                    <h3>{mobile.pname}</h3>
                    <p>
                      <span>Cost:</span> <strong>₹{mobile.pcost}</strong>
                    </p>
                    <p>
                      <span>Quantity:</span> <strong>{mobile.pqty}</strong>
                    </p>
                  </div>
                  <div className="mobile-item-buttons">
                    <Link
                      to={`/admin/mobiles/update/${mobile.pid}`}
                      className="update-btn"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(mobile.pid)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No mobiles available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MobilesAdmin;
