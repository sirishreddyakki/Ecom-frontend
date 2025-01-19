import { Link } from "react-router-dom";
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-container">
                <h1 className="admin-dashboard-title">Admin Dashboard</h1>
                <p className="admin-dashboard-greeting">Hi Admin</p>
                <div className="admin-dashboard-links">
                    <Link to="/admin/mobiles" className="admin-dashboard-link">
                        Mobiles
                    </Link>
                    <Link to="/admin/laptops" className="admin-dashboard-link">
                        Laptops
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
