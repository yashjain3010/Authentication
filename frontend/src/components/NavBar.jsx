import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;