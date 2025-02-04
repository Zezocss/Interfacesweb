import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../frontoffice/barcosparavenda.css';

const BarcosParaVendaBackoffice = () => {
  const [barcos, setBarcos] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 

  const fetchBarcos = async (searchQuery = '') => {
    try {
      const response = await fetch(`/interfaceswebtrab/restapi/api.php?type=barcosparavenda&search=${searchQuery}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar barcos para venda');
      }
      const data = await response.json();
      setBarcos(data);
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao buscar barcos para venda.');
    }
  };

  const deleteBarco = async (id) => {
    try {
      const response = await fetch(`/interfaceswebtrab/restapi/api.php?type=deletebarco&id=${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Erro ao apagar barco');
      }
      const result = await response.json();
      alert(result.message);
      fetchBarcos(); 
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao apagar barco.');
    }
  };

  useEffect(() => {
    fetchBarcos();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBarcos(search);
  };

  const handleEdit = (id) => {
    navigate(`/editarbarco/${id}`); 
  };

  return (
    <div className="container">
      {}
      <form className="form-inline mb-4" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="form-control mr-2"
          value={search}
          onChange={handleSearchChange}
          placeholder="Pesquisar barcos"
        />
        <button type="submit" className="btn btn-primary">Pesquisar</button>
      </form>

      {barcos.length > 0 ? (
        <div className="mosaic" style={{ marginTop: '5px' }}>
          {barcos.map((barco, index) => (
            <div key={index} className="card">
              <img
                src={`/interfaceswebtrab/lagoazul/src/uploads/${barco.imagem_url.split('/').pop()}`}
                alt={barco.nome_barco}
                className="img-fluid"
              />
              <h3>{barco.nome_barco}</h3>
              <p>Preço: {barco.valor}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(barco.id_venda)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBarco(barco.id_venda)}
                >
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum barco encontrado.</p>
      )}
    </div>
  );
};

export default BarcosParaVendaBackoffice;
