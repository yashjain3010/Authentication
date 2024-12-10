// Import the Navigate component from react-router-dom to handle redirects
import { Navigate } from "react-router-dom";

// ProtectedRoute component that checks for a valid authentication token
const ProtectedRoute = ({ children }) => {
  // Retrieve the authentication token from localStorage
  const token = localStorage.getItem("token");

  // If no token is found (i.e., the user is not authenticated), redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If the token exists (user is authenticated), render the protected route's children (the content)
  return children;
};

// Export the ProtectedRoute component to use in other parts of the app
export default ProtectedRoute;
