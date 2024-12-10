import React from 'react'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signin } from '../../../api/api';
import logo from "../../../assets/images/logo.svg"; // Logo image
import { FaEyeSlash } from "react-icons/fa"; // Eye icon for hiding password
import { FaEye } from "react-icons/fa"; // Eye icon for showing password
import "./SigninPage.css"; // Import CSS for styling the page

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await signin({email,password});
      if(response.message){
        alert('Signin successful');
        navigate('/order-details');
      }else{
        throw new Error('Signin failed');
      }
    }
    catch(error){
      alert('Failed to signin. Please check your information and try again.');
    }
   }

  return (
    <div className="container">
      {/* Left section containing the form and branding */}
      <div className="left-section-1">
        <div className="logo-1">
          <img src={logo} alt="" /> {/* Display logo */}
        </div>
        <div className="card-1">
          <h2 className="heading2">Log in</h2>
          <form className="form-group-1" action="" onSubmit={handleSubmit}>
            {/* Input field for the user's email */}
            <div className="margin">
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
            
              <button className="forgot-button" type="submit">
                Forgot Password
              </button>

            {/* Submit button for signing up */}
            <button className="SigninButton" type="submit">
              Log In
            </button>
          </form>

          <img src="" alt="" />
          {/* Link to the sign-in page if the user already has an account */}
          <p className="account-1">
            Don't have an account?{" "}
            <Link className="login-link" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
      {/* Right section with a background image */}
      {/* <div className="right-section-1">
        <img className="image-medicine" src={MedicineImage} alt="" />
      </div> */}
    </div>
  );
}

export default SignInPage