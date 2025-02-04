import React, { useState } from 'react';
import './formulario.css';

const AdicionarBarcoForm = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('valor', valor);
    formData.append('imagem', imagem);

    try {
      const response = await fetch('/interfaceswebtrab/restapi/api.php?type=adicionarbarco', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text(); 
      console.log('Response text:', text); 

      try {
        const result = JSON.parse(text); 
        if (response.ok) {
          alert('Barco adicionado com sucesso!');
          setNome('');
          setValor('');
          setImagem(null);
          document.getElementById('imagem').value = null; 
        } else {
          alert(`Erro: ${result.message}`);
        }
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
        alert('Erro ao analisar JSON.');
      }
    } catch (error) {
      console.error('Erro ao adicionar barco:', error);
      alert('Erro ao adicionar barco.');
    }
  };

  return (
    <div className="cliente2-page" style={{ margin: '20px' }}>
      <div className="form-container">
        <p className="title">Adicionar Barco</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome:</label>
            <input
              placeholder=""
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Valor:</label>
            <input
              placeholder=""
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Imagem:</label>
            <input
              id="imagem"
              placeholder=""
              type="file"
              onChange={(e) => setImagem(e.target.files[0])}
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
  );
};

export default AdicionarBarcoForm;


