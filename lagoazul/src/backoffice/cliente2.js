import React, { useState } from 'react';
import Navbaroffice from '../navs/Navback';
import './formulario.css';

const AddCliente = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nif, setNif] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [nomeBarco, setNomeBarco] = useState(''); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/interfaceswebtrab/restapi/api.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, nif, telemovel, nome_mar: nomeBarco }), 
      });
      const result = await response.json();
      if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        setNome('');
        setEmail('');
        setNif('');
        setTelemovel('');
        setNomeBarco(''); 
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao adicionar cliente');
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <Navbaroffice />
      </div>
      <div className="cliente2-page" style={{ margin: '20px' }}>
        {}
        <div className="form-container" style={{ marginTop: '50px' }}>
          <p className="title">Adicionar Cliente</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nome">Nome do Cliente</label>
              <input
                placeholder=""
                id="username"
                name="username"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="telemovel">Telemóvel</label>
              <input
                placeholder=""
                id="telemovel"
                name="phone"
                type="tel"
                value={telemovel}
                onChange={(e) => setTelemovel(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                placeholder=""
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="nif">NIF</label>
              <input
                placeholder=""
                type="text"
                value={nif}
                onChange={(e) => setNif(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nomeBarco">Nome do Barco</label>
              <input
                id="nomeBarco"
                type="text"
                value={nomeBarco}
                onChange={(e) => setNomeBarco(e.target.value)}
                required
              />
            </div>
            <button style={{ marginTop: '6%' }} className="sign" type="submit">Adicionar</button>
          </form>
          <div className="social-message">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCliente;
