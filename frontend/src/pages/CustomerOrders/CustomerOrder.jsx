import { Box, Avatar } from "@mui/material"; // Import Material-UI components
import Paper from "@mui/material/Paper"; // Import Material-UI Paper component
import Typography from "@mui/material/Typography"; // Import Material-UI Typography for text display
import OrderTable from "../CustomerOrders/OrderTable/OrderTable"; // Import OrderTable component
import Pagination from "../CustomerOrders/Pagination/Pagination"; // Import Pagination component
import TopBar from "./TopBar/TopBar"; // Import TopBar component
import FilterButton from "./FilterButton/FilterButton"; // Import FilterButton component
import DateFilterButton from "./DateFilterButton/DateFilterButton"; // Import DateFilterButton component
import { User } from "lucide-react"; // Import User icon from lucide-react library
import React, { useState, useEffect } from "react"; // Import React and hooks for state and lifecycle

// CustomerOrder component to display customer orders with pagination and filtering
const CustomerOrder = () => {
  // State to hold orders, current page, and total pages
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch customer orders when the page changes
  useEffect(() => {
    fetchCustomerOrders(page); // Fetch orders for the current page
  }, [page]);

  // Fetch orders from the server
  const fetchCustomerOrders = async (pageNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customerorders/10000166/orders?page=${pageNumber}` // API endpoint with pagination
      );
      const data = await response.json();
      setOrders(data.orders); // Set fetched orders
      setTotalPages(Math.ceil(data.totalOrders / 10)); // Calculate total pages
    } catch (error) {
      console.log(error); // Log error in case of failure
    }
  };

  // Handle page change event
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // Update the current page
  };

  return (
    <Box
      p={15}
      sx={{
        bgcolor: "#f5f5f5", // Light grey background
        width: "100%", // Full width container
        paddingTop: "64px", // Padding at the top
        height: "90%", // Set height to occupy most of the viewport
      }}
    >
      <TopBar /> {/* Top navigation bar */}
      <Box p={8} mt={-9}>
        {/* Customer details section */}
        <Paper sx={{ display: "flex", borderLeft: "4px solid #A0616A" }}>
          {/* Customer avatar */}
          <Box sx={{ marginTop: "auto", alignItems: "center", padding: 2 }}>
            <Avatar
              sx={{ bgcolor: "grey.300", marginRight: 1.5, cursor: "pointer" }}
            >
              <User size={20} /> {/* User icon */}
            </Avatar>
          </Box>
          {/* Customer information */}
          <Box
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "-10px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>John Doe</b>
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>10000166</Typography>
            <Typography sx={{ fontSize: "13px" }}>#12453</Typography>
          </Box>
          {/* Total orders and amount spent */}
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              marginLeft: "650px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>Total Orders</b>
              <br />
              <Typography sx={{ marginLeft: "35px", fontSize: "13px" }}>
                {orders.length}
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{ marginTop: "20px", marginBottom: "10px", marginLeft: "80px" }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>Total Spent</b>
              <br />
              <Typography sx={{ marginLeft: "25px", fontSize: "13px" }}>
                $500
              </Typography>
            </Typography>
          </Box>
        </Paper>

        {/* Filter and search bar */}
        <Paper
          sx={{
            bgcolor: "white",
            p: "20px",
            width: "100%",
            marginTop: "20px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <input
            type="search"
            placeholder="🔍 Search"
            style={{
              width: "76%",
              padding: "10px 15px",
              fontSize: "16px",
              border: "1px solid #E0E0E0",
              borderRadius: "20px",
            }}
          />
          <FilterButton /> {/* Filter button */}
          <DateFilterButton /> {/* Date filter button */}
        </Paper>

        {/* Orders table and pagination */}
        <Paper sx={{ marginTop: "2rem", paddingBottom: "2rem" }}>
          <OrderTable orders={orders} /> {/* Orders table */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange} // Pagination controls
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerOrder; // Export the CustomerOrder component
