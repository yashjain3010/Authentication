import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// DateFilterButton component allows users to select a date range filter via a dropdown menu
const DateFilterButton = () => {
  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  // State to store the currently selected date filter
  const [selectedDate, setSelectedDate] = useState("All");

  // Opens the dropdown menu by setting the anchor element
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Updates the selected date filter and closes the menu
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {/* Button to open the dropdown menu, styled with a gradient background */}
      <Button
        variant="contained"
        component={RouterLink} // Enables routing using React Router
        onClick={handleClick} // Opens the menu on click
        sx={{
          backgroundImage:
            "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
          color: "white", // White text color
          textTransform: "none", // Prevents text transformation to uppercase
          "&:hover": {
            backgroundImage:
              "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Keeps the gradient on hover
          },
        }}
      >
        Date: {selectedDate} {/* Displays the currently selected date */}
      </Button>

      {/* Dropdown menu for selecting date filters */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* List of menu items representing date ranges */}
        {/* 'All' option */}
        <MenuItem
          key="All"
          onClick={() => handleDateSelect("All")}
          selected={selectedDate === "All"} // Highlights the currently selected option
          sx={{
            display: "flex",
            justifyContent: "space-between", // Spaces out text and checkbox
            "& .MuiListItemText-root": {
              marginRight: "12px", // Adds gap between text and checkbox
            },
          }}
        >
          <ListItemText primary="All" /> {/* Label for the menu item */}
          <Checkbox
            checked={selectedDate === "All"} // Checkbox is checked if 'All' is selected
            sx={{
              color: "#926B6B", // Sets the checkbox color
            }}
          />
        </MenuItem>

        {/* Repeat similar structure for other date options */}
        {/* Example for "Last 7 Days" */}
        <MenuItem
          key="Last 7 Days"
          onClick={() => handleDateSelect("Last 7 Days")}
          selected={selectedDate === "Last 7 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Last 7 Days" />
          <Checkbox
            checked={selectedDate === "Last 7 Days"}
            sx={{
              color: "#926B6B",
            }}
          />
        </MenuItem>

        {/* Similar blocks for "30 Days", "45 Days", "06 Months", "01 Year" */}
        <MenuItem
          key="30 Days"
          onClick={() => handleDateSelect("30 Days")}
          selected={selectedDate === "30 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="30 Days" />
          <Checkbox
            checked={selectedDate === "30 Days"}
            sx={{
              color: "#926B6B",
            }}
          />
        </MenuItem>

        <MenuItem
          key="45 Days"
          onClick={() => handleDateSelect("45 Days")}
          selected={selectedDate === "45 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="45 Days" />
          <Checkbox
            checked={selectedDate === "45 Days"}
            sx={{
              color: "#926B6B",
            }}
          />
        </MenuItem>

        <MenuItem
          key="06 Months"
          onClick={() => handleDateSelect("06 Months")}
          selected={selectedDate === "06 Months"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="06 Months" />
          <Checkbox
            checked={selectedDate === "06 Months"}
            sx={{
              color: "#926B6B",
            }}
          />
        </MenuItem>

        <MenuItem
          key="01 Year"
          onClick={() => handleDateSelect("01 Year")}
          selected={selectedDate === "01 Year"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="01 Year" />
          <Checkbox
            checked={selectedDate === "01 Year"}
            sx={{
              color: "#926B6B",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DateFilterButton; // Export the component for use in other parts of the app
