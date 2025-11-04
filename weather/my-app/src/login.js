import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://weather-api-zk5f.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Login successful!");
        onLogin(); // navigates to WeatherApp after login
      } else {
        alert("❌ Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("⚠️ Unable to connect to server. Make sure backend is running.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p>Welcome back! Please enter your credentials.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="small-text">
          <p>
            Forgot your password?{" "}
            <Link to="/forgot-password" className="link">
              Reset here
            </Link>
          </p>
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
//
