import React from "react";
import { useState } from "react"; // Importing useState hook for state management
import TopBar from "./TopBar"; // Importing TopBar component
import { Box } from "@mui/material"; // Importing Box component from Material UI
import Paper from "@mui/material/Paper"; // Importing Paper component for layout
import FilterButton from "./FilterButton"; // Importing FilterButton component for filtering orders
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome for icons
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"; // Importing table components from Material UI
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"; // Importing vertical ellipsis icon
import { Checkbox } from "@mui/material"; // Importing Checkbox component from Material UI
import "./TrackOrder.css"; // Importing CSS file for styling

const TrackOrder = () => {
  const [selectedOrders, setSelectedOrders] = useState([]); // State to track selected orders
  const [selectedTimeframe, setSelectedTimeframe] = useState("All"); // State to track selected timeframe

  // Function to handle checkbox state change for selecting individual orders
  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId)); // Remove from selected if already selected
    } else {
      setSelectedOrders([...selectedOrders, orderId]); // Add to selected if not selected
    }
  };

  // Sample data for orders
  const orders = [
    {
      id: "#1234",
      customerName: "Yash Jain",
      phoneNo: "9933779999",
      orderDate: "24-8-2024",
      orderAmount: 400,
      status: "Created",
    },
    // Add more order objects as needed
  ];

  return (
    <div>
      <Box
        p={15}
        sx={{
          bgcolor: "#f5f5f5", // Background color for the Box container
          width: "100%", // Full width
          paddingTop: "64px", // Padding from the top
          height: "90%", // Set the height of the content
        }}
      >
        <TopBar /> {/* Top navigation bar */}
        {/* Paper component for search input and filter button */}
        <Paper
          sx={{
            bgcolor: "white", // White background for the paper
            p: "20px", // Padding inside the paper
            width: "96.5%", // Paper width
            marginLeft: "65px", // Left margin to offset the layout
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Box shadow for the paper
            borderRadius: "8px", // Rounded corners for the paper
            display: "flex",
            justifyContent: "space-between", // Space between the elements inside Paper
            alignItems: "center", // Align items center
            gap: 1, // Gap between the elements
          }}
        >
          <input
            type="search"
            placeholder="🔍 Search" // Placeholder text for search input
            style={{
              width: "90%", // Input takes 90% width
              padding: "10px 15px", // Padding inside the input
              fontSize: "16px", // Font size of the input text
              border: "1px solid #E0E0E0", // Border style of the input
              borderRadius: "20px", // Rounded corners for the input
            }}
          />
          <FilterButton /> {/* Filter button for filtering orders */}
        </Paper>
        {/* Timeframe buttons for filtering orders based on time */}
        <Box>
          <div className="timeframe-buttons">
            <button
              className={`timeframe-button ${
                selectedTimeframe === "All" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("All")} // Change timeframe to "All"
            >
              All
            </button>
            <button
              className={`timeframe-button ${
                selectedTimeframe === "7 Days" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("7 Days")} // Change timeframe to "7 Days"
            >
              7 Days
            </button>
            <button
              className={`timeframe-button ${
                selectedTimeframe === "30 days" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("30 days")} // Change timeframe to "30 Days"
            >
              30 days
            </button>
            <button
              className={`timeframe-button ${
                selectedTimeframe === "3 months" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("3 months")} // Change timeframe to "3 Months"
            >
              3 months
            </button>
            <button
              className={`timeframe-button ${
                selectedTimeframe === "6 Months" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("6 Months")} // Change timeframe to "6 Months"
            >
              6 Months
            </button>
          </div>
        </Box>
        {/* Paper component for displaying the orders table */}
        <Paper
          sx={{
            bgcolor: "white", // White background for the paper
            p: "20px", // Padding inside the paper
            marginTop: "20px", // Top margin for spacing
            width: "96.5%", // Paper width
            marginLeft: "65px", // Left margin to offset the layout
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Box shadow for the paper
            borderRadius: "8px", // Rounded corners for the paper
            display: "flex",
            justifyContent: "space-between", // Space between the elements inside Paper
            alignItems: "center", // Align items center
            gap: 1, // Gap between the elements
          }}
        >
          <Table>
            <TableHead>
              {/* Table header */}
              <TableRow>
                <TableCell>
                  {/* Checkbox for selecting all orders */}
                  <Checkbox
                    indeterminate={
                      selectedOrders.length > 0 &&
                      selectedOrders.length < orders.length
                    }
                    checked={
                      orders.length > 0 &&
                      selectedOrders.length === orders.length
                    }
                    onChange={(event) => {
                      // Select or deselect all orders based on checkbox state
                      if (event.target.checked) {
                        setSelectedOrders(orders.map((order) => order.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    sx={{
                      "&.Mui-checked": {
                        color: "#A0616A", // Color for checked checkbox
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
                  {/* Vertical ellipsis icon */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Mapping over orders and displaying them in table rows */}
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      indeterminate={
                        selectedOrders.length > 0 &&
                        selectedOrders.length < orders.length
                      }
                      checked={
                        orders.length > 0 &&
                        selectedOrders.length === orders.length
                      }
                      onChange={(event) => {
                        // Select or deselect individual order
                        if (event.target.checked) {
                          setSelectedOrders(orders.map((order) => order.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                      sx={{
                        "&.Mui-checked": {
                          color: "#A0616A", // Color for checked checkbox
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.phoneNo}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.orderAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
                    {/* Vertical ellipsis icon */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
};

export default TrackOrder; // Exporting the TrackOrder component
