import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./global/Home";
import Login from "./global/Login";
import Register from "./global/Register";
import Logout from "./global/Logout";
import Error from "./global/Error";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Mobiles from "./user/Mobiles";
import Laptops from "./user/Laptops";

import MobilesAdmin from "./admin/MobilesAdmin";
import LaptopsAdmin from "./admin/LaptopsAdmin";
import AddMobile from "./admin/AddMobile";
import AddLaptop from "./admin/AddLaptop";

const  Master= () =>{
    return(
        <>
           <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/logout" element={<Logout></Logout>}></Route>
                    <Route path="/error" element={<Error></Error>}></Route>

                    <Route path="/user" element={<UserDashboard></UserDashboard>}></Route>
                    <Route path="/user/mobiles" element={<Mobiles></Mobiles>}></Route>
                    <Route path="/user/laptops" element={<Laptops></Laptops>}></Route>

                    <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/admin/mobiles" element={<MobilesAdmin></MobilesAdmin>}></Route>
                    <Route path="/admin/laptops" element={<LaptopsAdmin></LaptopsAdmin>}></Route>
                    <Route path="/admin/mobiles/add" element={<AddMobile></AddMobile>}></Route>
                    <Route path="/admin/laptops/add" element={<AddLaptop></AddLaptop>}></Route>

                </Routes>
           </BrowserRouter>
        </>
    )
}
export default Master;