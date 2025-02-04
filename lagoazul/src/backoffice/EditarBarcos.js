import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarBarcos = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemAtual, setImagemAtual] = useState('');


  useEffect(() => {
    const fetchBarco = async () => {
      try {
        const response = await fetch(`/interfaceswebtrab/restapi/api.php?type=barcosparavenda&id=${id}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar barco');
        }
        const data = await response.json();
        setNome(data.nome_barco);
        setValor(data.valor);
        setImagemAtual(data.imagem_url);
      } catch (error) {
        console.error('Erro ao carregar dados do barco:', error.message);
        alert('Erro ao carregar os dados do barco.');
      }
    };

    fetchBarco();
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('nome', nome);
    formData.append('valor', valor);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await fetch(`/interfaceswebtrab/restapi/api.php?type=atualizarbarco`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert('Barco atualizado com sucesso!');
        navigate('/listavendas');
      } else {
        alert(`Erro ao atualizar barco: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar barco:', error.message);
      alert('Erro ao salvar alterações.');
    }
};


  return (
    <div className="container mt-5">
      <h2>Editar Barco</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Nome do Barco:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input
            type="number"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagem Atual:</label>
          {imagemAtual && (
            <div>
              <img 
                src={`/interfaceswebtrab/lagoazul/src/uploads/${imagemAtual.split('/').pop()}`} 
                alt="Imagem Atual do Barco" 
                style={{ width: '150px', height: '100px', marginBottom: '10px' }}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Nova Imagem:</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Salvar</button>
      </form>
    </div>
  );
};

export default EditarBarcos;
