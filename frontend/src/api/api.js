// Base URL for the API endpoints
const API_URL = "http://localhost:3000/api";

// Function to handle user signup
// Takes userData as input and sends a POST request to the signup endpoint
const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST", // HTTP method for sending data
      headers: {
        "Content-Type": "application/json", // Specify the request payload type
      },
      body: JSON.stringify(userData), // Convert user data to JSON format
    });

    // Parse the JSON response from the server
    const data = await response.json();
    return data; // Return the server response to the caller
  } catch (err) {
    console.error("Error Signing up", err); // Log the error if the request fails
    throw err; // Propagate the error for further handling
  }
};

// Function to handle user signin
// Takes userData as input and sends a POST request to the signin endpoint
const signin = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST", // HTTP method for sending data
      headers: {
        "Content-Type": "application/json", // Specify the request payload type
      },
      body: JSON.stringify(userData), // Convert user data to JSON format
    });

    // Parse the JSON response from the server
    const data = await response.json();

    // If a token is received, store it in localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data; // Return the server response to the caller
  } catch (error) {
    console.error("Error Signing in", error); // Log the error if the request fails
    throw error; // Propagate the error for further handling
  }
};

// Function to retrieve the stored token from localStorage
const getToken = () => localStorage.getItem("token");

// Function to log the user out by removing the token from localStorage
const logout = () => {
  localStorage.removeItem("token");
};

// Export the functions for use in other parts of the application
export { signup, signin, getToken, logout };
