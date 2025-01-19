import { Link } from "react-router-dom";
import "./styles/Home.css";  // Import Home.css from the styles folder

const Home = () =>{
    return(
        <>
            <div className="home">
                <div className="home-nav">
                    Ecommerce App
                </div>
                <div className="home-body">
                    <div className="home-body-content">
                        <h1>Welcome to Ecommerce App</h1>
                        <h3>Home Page</h3>
                        <Link to="/login" className="home-body-right-link">LOGIN</Link>
                        <br /><br />
                        <Link to="/register" className="home-body-right-link">REGISTER</Link>
                    </div>
                </div>
            </div>

            
           
            
        </>
    )
}
export default Home;