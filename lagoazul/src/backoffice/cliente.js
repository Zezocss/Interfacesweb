import React, { useState } from 'react';

const AddUserForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nif, setNif] = useState('');
  const [telemovel, setTelemovel] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/restapi/api.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, nif, telemovel }),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Utilizador adicionado com sucesso!');
      setNome('');
      setEmail('');
      setNif('');
      setTelemovel('');
    } else {
      alert(`Erro: ${result.message}`);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Adicionar Utilizador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>NIF:</label>
          <input
            type="number"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            required
          />
        </div>
        <div>
          <label>telemovel:</label>
          <input
            type="tel"
            pattern="[0-9]{9}"
            value={telemovel}
            onChange={(e) => setTelemovel(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddUserForm;
