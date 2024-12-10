import React, { useState } from "react"; // Import React and useState for state management
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material"; // Import Material UI components
import { Link as RouterLink } from "react-router-dom"; // RouterLink for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomeIcon for icons
import { faFilter } from "@fortawesome/free-solid-svg-icons"; // Filter icon

const FilterButton = () => {
  // State for managing the anchor element of the Menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State for the selected filter option
  const [selected, setSelected] = useState("All Orders");

  // Function to handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
  };

  // Function to handle closing the menu
  const handleClose = () => {
    setAnchorEl(null); // Remove the anchor to close the menu
  };

  // Function to handle selecting a filter option
  const handleDateSelect = (date) => {
    setSelected(date); // Update the selected filter option
  };

  return (
    <>
      {/* Filter Button */}
      <Button
        variant="contained" // Use Material UI's contained button style
        component={RouterLink} // Use RouterLink for navigation
        onClick={handleClick} // Open menu on click
        sx={{
          // Styling for the button
          backgroundImage:
            "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
          color: "white", // Text color
          textTransform: "none", // No uppercase transformation
          "&:hover": {
            backgroundImage:
              "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Maintain gradient on hover
          },
        }}
      >
        Filter
        {/* Add filter icon with spacing */}
        <FontAwesomeIcon icon={faFilter} style={{ marginLeft: "8px" }} />
      </Button>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* Menu Item: All Orders */}
        <MenuItem
          key="All Orders"
          onClick={() => handleDateSelect("All Orders")} // Update filter
          selected={selected === "All Orders"} // Highlight selected item
          sx={{
            display: "flex", // Flex layout for alignment
            justifyContent: "space-between", // Space between text and checkbox
            "& .MuiListItemText-root": {
              marginRight: "12px", // Gap between text and checkbox
            },
          }}
        >
          <ListItemText primary="All Orders" /> {/* Label */}
          <Checkbox
            checked={selected === "All Orders"} // Show checked state
            sx={{
              "&.Mui-checked": {
                color: "#A0616A", // Custom checkbox color when checked
              },
            }}
          />
        </MenuItem>

        {/* Menu Item: Pending Orders */}
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
              "&.Mui-checked": {
                color: "#A0616A",
              },
            }}
          />
        </MenuItem>

        {/* Menu Item: Out for Delivery */}
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
              "&.Mui-checked": {
                color: "#A0616A",
              },
            }}
          />
        </MenuItem>

        {/* Menu Item: Shipped Orders */}
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
              "&.Mui-checked": {
                color: "#A0616A",
              },
            }}
          />
        </MenuItem>

        {/* Menu Item: Cancelled Orders */}
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
              "&.Mui-checked": {
                color: "#A0616A",
              },
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterButton;
