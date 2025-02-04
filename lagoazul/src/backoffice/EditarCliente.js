import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarCliente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();


  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nif, setNif] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [nomeMar, setNomeMar] = useState(''); 


  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`/interfaceswebtrab/restapi/api.php?id=${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do cliente');
        }

        const data = await response.json();
        setNome(data.nome);
        setEmail(data.email);
        setNif(data.nif);
        setTelemovel(data.telemovel);
        setNomeMar(data.nome_mar || '');
      } catch (error) {
        console.error('Erro ao carregar os dados do cliente:', error.message);
        alert('Erro ao carregar os dados do cliente.');
      }
    };

    fetchCliente();
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/interfaceswebtrab/restapi/api.php', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,         
          nome,       
          email,      
          nif,       
          telemovel,  
          nome_mar: nomeMar, 
        }),
      });

      if (response.ok) {
        alert('Cliente e barco atualizados com sucesso!');
        navigate('/paginalista');
      } else {
        const result = await response.json();
        alert(`Erro ao atualizar cliente: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error.message);
      alert('Erro ao salvar alterações.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>NIF:</label>
          <input
            type="text"
            className="form-control"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Telemóvel:</label>
          <input
            type="text"
            className="form-control"
            value={telemovel}
            onChange={(e) => setTelemovel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome do Barco:</label>
          <input
            type="text"
            className="form-control"
            value={nomeMar}
            onChange={(e) => setNomeMar(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Salvar</button>
      </form>
    </div>
  );
};

export default EditarCliente;
