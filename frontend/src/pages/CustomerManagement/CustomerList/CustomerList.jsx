import React from 'react'
import TopBar from './TopBar/TopBar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DateFilterButton from './DateFilterButton/DateFilterButton';
import CustomerTable from './CustomerTable/CustomerTable';

const CustomerList = () => {
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
      <TopBar />
      <Paper
        sx={{
          bgcolor: "white",
          p: "20px",
          width: "100%",
          marginTop: "20px",
          marginLeft: "45px",
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
            width: "90%",
            padding: "10px 15px",
            fontSize: "16px",
            border: "1px solid #E0E0E0",
            borderRadius: "20px",
          }}
        />
        <DateFilterButton /> {/* Date filter button */}
      </Paper>
      <Paper sx={{ marginTop: "2rem", paddingBottom: "2rem", marginLeft: "3rem", width: "100%" }}>
        <CustomerTable /> 
      </Paper>
    </Box>
  );
}

export default CustomerList;