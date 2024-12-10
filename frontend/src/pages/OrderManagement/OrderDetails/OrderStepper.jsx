import React from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import {
  AccessTime as ClockIcon, // Icon for "Clock"
  LocalShipping as TruckIcon, // Icon for "Truck"
  LocationOn as LocationIcon, // Icon for "Location"
} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Icon for "Check Circle"
import { styled } from "@mui/material/styles";

// Custom styled connector component for the steps in the stepper
const CustomConnector = styled("span")(({ theme, completed }) => ({
  width: "80%", // Makes the connector width 80%
  borderTop: "1.5px dotted", // Sets a dotted top border for the connector
  borderColor: completed ? "#A26E6C" : "#gray", // Color changes based on whether the step is completed
  position: "absolute",
  top: "25%", // Adjusts the vertical position of the connector
  left: "calc(-60% + 20px)", // Adjusts the left position of the connector
  right: "calc(60% + 20px)", // Adjusts the right position of the connector
}));

// Custom styling for the stepper component
const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-root": {
    flexDirection: "column", // Aligns step labels vertically
    alignItems: "center", // Centers step labels horizontally
  },
  "& .MuiStepLabel-iconContainer": {
    paddingRight: 0, // Removes right padding from the icon container
    marginBottom: theme.spacing(1), // Adds margin below the icon
    zIndex: 1, // Ensures icons are displayed above the connector lines
  },
  "& .MuiStepLabel-label": {
    marginTop: theme.spacing(1), // Adds margin at the top of the label
    color: "#000 !important", // Forces black color for the text labels
  },
  "& .MuiStepConnector-root": {
    display: "none", // Hides the default connector line between steps
  },
  "& .MuiStep-root": {
    position: "relative", // Ensures step is positioned relative for the connector
    padding: "0 16px", // Adds padding for each step
    "&:not(:last-child)": {
      marginRight: theme.spacing(2), // Adds margin to the right for steps except the last one
    },
  },
}));

// Functional component for custom step icons
const CustomStepIcon = ({ active, completed, icon }) => {
  // Function to return the correct icon based on the step's state
  const getIcon = () => {
    if (completed) {
      return <CheckCircleOutlineIcon sx={{ color: "#A26E6C", fontSize: 30 }} />; // Return a completed check icon
    }
    switch (icon) {
      case 1:
        return (
          <CheckCircleOutlineIcon
            sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
          />
        ); // Return a check icon for step 1
      case 2:
        return (
          <ClockIcon
            sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
          />
        ); // Return a clock icon for step 2
      case 3:
        return (
          <TruckIcon
            sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
          />
        ); // Return a truck icon for step 3
      case 4:
        return (
          <LocationIcon
            sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30, ml: -2 }}
          />
        ); // Return a location icon for step 4
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {getIcon()} {/* Display the correct icon */}
    </Box>
  );
};

// Main component to render the order stepper
const OrderStepper = () => {
  const activeStep = 1; // Defines the currently active step (can be dynamic)

  // Steps data for the stepper, including labels and associated icons
  const steps = [
    { label: "Created", icon: CheckCircleOutlineIcon },
    { label: "Dispatched", icon: ClockIcon },
    { label: "In Transit", icon: TruckIcon },
    { label: "Delivered", icon: LocationIcon },
  ];

  return (
    <Box
      sx={{
        width: "58%", // Set width of the stepper container
        py: 3, // Padding along the y-axis
        border: 1, // Border with thickness of 1
        borderColor: "grey", // Gray border color
        borderRadius: 2, // Border radius for rounded corners
      }}
    >
      {/* Custom styled Stepper with activeStep and alternativeLabel */}
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            {index !== 0 && <CustomConnector completed={index <= activeStep} />}{" "}
            {/* Custom connector for steps */}
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon
                  {...props}
                  active={index === activeStep}
                  completed={index < activeStep}
                />
              )}
            >
              <Typography
                sx={{
                  color: "#000", // Set text color to black
                  fontWeight: index === activeStep ? "medium" : "normal", // Apply bold font weight for active step
                }}
              >
                {step.label} {/* Display the label for each step */}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </Box>
  );
};

export default OrderStepper; // Exporting the component to use in other parts of the app
