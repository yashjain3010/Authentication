import { useState } from "react";
import { signin } from "../api/api";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin({ email, password });
      if (response.token) {
        navigate("/");
      } else {
        throw new Error("Signin failed");
      }
    } catch (err) {
      alert("Failed to sign in. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form action="" onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
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
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SignInPage;
