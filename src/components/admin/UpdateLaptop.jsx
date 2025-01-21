import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/AddLaptop.css"; // Add laptop-specific styles

const UpdateLaptop = () => {
  const [laptop, setLaptop] = useState({
    pname: "",
    pcost: "",
    pqty: "",
  });
  const [image, setImage] = useState(null);
  const { pid } = useParams();  // Get the product ID from the URL
  const navigate = useNavigate();

  // Fetch existing laptop data to populate the form
  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/laptop/${pid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLaptop(response.data);
      } catch (error) {
        console.error("Failed to fetch laptop:", error);
      }
    };

    fetchLaptop();
  }, [pid]);

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
      await axios.put(`http://localhost:8080/admin/laptop/${pid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Laptop updated successfully!");
      navigate("/admin/laptops"); // Redirect back to laptops admin page
    } catch (error) {
      alert("Failed to update laptop: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="add-laptop">
      <h1>Update Laptop</h1>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-button">Update Laptop</button>
      </form>
    </div>
  );
};

export default UpdateLaptop;
