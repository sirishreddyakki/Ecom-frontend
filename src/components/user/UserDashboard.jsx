import React from "react";
import { Link } from "react-router-dom";
import './styles/UserDashboard.css';  // Import the new styles

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
        <div className="user-dashboard-container">
            <h1 className="user-dashboard-title">Welcome to Ecommerce Ap</h1>
            <p className="user-dashboard-greeting">Hi User</p>
            <div className="user-dashboard-links">
                <Link to="/user/mobiles" className="user-dashboard-link">
                    Mobiles
                </Link>
                <Link to="/user/laptops" className="user-dashboard-link">
                    Laptops
                </Link>
            </div>
        </div>
    </div>
  );
};

export default UserDashboard;
