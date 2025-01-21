// UpdateMobile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './styles/AddMobile.css';  // You can reuse the same AddMobile styles

const UpdateMobile = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [mobile, setMobile] = useState({
    pname: "",
    pcost: "",
    pqty: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the existing mobile details based on the ID
  useEffect(() => {
    const fetchMobile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/mobile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMobile(response.data);
      } catch (err) {
        setError("Failed to fetch mobile details.");
        console.error(err);
      }
    };

    fetchMobile();
  }, [id]);

  const handleInputChange = (e) => {
    setMobile({ ...mobile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("mobile", new Blob([JSON.stringify(mobile)], { type: "application/json" }));
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:8080/admin/mobile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Mobile updated successfully!");
      navigate("/admin/mobiles"); // Redirect back to MobilesAdmin page
    } catch (err) {
      alert("Failed to update mobile: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="add-mobile">
      <h1>Update Mobile</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mobile Name:</label>
            <input
              type="text"
              name="pname"
              value={mobile.pname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Cost:</label>
            <input
              type="number"
              name="pcost"
              value={mobile.pcost}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Quantity:</label>
            <input
              type="number"
              name="pqty"
              value={mobile.pqty}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p>{image ? image.name : "No file chosen"}</p>
          </div>
          <button type="submit" className="submit-button">Update Mobile</button>
        </form>
      )}
    </div>
  );
};

export default UpdateMobile;
