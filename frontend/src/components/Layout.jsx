import React from "react"; // Importing React to create a React component
import { useLocation } from "react-router-dom"; // Importing `useLocation` hook to get the current location (path) in the application
import NavBar from "./SideBar/SideBar"; // Importing the NavBar component to be used in the layout

// Layout component that wraps around other components/pages to provide consistent UI structure (e.g. navbar, sidebar)
const Layout = ({ children }) => {
  // Using `useLocation` hook to access the current path
  const location = useLocation();

  // Conditional logic to determine whether to hide the NavBar component
  const hideNavBar =
    location.pathname === "/signin" || location.pathname === "/signup";
  // If the current path is either `/signin` or `/signup`, don't show the NavBar

  return (
    // Main wrapper div for the layout
    <div>
      {/* Conditionally rendering the NavBar based on `hideNavBar` */}
      {!hideNavBar && <NavBar />}{" "}
      {/* Show the NavBar if `hideNavBar` is false */}
      {children} {/* Render the child components/pages */}
    </div>
  );
};

// Exporting the Layout component to be used in other parts of the application
export default Layout;
