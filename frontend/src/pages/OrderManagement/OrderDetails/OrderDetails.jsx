import React from "react";
import axios from "axios"; // Import axios for API calls
import { useState,useEffect } from "react";
import SideBar from "../../../components/SideBar/SideBar"; // Import Sidebar component
import TopBar from "./TopBar"; // Import TopBar component
import Box from "@mui/material/Box/Box"; // Import Box component from Material UI
import { Paper } from "@mui/material"; // Import Paper component from Material UI
import Typography from "@mui/material/Typography"; // Import Typography for text styling
import Grid from "@mui/material/Grid"; // Import Grid component for layout
import Divider from "@mui/material/Divider"; // Import Divider component for dividing sections
import Stack from "@mui/material/Stack"; // Import Stack for spacing components
import IconButton from "@mui/material/IconButton"; // Import IconButton for clickable icons
import Print from "@mui/icons-material/Print"; // Import Print icon
import { Download } from "lucide-react"; // Import Download icon from lucide-react
import OrderStepper from "./OrderStepper"; // Import OrderStepper component
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for navigation
import ModeEditIcon from "@mui/icons-material/ModeEdit"; // Import Edit icon for mode edit

const OrderDetails = () => {
  // Define orderSummary object with details for display
  const [orderDetails, setOrderDetails] = useState({
    PKID: "",
    FKSeriesID: "",
    Party: "",
    CustomerAdd: "",
    TaxAmt: 0,
    TotalDisc: 0,
    GrossAmt: 0,
    ShippingAddressRemark: "",
    NetAmt: 0,
    DATE_MODIFIED: "",
  });

  useEffect(() => {
    // Fetch order details from the server
    const id = 1714;
    const FkID = 3;
    axios.get(`http://localhost:3000/api/orderdetails?id=${id}&FkID=${FkID}`)
    .then((response) => {
      const data = response.data
      const {PKID,FKSeriesID ,Party, CustomerAdd, TaxAmt, TotalDisc, GrossAmt, ShippingAddressRemark, NetAmt, DATE_MODIFIED } = data;

      setOrderDetails({
        PKID,
        FKSeriesID,
        Party,
        CustomerAdd,
        TaxAmt,
        TotalDisc,
        GrossAmt,
        ShippingAddressRemark,
        NetAmt,
        DATE_MODIFIED,
      });
    })
    .catch((error) => console.error("Error fetching order details", error));
  }, []);

  const orderSummary = {
    customerInfo: {
      name: "John Doe",
      phone: "8989898989",
      email: "John@example.com",
    },
    items: [
      { name: "Dolo", quantity: 2, price: 94.8 },
      { name: "Dolo", quantity: 2, price: 94.8 },
    ],
    subtotal: 94.8,
    taxes: 3.65,
    delivery: 4.5,
    total: 102.95,
  };

  return (
    <div>
      {/* Sidebar component for navigation */}
      <SideBar />
      {/* Main content area styled with Box component */}
      <Box
        p={15}
        sx={{
          bgcolor: "#f5f5f5", // Background color
          width: "100%",
          paddingTop: "64px", // Padding from the top
          height: "90%", // Set the height of the content
        }}
      >
        {/* TopBar for page title or any header-related content */}
        <TopBar />
        {/* Paper component to give a card-like effect to the order details */}
        <Paper sx={{ p: 4, ml: 8, width: 1150 }}>
          <Box sx={{ mb: 3 }}>
            {/* Title for dispatch section */}
            <Typography variant="body" color="textPrimary" fontWeight={900}>
              Dispatch
            </Typography>
            {/* Order ID */}
            <Typography variant="body2" color="textSecondary">
              #ORD{orderDetails.PKID}{orderDetails.FKSeriesID}
            </Typography>
          </Box>

          {/* OrderStepper component to indicate the order progress */}
          <OrderStepper />

          {/* Grid layout to arrange content in two columns */}
          <Grid container spacing={3}>
            {/* Left section for customer and item details */}
            <Grid item xs={12} md={7}>
              <Grid sx={{ p: 3 }}>
                {/* Order summary title with styled background */}
                <Typography
                  variant="h6"
                  sx={{
                    backgroundImage:
                      "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))",
                    color: "white",
                    p: 2,
                    ml: -3,
                    mr: -4,
                    paddingLeft: 3,
                    fontWeight: "bold",
                    padding: 4,
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                  }}
                >
                  Order Summary
                </Typography>

                {/* Customer Information section */}
                <Box mb={4}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mt: 3 }}
                    gutterBottom
                  >
                    Customer Information
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9C8684",
                      fontWeight: "300",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#9C8684",
                      },
                    }}
                    component={RouterLink} // Link to customer profile page
                    to="/profile"
                  >
                    {orderDetails.Party}
                  </Typography>
                  <Typography>{orderSummary.customerInfo.phone}</Typography>
                  <Typography>{orderSummary.customerInfo.email}</Typography>
                </Box>

                {/* Divider between sections */}
                <Divider sx={{ my: 2 }} />

                {/* Items list section */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                  gutterBottom
                >
                  Items
                </Typography>

                {/* Mapping over items to display each item in the order */}
                {orderSummary.items.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography>{`${item.quantity}x ${item.name}`}</Typography>
                    <Typography>₹{item.price}</Typography>
                  </Box>
                ))}

                {/* Subtotal, Taxes, Delivery, and Total sections */}
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>SubTotal</Typography>
                    <Typography>₹{orderDetails.GrossAmt}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Taxes</Typography>
                    <Typography>₹{orderDetails.TaxAmt}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Discount</Typography>
                    <Typography>₹{orderDetails.TotalDisc}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Delivery</Typography>
                    <Typography>₹{orderSummary.delivery}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6">Total</Typography>
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 25 }}
                      variant="h6"
                    >
                      ₹{orderDetails.NetAmt}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Right section for delivery and agent details */}
            <Grid item xs={12} md={5}>
              <Grid
                sx={{
                  pl: 4,
                  mt: -22,
                  border: "1px solid #0f0d0d",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                {/* Delivery details section */}
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 18 }}
                  variant="h6"
                  gutterBottom
                >
                  Delivery Details
                </Typography>
                {/* Shipping Address */}
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Shipping Address
                  </Typography>
                  <Typography>{orderDetails.CustomerAdd}</Typography>
                </Box>

                {/* Agent Details */}
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Agent Details
                  </Typography>
                  <Typography>Agent id: #11234</Typography>
                  <Typography>Phone no: #11234</Typography>
                </Box>

                {/* Order Confirmation Time */}
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Order Confirmation time
                  </Typography>
                  <Typography>{orderDetails.DATE_MODIFIED}</Typography>
                  <Typography>12pm</Typography>
                </Box>

                {/* Delivery Date and Time */}
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Delivery Date and time
                  </Typography>
                  <Typography>{orderDetails.DATE_MODIFIED}</Typography>
                  <Typography>10 am - 12 am</Typography>
                </Box>

                {/* Important Notes section */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      display: "flex", // Flexbox for aligning text and icon
                      alignItems: "center", // Align vertically
                    }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Important Notes
                    <span>
                      <ModeEditIcon sx={{ marginLeft: "8px" }} />{" "}
                      {/* Edit icon */}
                    </span>
                  </Typography>

                  <Typography>
                    Store all Medications in Cool and Dry Place
                  </Typography>
                </Box>

                {/* Action buttons for Print and Download */}
                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton>
                    <Print />
                  </IconButton>
                  <IconButton>
                    <Download />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default OrderDetails;
