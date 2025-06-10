import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../assets/css/UploadResumo.css';

const UploadResumo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cadeira: '',
    descricao: '',
    file: null,
  });

  const [cadeiras, setCadeiras] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/lists/ucs')
      .then(response => {
        setCadeiras(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar cadeiras:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCadeiraChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      cadeira: selectedOption.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Aqui você pode usar fetch/Axios para enviar o formulário
  };

  const cadeiraOptions = cadeiras.map(c => ({
    value: c,
    label: c,
  }));

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
          <Select
            options={cadeiraOptions}
            onChange={handleCadeiraChange}
            classNamePrefix="react-select"
            placeholder="Escolha uma cadeira..."
          />

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
