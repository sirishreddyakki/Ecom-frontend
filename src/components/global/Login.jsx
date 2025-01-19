import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

const Login = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/login", {
                username: ref1.current.value,
                password: ref2.current.value,
            });
            const { data } = res;
            const { login } = data;
            if (login === "success") {
                const { role, token } = data;
                window.localStorage.setItem("token", token);
                role === "ROLE_USER" ? navigate("/user") : navigate("/admin");
            } else {
                navigate("/error");
            }
        } catch (e) {
            navigate("/error");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">Welcome back! Please log in to continue.</p>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        ref={ref1}
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="password"
                        ref={ref2}
                        placeholder="Password"
                        className="login-input"
                    />
                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                </form>
                <p className="login-register-prompt">
                    Don't have an account?{" "}
                    <Link to="/register" className="register-link">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
