import React, { useState } from 'react';
import '../assets/css/UploadResumo.css';

const UploadResumo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cadeira: '',
    descricao: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Aqui você pode usar fetch/Axios para enviar o formulário
  };

  return (
    <div className="upload-resumo-wrapper">
      <div className="upload-resumo-container">
        <div className="upload-resumo-header">
          <h2>Upload de Resumo</h2>
          <hr className="divider" />
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Nome do Resumo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label>Nome da Cadeira</label>
          <select
            name="cadeira"
            value={formData.cadeira}
            onChange={handleChange}
            required
          >
            <option value="">Escolha uma cadeira...</option>
            <option value="Programação">Programação</option>
            <option value="Bases de Dados">Bases de Dados</option>
            <option value="Matemática">Matemática</option>
          </select>

          <label>Descrição do Resumo</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Descreve brevemente o conteúdo do resumo..."
          />

          <label>Adicionar Ficheiro</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
          />

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default UploadResumo;
