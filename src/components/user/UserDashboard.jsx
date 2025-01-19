import React from "react";
import { Link } from "react-router-dom";
import './styles/UserDashboard.css';  // Import the new styles

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <p className="dashboard-description">Select a category to shop</p>
      
      <div className="categories-container">
        <Link to="/user/mobiles" className="category-card">
          <span className="category-title">Mobiles</span>
        </Link>
        
        <Link to="/user/laptops" className="category-card">
          <span className="category-title">Laptops</span>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
