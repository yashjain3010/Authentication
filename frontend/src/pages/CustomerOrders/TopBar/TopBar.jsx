import React from "react";
import AppBar from "@mui/material/AppBar";
import { Link as RouterLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ChevronRightIcon } from "lucide-react";

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
        width: "calc(101.5%)", // Expands the width slightly beyond normal
        ml: 5, // Left margin of 5 spacing units
        mt: -6, // Negative top margin to adjust the bar's vertical position
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
            component={RouterLink} // Using RouterLink for navigation
            to="/dashboard" // Link target
            sx={{
              color: "rgb(57, 49, 57)", // Text color
              fontWeight: "300", // Light font weight
              fontSize: "30px", // Large font size
              textDecoration: "none", // No underline by default
              "&:hover": {
                textDecoration: "underline", // Underline on hover
                color: "rgb(7, 5, 7)", // Darken color on hover
              },
            }}
          >
            Dashboard
          </Typography>
          {/* ChevronRightIcon used to separate breadcrumb items */}
          <ChevronRightIcon sx={{ mx: 1, color: "text.secondary" }} />

          {/* Track Orders link with styling */}
          <Typography
            variant="body1"
            component={RouterLink}
            to="/active-users"
            sx={{
              color: "rgb(57, 49, 57)",
              fontWeight: "300",
              fontSize: "30px",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "rgb(7, 5, 7)",
              },
            }}
          >
            Active Users
          </Typography>
          {/* Small ChevronRightIcon for separating last breadcrumb */}
          <ChevronRightIcon
            sx={{ mx: 1, color: "primary.main", fontSize: "10px" }}
          />

          {/* Order Details label with bold text */}
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: "bold", fontSize: "30px" }}
          >
            Active Users
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
