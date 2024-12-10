import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// Importing necessary libraries and components for Material-UI styling, routing, and icon usage.

const FilterButton = () => {
  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State to manage the currently selected filter option
  const [selected, setSelected] = useState("All Orders");

  // Function to handle the opening of the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle the closing of the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle selection of a filter option
  const handleDateSelect = (date) => {
    setSelected(date); // Update the selected filter
  };

  return (
    <>
      {/* Button that triggers the dropdown menu */}
      <Button
        variant="contained"
        component={RouterLink} // Acts as a router link
        onClick={handleClick}
        sx={{
          backgroundImage:
            "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
          color: "white", // White text color
          textTransform: "none", // Prevent text capitalization
          "&:hover": {
            backgroundImage:
              "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient remains the same on hover
          },
        }}
      >
        All Status {/* Display the selected filter label */}
        <FontAwesomeIcon icon={faFilter} style={{ marginLeft: "8px" }} />
        {/* Icon added for filter visualization */}
      </Button>

      {/* Dropdown menu for filter options */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* Menu item for "All Orders" */}
        <MenuItem
          key="All Orders"
          onClick={() => handleDateSelect("All Orders")}
          selected={selected === "All Orders"} // Highlight if selected
          sx={{
            display: "flex", // Flexbox for alignment
            justifyContent: "space-between", // Space between text and checkbox
            "& .MuiListItemText-root": {
              marginRight: "12px", // Add gap between text and checkbox
            },
          }}
        >
          <ListItemText primary="All Orders" />
          {/* Label for the menu item */}
          <Checkbox
            checked={selected === "All Orders"} // Checkbox checked if selected
            sx={{
              color: selected === "All Orders" ? "#926B6B" : "#926B6B", // Custom checkbox color
            }}
          />
        </MenuItem>

        {/* Menu item for "Pending Orders" */}
        <MenuItem
          key="Pending Orders"
          onClick={() => handleDateSelect("Pending Orders")}
          selected={selected === "Pending Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Pending Orders" />
          <Checkbox
            checked={selected === "Pending Orders"}
            sx={{
              color: selected === "Pending Orders" ? "#926B6B" : "#926B6B",
            }}
          />
        </MenuItem>

        {/* Additional menu items for "Out for Delivery", "Shipped Orders", "Cancelled Orders" */}
        <MenuItem
          key="Out for Delivery"
          onClick={() => handleDateSelect("Out for Delivery")}
          selected={selected === "Out for Delivery"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Out for Delivery" />
          <Checkbox
            checked={selected === "Out for Delivery"}
            sx={{
              color: selected === "Out for Delivery" ? "#926B6B" : "#926B6B",
            }}
          />
        </MenuItem>
        <MenuItem
          key="Shipped Orders"
          onClick={() => handleDateSelect("Shipped Orders")}
          selected={selected === "Shipped Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Shipped Orders" />
          <Checkbox
            checked={selected === "Shipped Orders"}
            sx={{
              color: selected === "Shipped Orders" ? "#926B6B" : "#926B6B",
            }}
          />
        </MenuItem>
        <MenuItem
          key="Cancelled Orders"
          onClick={() => handleDateSelect("Cancelled Orders")}
          selected={selected === "Cancelled Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Cancelled Orders" />
          <Checkbox
            checked={selected === "Cancelled Orders"}
            sx={{
              color: selected === "Cancelled Orders" ? "#926B6B" : "#926B6B",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterButton; // Exporting the component for reuse
