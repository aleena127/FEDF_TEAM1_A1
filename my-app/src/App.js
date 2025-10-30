import React from 'react';  
import WeatherApp from './weatherApp';
import logo from './logo.svg';
import Login from './login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    
    <div className="App">
      {isLoggedIn ? (
       <WeatherApp/>
      ) : (
      <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
