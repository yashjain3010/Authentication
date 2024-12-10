// Import React and icons from 'react-icons' for the notification and search icons
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io"; // Notification icon
import { CiSearch } from "react-icons/ci"; // Search icon (though not used here)
import "./TopBar.css"; // Import CSS file for styling the NavBar
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for navigation
import { Button, IconButton } from "@mui/material"; // Import Button and IconButton components from Material UI
import NotificationsIcon from "@mui/icons-material/Notifications"; // Import Notifications icon from Material UI
import Box from "@mui/material/Box"; // Import Box component from Material UI

// Define the NavBar component
const NavBar = () => {
  return (
    // The main navigation element (nav) with the class 'container-2' for styling
    <nav className="container-2">
      {/* Heading for the navbar, with the class 'heading-tag-1' for styling */}
      <h1 className="heading-tag-1">Create Order</h1>

      {/* Container for the search input, button, and notification icon */}
      <div className="inputs-1">
        {/* Search input with placeholder text and an accessible aria-label */}
        <input type="search" placeholder="Search" aria-label="Search" />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Create Order button styled with gradient */}
          <Button
            variant="contained"
            component={RouterLink}
            to="/track-order" // Link to create order page
            sx={{
              backgroundImage:
                "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
              color: "white", // White text color
              textTransform: "none", // No text transformation (no uppercase)
              px: 3, // Padding on x-axis
              
              "&:hover": {
                backgroundImage:
                  "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Keep gradient on hover
              },
            }}
          >
            TrackOrder
          </Button>
        </Box>
      </div>
    </nav>
  );
};

// Export the NavBar component so it can be imported and used in other parts of the app
export default NavBar;
