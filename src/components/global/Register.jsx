import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Register.css";

const Register = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [role, setRole] = useState("USER");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:8080/register", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                role: role,
            });
            const { data } = res;
            if (data) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (e) {
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                <p className="register-subtitle">Create a new account</p>
                <form className="register-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        ref={usernameRef}
                        placeholder="Username"
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                        className="register-input"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="register-select"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <button onClick={handleRegister} className="register-button">
                        Register
                    </button>
                </form>
                <p className="register-login-prompt">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="login-link">
                        Log in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
