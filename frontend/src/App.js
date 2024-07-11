// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemsPage from './components/ItemsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <ItemsPage user={user} handleLogout={handleLogout} />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
