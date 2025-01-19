import React, { useState } from "react";
import axios from "axios";
import './styles/AddLaptop.css'; // Import the updated styles

const AddLaptop = () => {
  const [laptop, setLaptop] = useState({
    pname: "",
    pcost: "",
    pqty: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setLaptop({ ...laptop, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("laptop", new Blob([JSON.stringify(laptop)], { type: "application/json" }));
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/admin/laptop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Laptop added successfully!");
    } catch (error) {
      alert("Failed to add laptop: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="add-laptop">
      <h1>Add Laptop</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Laptop Name:</label>
          <input
            type="text"
            name="pname"
            value={laptop.pname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Laptop Cost:</label>
          <input
            type="number"
            name="pcost"
            value={laptop.pcost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Laptop Quantity:</label>
          <input
            type="number"
            name="pqty"
            value={laptop.pqty}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Laptop Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="submit-button">Add Laptop</button>
      </form>
    </div>
  );
};

export default AddLaptop;
