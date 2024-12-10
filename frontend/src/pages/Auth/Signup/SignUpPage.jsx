// Import necessary dependencies from React, React Router, and other packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../api/api"; // Import the signup function from the API file// Image for the page's right section
import logo from "../../../assets/images/logo.svg"; // Logo image
import { FaEyeSlash } from "react-icons/fa"; // Eye icon for hiding password
import { FaEye } from "react-icons/fa"; // Eye icon for showing password
import "./SignUpPage.css"; // Import CSS for styling the page

// Define the SignUpPage component
const SignUpPage = () => {
  // State hooks to manage form inputs
  const [name, setName] = useState(""); // Stores the user's name
  const [email, setEmail] = useState(""); // Stores the user's email
  const [password, setPassword] = useState(""); // Stores the user's password
  const [showPassword, setShowPassword] = useState(false); // Manages password visibility

  // Hook for navigating between routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await signup({ name, email, password }); // Call the signup function

      // Check if signup was successful
      if (response.message) {
        alert("Signup successful! Please sign in."); // Alert on success
        navigate("/signin"); // Redirect to the signin page
      } else {
        throw new Error("Signup failed"); // Throw error if signup unsuccessful
      }
    } catch (err) {
      alert("Failed to sign up. Please check your information and try again."); // Alert on failure
    }
  };

  return (
    <div className="container">
      {/* Left section containing the form and branding */}
      <div className="left-section">
        <div className="logo">
          <img src={logo} alt="" /> {/* Display logo */}
        </div>
        <div className="card">
          <h2 className="heading-2">Create Account</h2>
          <p className="para-1">
            Fill your information below or register with your social account
          </p>
          <form className="form-group" action="" onSubmit={handleSubmit}>
            {/* Input field for the user's name */}
            <div>
              <label className="labels" htmlFor="">
                Name
              </label>
              <div className="input1">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  className="inputs"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {/* Input field for the user's email */}
            <div>
              <label className="labels" htmlFor="">
                Email
              </label>
              <div className="input1">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  className="inputs"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Input field for the user's password */}
            <label className="labels" htmlFor="password">
              Password
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} // Toggle visibility
                id="password"
                placeholder="Your password"
                value={password}
                className="inputs"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Icon to toggle password visibility */}
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {/* Checkbox for agreeing to terms */}
            <div className="checkbox-para">
              <label className="checkbox-label">
                <input type="checkbox" className="custom-checkbox" />
                <span className="label-text">
                  I agree with Privacy Policy and Terms and Conditions
                </span>
              </label>
            </div>
            {/* Submit button for signing up */}
            <button className="SignupButton" type="submit">
              Sign Up
            </button>
          </form>
          {/* Link to the sign-in page if the user already has an account */}
          <p className="account-1">
            Already have an account?{" "}
            <Link className="login-link" to="/signin">
              Log In
            </Link>
          </p>
        </div>
      </div>
      {/* Right section with a background image */}
      {/* <div className="right-section">
        <img className="image-medicine" src={MedicineImage} alt="" />
      </div> */}
    </div>
  );
};

export default SignUpPage;
