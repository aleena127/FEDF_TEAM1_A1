import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherApp from "./weatherApp";
import Login from "./login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <WeatherApp />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
