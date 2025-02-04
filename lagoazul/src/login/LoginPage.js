import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação
    const isAuthenticated = email === 'admin@ipt.pt' && password === '1';
    if (isAuthenticated) {
      onLogin();
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Email address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  </div>
  );
};
export default LoginPage;