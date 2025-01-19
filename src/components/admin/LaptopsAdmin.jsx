import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/LaptopsAdmin.css'; // Use same styles as MobilesAdmin

const LaptopAdmin = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/laptop", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLaptops(response.data);  // Set fetched laptops data
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

  // Function to render images
  const renderImage = (laptop) => {
    if (laptop.imageData) {
      return (
        <img
          src={`data:${laptop.imageType};base64,${laptop.imageData}`}
          alt={laptop.pname}
        />
      );
    }
    return <p>Image not available</p>;
  };

  return (
    <div className="laptops-admin">
      {error && <p>{error}</p>}
      {laptops.length > 0 ? (
        <div>
          {laptops.map((laptop) => (
            <div key={laptop.pid} className="laptop-item">
              {/* Image on the left */}
              <div>{renderImage(laptop)}</div>

              {/* Details in the center */}
              <div className="laptop-details">
                <h3>{laptop.pname}</h3>
                <p><span className="label">Cost:</span> ₹{laptop.pcost}</p>
                <p><span className="label">Quantity:</span> {laptop.pqty}</p>
              </div>

              {/* Button group */}
              <div className="button-group">
                <Link to={`/admin/laptops/update/${laptop.pid}`} className="update-button">
                  Update
                </Link>
                <button onClick={() => handleDelete(laptop.pid)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading laptops...</p>
      )}

      {/* Add Laptop button */}
      <Link to="/admin/laptops/add" className="add-laptop-button">
        Add Laptop
      </Link>
    </div>
  );
};

export default LaptopAdmin;
