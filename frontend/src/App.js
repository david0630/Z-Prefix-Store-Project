import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import ItemsPage from './components/ItemsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      {isLoggedIn ? (
        <ItemsPage user={user} />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
