
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavBar && <NavBar />}
      {children}
    </div>
  );
};

export default Layout;
