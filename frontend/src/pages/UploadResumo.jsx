import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../assets/css/UploadResumo.css';

const UploadResumo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cadeira: '',
    descricao: '',
    curso: '',
    tipo: '',
    ficheiro: null,
  });

  const [cadeiras, setCadeiras] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cursosComTipo = [
    "Engenharia Informática (Licenciatura)",
    "Gestão de Sistemas de Informação (Mestrado)",
    "Psicologia (Doutoramento)",
    "Outro curso qualquer (Licenciatura)",
    "outro"
  ];

  useEffect(() => {
    const fetchCadeiras = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/lists/ucs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCadeiras(res.data);
      } catch (error) {
        console.error('Erro ao buscar cadeiras:', error);
      }
    };

    fetchCadeiras();
  }, []);

  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        ficheiro: file,
        tipo: getFileExtension(file.name)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    const { nome, cadeira, descricao, curso, tipo, ficheiro } = formData;

    console.log('📤 Enviando:', { nome, cadeira, curso, tipo, descricao });

    if (!cadeira || !curso || !tipo || !ficheiro) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append('titulo', nome);
    data.append('uc', cadeira);
    data.append('descricao', descricao);
    data.append('curso', curso);
    data.append('tipo', tipo);
    data.append('ficheiro', ficheiro);

    try {
      const res = await axios.post('http://localhost:4000/api/uploads', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log('✅ Upload bem-sucedido:', res.data);

      setSuccessMessage('Resumo enviado com sucesso!');
      setFormData({
        nome: '',
        cadeira: '',
        descricao: '',
        curso: '',
        tipo: '',
        ficheiro: null,
      });
    } catch (error) {
      console.error('❌ Erro ao enviar:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.erro || 'Erro ao enviar resumo. Verifique os dados.');
    }

    setIsSubmitting(false);
  };

  const cadeiraOptions = cadeiras.map(c => ({ value: c, label: c }));
  const cursoOptions = cursosComTipo.map(c => ({ value: c, label: c }));

  return (
    <div className="upload-resumo-wrapper">
      <div className="upload-resumo-container">
        <div className="upload-resumo-header">
          <h2>Carregar Resumo</h2>
          <hr className="divider" />
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Título do Resumo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label>Unidade Curricular</label>
          <Select
            options={cadeiraOptions}
            onChange={(opt) => setFormData((prev) => ({ ...prev, cadeira: opt.value }))}
            placeholder="Escolha uma unidade curricular..."
          />

          <label>Curso</label>
          <Select
            options={cursoOptions}
            onChange={(opt) => setFormData((prev) => ({ ...prev, curso: opt.value }))}
            placeholder="Selecione o curso"
          />

          <label>Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Descreva brevemente o conteúdo do resumo..."
          />

          <label>Adicionar ficheiro</label>
          <input
            type="file"
            name="ficheiro"
            onChange={handleChange}
            required
          />

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'A enviar...' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResumo;
