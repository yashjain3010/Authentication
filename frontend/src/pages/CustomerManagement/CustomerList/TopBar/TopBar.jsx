import React from "react";
import AppBar from "@mui/material/AppBar";
import { Link as RouterLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { NotificationsOutlined as NotificationsIcon } from "@mui/icons-material";

// TopBar component for rendering the navigation bar
const TopBar = () => {
  return (
    // AppBar component to create the top bar with styling
    <AppBar
      position="relative" // Positioning the AppBar relatively to other elements
      sx={{
        backgroundColor: "transparent", // Transparent background
        border: 0, // No border
        color: "black", // Text color set to black
        boxShadow: "none", // No shadow effect
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures the bar is above the sidebar
        width: "103.5%", // Expands the width slightly beyond normal // Left margin of 5 spacing units
        ml: 3,
        mt: -6,// Negative top margin to adjust the bar's vertical position
        mb: 4, // Bottom margin of 4 spacing units
      }}
    >
      {/* Toolbar component for holding content inside AppBar */}
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Box containing the breadcrumb navigation */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Create Order link with styling */}
          <Typography
            variant="body1"
            sx={{
              color: "rgb(57, 49, 57)", // Text color
              fontWeight: "600", // Light font weight
              fontSize: "30px", // Large font size
              textDecoration: "none", // No underline by default
              "&:hover": { // Underline on hover
                color: "rgb(7, 5, 7)", // Darken color on hover
              },
            }}
          >
            Customers List
          </Typography>
          {/* ChevronRightIcon used to separate breadcrumb items */}
        </Box>

        {/* Box containing action buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Create Order button styled with gradient */}
          <Button
            variant="contained"
            component={RouterLink}
            to="/create-customer" // Link to create order page
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
            Create Customer
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
