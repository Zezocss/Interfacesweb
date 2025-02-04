import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import lagoazul from '../image/lagoazul.png'; 

const Navbaroffice = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={lagoazul} alt="Backoffice" className="navbar-logo" /> {}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/clientes">Adicionar Cliente</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/paginalista">Lista de Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adicionarbarco">Adicionar Venda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listavendas">Lista de Vendas</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbaroffice;
