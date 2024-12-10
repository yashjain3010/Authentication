import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    alias: "",
    abhanumber: "",
    email: "",
    phoneNumber: "",
    age: "",
    sex: "",
    address1: "",
    address2: "",
    address: "", // Combined address
    pincode: "",
    station: "",
    swilId: "", // Added to match model
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the specific field
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Explicitly set address as concatenation of address1 and address2
    updatedFormData.address =
      `${updatedFormData.address1}, ${updatedFormData.address2}`.replace(
        /^, |, $/g,
        ""
      );

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission - match exact schema requirements
    const submissionData = {
      fullname: formData.fullname,
      alias: formData.alias,
      abhanumber: formData.abhanumber
        ? parseInt(formData.abhanumber)
        : undefined,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      age: parseInt(formData.age),
      sex: formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1), // Capitalize first letter
      address: `${formData.address1}, ${formData.address2}`.replace(
        /^, |, $/g,
        ""
      ),
      pincode: parseInt(formData.pincode),
      station: formData.station,
      swilId: formData.swilId || undefined, // Optional field
    };

    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:3000/api/create-customer",
        submissionData
      );

      // Handle successful submission
      setOpenSuccessSnackbar(true);

      // Reset form after successful submission
      setFormData({
        fullname: "",
        alias: "",
        abhanumber: "",
        email: "",
        phoneNumber: "",
        age: "",
        sex: "",
        address1: "",
        address2: "",
        address: "",
        pincode: "",
        station: "",
        swilId: "",
      });
    } catch (error) {
      // Handle error
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while creating customer"
      );
      setOpenErrorSnackbar(true);
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper sx={{ padding: "30px" }}>
        <Typography sx={{ marginBottom: "2rem" }}>
          <strong>Customer Details</strong>
        </Typography>

        <TextField
          name="fullname"
          label="Full Name"
          sx={{ width: "100%", marginBottom: "1rem" }}
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <TextField
          name="alias"
          label="Alias"
          sx={{ width: "48.25%", marginRight: "1.5rem", marginBottom: "1rem" }}
          value={formData.alias}
          onChange={handleChange}
          required
        />
        <TextField
          name="abhanumber"
          label="Abha Number"
          sx={{ width: "48.25%", marginBottom: "1rem" }}
          value={formData.abhanumber}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          sx={{ width: "48.25%", marginRight: "1.5rem", marginBottom: "1rem" }}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          sx={{ width: "48.25%", marginBottom: "1rem" }}
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextField
          name="age"
          label="Age"
          type="number"
          sx={{ width: "48.25%", marginRight: "1.5rem", marginBottom: "1rem" }}
          value={formData.age}
          onChange={handleChange}
          required
        />
        <TextField
          select
          name="sex"
          label="Sex"
          sx={{ width: "48.25%", marginBottom: "1rem" }}
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <MenuItem value="">Select sex</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          name="address1"
          label="Address Line 1"
          sx={{ width: "100%", marginBottom: "1rem" }}
          value={formData.address1}
          onChange={handleChange}
          required
        />
        <TextField
          name="address2"
          label="Address Line 2"
          sx={{ width: "100%", marginBottom: "1rem" }}
          value={formData.address2}
          onChange={handleChange}
          required
        />
        <TextField
          name="pincode"
          label="Pincode"
          sx={{ width: "48.25%", marginRight: "1.5rem", marginBottom: "1rem" }}
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <TextField
          name="station"
          label="Station"
          sx={{ width: "48.25%", marginBottom: "1rem" }}
          value={formData.station}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="contained"
          sx={{
            marginTop: "1rem",
            width: "100%",
            backgroundImage:
              "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
            color: "white", // White text color
            textTransform: "none", // No text transformation (no uppercase)
          }}
        >
          Create Customer
        </Button>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Customer created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerForm;
