import React, { useState } from "react";
import axios from "axios";
import './styles/AddMobile.css';  // Ensure correct import path

const AddMobile = () => {
  const [mobile, setMobile] = useState({
    pname: "",
    pcost: "",
    pqty: "",
  });
  const [image, setImage] = useState(null);

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
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/admin/mobile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Mobile added successfully!");
      // Redirect to mobile listing page after success
      window.location.href = '/admin/mobiles'; // Replace with your actual page URL
    } catch (error) {
      alert("Failed to add mobile: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="add-mobile">
      <h1>Add Mobile</h1>
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
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="submit-button">Add Mobile</button>
      </form>
    </div>
  );
};

export default AddMobile;
