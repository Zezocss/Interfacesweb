import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './barcosparavenda.css';

const Barcosparavenda = () => {
  const [barcos, setBarcos] = useState([]);
  const [search, setSearch] = useState('');

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

  return (
    <div className="container">
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
        <div className="mosaic">
          {barcos.map((barco, index) => (
            <div key={index} className="card">
              <img src={`/interfaceswebtrab/lagoazul/src/uploads/${barco.imagem_url.split('/').pop()}`} alt={barco.nome_barco} />
              <h3>{barco.nome_barco}</h3>
              <p>Preço: {barco.valor}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum barco encontrado.</p>
      )}
    </div>
  );
};

export default Barcosparavenda;