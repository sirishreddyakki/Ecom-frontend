import "./styles/Logout.css";
const Logout = () => {
    return (
        <div className="logout-page">
            <div className="logout-container">
                <h1 className="logout-title">Logged Out Successfully</h1>
                <p className="logout-message">You have been logged out. What would you like to do next?</p>
                <div className="logout-buttons">
                    <button className="logout-button" onClick={() => window.location.href = "/login"}>
                        Login Again
                    </button>
                    <button className="logout-home-button" onClick={() => window.location.href = "/"}>
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
