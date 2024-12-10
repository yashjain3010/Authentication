import React from "react";
import { Pagination as MUIPagination, Stack } from "@mui/material"; // Import Material-UI Pagination and Stack components

// Pagination component for handling page navigation
const Pagination = ({ page, totalPages, onPageChange }) => {
  // Function to handle page change event
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage); // Call the parent-provided function with the new page number
  };

  return (
    <Stack alignItems="center" mt={4}>
      {/* Center the pagination control and add margin at the top */}
      <MUIPagination
        count={totalPages} // Total number of pages to display
        page={page} // Current active page
        onChange={handlePageChange} // Event handler for page change
        variant="outlined" // Styling variant for the pagination
        shape="rounded" // Rounded corners for the pagination buttons
      />
    </Stack>
  );
};

export default Pagination; // Export the component for use in other parts of the application
