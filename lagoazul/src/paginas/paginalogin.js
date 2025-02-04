import React from 'react'
import LoginPage from '../login/LoginPage';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Paginalogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
     {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Navigate to="/listaclientes" replace />
      )}
    </div>
  );
}

export default Paginalogin;
