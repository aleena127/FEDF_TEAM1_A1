import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://weather-api-zk5f.onrender.com/forgot-password", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok || data.success) {
        alert(data.message || "If your email exists, a reset link was sent.");
        setEmail("");
      } else {
        alert(data.message || "Unable to send reset link. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Forgot Password</h2>
        <p className="forgot-text">Enter your registered email to receive a reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="small-text" style={{ marginTop: "12px" }}>
          <p>
            Remembered your password?{" "}
            <Link to="/" className="link">
              Go back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
