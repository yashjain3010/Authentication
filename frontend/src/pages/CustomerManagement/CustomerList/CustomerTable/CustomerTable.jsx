import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const CustomerTable = () => {
  // State to track selected orders
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Handle selection/deselection of a single order
  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      // If the order is already selected, remove it from the selection
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      // If the order is not selected, add it to the selection
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  return (
    <TableContainer>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {/* Column headers */}
            <TableCell>
              <strong>Swil ID</strong>
            </TableCell>
            <TableCell>
              <strong>Customer Name</strong>
            </TableCell>
            <TableCell>
              <strong>Phone No.</strong>
            </TableCell>
            <TableCell>
              <strong>Last Order Date</strong>
            </TableCell>
            <TableCell>
              <strong>Total Orders</strong>
            </TableCell>
            <TableCell>
              <strong>Edit</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {/* Order details */}
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Pending</TableCell>
              <TableCell></TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
