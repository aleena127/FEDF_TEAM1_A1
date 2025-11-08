import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

// CRITICAL FIX: The key must match the name set in the Render dashboard: REACT_APP_BACKEND_URL
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // ✅ Uses the dynamic API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/signup`, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        // NOTE: The backend will likely need the 'email' field for registration
        body: JSON.stringify({ username, email, password }), 

      });

      const data = await response.json();
      // Using window.alert for simplicity, but best practice is a custom modal UI
      alert(data.message); 
      if (data.success) navigate("/");
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Sign Up</h2>
        <p>Create your account to start using the Weather App.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <p className="small-text">
          Already have an account?{" "}
          <Link to="/" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
