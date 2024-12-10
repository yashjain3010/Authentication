// Import the jsonwebtoken library for verifying tokens
const jwt = require("jsonwebtoken");

// Middleware function to authenticate requests
const authMiddleware = (req, res, next) => {
  // Extract the token from the 'Authorization' header and remove the 'Bearer ' prefix
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({
      error: "Access denied",
    });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload (e.g., user information) to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 400 Bad Request error with an appropriate message
    return res.status(400).json({
      error: "Invalid token",
    });
  }
};

// Export the authMiddleware function for use in protecting routes
module.exports = authMiddleware;
