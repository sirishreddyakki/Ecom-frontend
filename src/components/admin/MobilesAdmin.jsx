import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/MobilesAdmin.css'; // Import the updated styles

const MobilesAdmin = () => {
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/mobile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMobiles(response.data);  // Set the fetched mobile data
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
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setMobiles(mobiles.filter((mobile) => mobile.pid !== id)); // Remove deleted mobile from state
      alert("Mobile deleted successfully!");
    } catch (err) {
      alert("Failed to delete mobile: " + err.response?.data || err.message);
    }
  };

  // Function to render images
  const renderImage = (mobile) => {
    if (mobile.imageData) {
      return (
        <img
          src={`data:${mobile.imageType};base64,${mobile.imageData}`}
          alt={mobile.pname}
        />
      );
    }
    return <p>Image not available</p>;
  };

  return (
    <div className="mobiles-admin">
      {error && <p>{error}</p>}
      {mobiles.length > 0 ? (
        <div>
          {mobiles.map((mobile) => (
            <div key={mobile.pid} className="mobile-item">
              {/* Image on the left */}
              <div>{renderImage(mobile)}</div>

              {/* Details in the center */}
              <div className="mobile-details">
                <h3>{mobile.pname}</h3>
                <p><span className="label">Cost:</span> ₹{mobile.pcost}</p>
                <p><span className="label">Quantity:</span> {mobile.pqty}</p>
              </div>

              {/* Button group */}
              <div className="button-group">
                <Link to={`/admin/mobiles/update/${mobile.pid}`} className="update-button">
                  Update
                </Link>
                <button onClick={() => handleDelete(mobile.pid)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading mobiles...</p>
      )}

      {/* Add Mobile button */}
      <Link to="/admin/mobiles/add" className="add-mobile-button">
        Add Mobile
      </Link>
    </div>
  );
};

export default MobilesAdmin;
