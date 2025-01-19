import { Link, useNavigate } from "react-router-dom";
import "./styles/Error.css";
const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-container">
                <h1 className="error-title">Oops!</h1>
                <p className="error-message">Invalid credentials. Please try again or register for a new account.</p>
                <div className="error-buttons">
                    <button className="error-button" onClick={() => navigate("/login")}>Try Again</button>
                    <button className="error-button" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Error;
