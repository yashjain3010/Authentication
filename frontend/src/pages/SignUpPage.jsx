import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup({ name, email, password });
      if (response.message) {
        alert("Signup successful! Please sign in.");
        navigate("/");
      } else {
        throw new Error("Signup failed");
      }
    } catch (err) {
      alert("Failed to sign up. Please check your information and try again.");
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form action="" onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <h3>Name</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3>Email</h3>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
