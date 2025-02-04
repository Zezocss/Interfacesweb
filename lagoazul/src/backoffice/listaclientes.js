import React, { useState, useEffect } from 'react';
import './lista.css'; 

const ListaClientes = () => {
  // Estado para a lista de utilizadores
  const [users, setUsers] = useState([]);

  // Função para buscar utilizadores da API (GET)
  const fetchUsers = async () => {
    try {
      const response = await fetch('/interfaceswebtrab/restapi/api.php', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar utilizadores');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao buscar utilizadores.');
    }
  };

  // Função para apagar um utilizador
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/interfaceswebtrab/restapi/api.php?id=${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Erro ao apagar utilizador');
      }
      alert('Utilizador apagado com sucesso!');
      fetchUsers(); // Atualizar a lista após apagar
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao apagar utilizador.');
    }
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      {users.length > 0 ? (
        <div className="table-container"> {}
          <table className="user-list">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>NIF</th>
                <th>Telemóvel</th>
                <th>Barco</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>{user.nif}</td>
                  <td>{user.telemovel}</td>
                  <td>{user.nome_mar}</td>
                  <td>
               
  <button
    className="btn btn-primary"
    onClick={() => window.location.href = `/editarcliente/${user.id_cliente}`}
  >
    Editar
  </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id_cliente)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum utilizador encontrado.</p>
      )}
    </div>
  );
};

export default ListaClientes;
