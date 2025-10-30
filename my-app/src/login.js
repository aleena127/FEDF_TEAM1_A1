import React, { useState } from "react";
import './App.css';
import './login.css';

function Login({onLogin}){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(username==="user" && password==="password"){
      onLogin();
    }else{
      alert("Invalid credentials");
    }
  };
  return(
    
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
          <br/>
          <button type="submit">Login</button>
        </form>
      </div>
  );
}

export default Login;
      