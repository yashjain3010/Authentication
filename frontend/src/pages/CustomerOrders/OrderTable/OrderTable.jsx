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

const OrderTable = ({ orders }) => {
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
            {/* Checkbox for selecting/deselecting all orders */}
            <TableCell>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#A0616A", // Custom checkbox color when checked
                  },
                }}
                indeterminate={
                  selectedOrders.length > 0 &&
                  selectedOrders.length < orders.length // Show as indeterminate if some orders are selected
                }
                checked={
                  orders.length > 0 && selectedOrders.length === orders.length // Check if all orders are selected
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    // Select all orders if the checkbox is checked
                    setSelectedOrders(orders.map((order) => order._id));
                  } else {
                    // Deselect all orders if the checkbox is unchecked
                    setSelectedOrders([]);
                  }
                }}
              />
            </TableCell>
            {/* Column headers */}
            <TableCell>
              <strong>Order ID</strong>
            </TableCell>
            <TableCell>
              <strong>Order Date</strong>
            </TableCell>
            <TableCell>
              <strong>Phone No.</strong>
            </TableCell>
            <TableCell>
              <strong>Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Order Status</strong>
            </TableCell>
            <TableCell>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              {/* Checkbox for selecting/deselecting a specific order */}
              <TableCell>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#A0616A", // Custom checkbox color when checked
                    },
                  }}
                  checked={selectedOrders.includes(order._id)} // Check if this order is selected
                  onChange={(event) => {
                    if (event.target.checked) {
                      // Add the order to selected orders
                      setSelectedOrders([...selectedOrders, order._id]);
                    } else {
                      // Remove the order from selected orders
                      setSelectedOrders(
                        selectedOrders.filter((id) => id !== order._id)
                      );
                    }
                  }}
                />
              </TableCell>
              {/* Order details */}
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.customer.phone}</TableCell>
              <TableCell>{order.totalMRP}</TableCell>
              <TableCell>Pending</TableCell>
              {/* Action column */}
              <TableCell>
                <FontAwesomeIcon
                  sx={{ cursor: "pointer" }} // Pointer cursor for action icon
                  icon={faEllipsisVertical}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
