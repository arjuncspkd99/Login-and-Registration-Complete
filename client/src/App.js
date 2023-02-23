import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import RegistrationLoginPage from './components/RegistrationLoginPage';

function App() {
  const [showRegistration, setShowRegistration] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistration(true);
    setShowLogin(false);
  }

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegistration(false);
  }

  return (
    <div className="App">
      {showRegistration && <RegistrationLoginPage />}
      {showLogin && <Login />}
      {!showRegistration && !showLogin && (
        <>
          <button onClick={handleShowRegistration}>Register</button>
          <button onClick={handleShowLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;