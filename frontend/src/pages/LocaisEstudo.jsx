import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import '../assets/css/style_final.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const MapaAutoCenter = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 17);
    }
  }, [position]);

  return null;
};

const Mapa = () => {
  const [locais, setLocais] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    morada: '',
    cidade: '',
    codPostal: '',
    latitude: '',
    longitude: ''
  });
  const [erro, setErro] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [novoMarker, setNovoMarker] = useState(null);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/studyspots');
        setLocais(res.data);
      } catch (err) {
        console.error('Erro ao buscar locais de estudo:', err);
      }
    };
    fetchLocais();
  }, []);

  const geocodificarEndereco = async () => {
    const { morada, cidade, codPostal } = formData;
    const endereco = `${morada}, ${codPostal}, ${cidade}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    try {
      const res = await axios.get(url);
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lon
        });
        setNovoMarker([parseFloat(lat), parseFloat(lon)]);
        setErro('');
      } else {
        setErro('Endereço não encontrado.');
      }
    } catch (err) {
      setErro('Erro ao geocodificar o endereço.');
    }
  };

  const handleSubmit = async () => {
    const { nome, descricao, latitude, longitude, morada, cidade, codPostal } = formData;

    if (!nome || !descricao || !latitude || !longitude || !morada || !cidade || !codPostal) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/studyspots', {
        nome,
        descricao,
        morada,
        cidade,
        codPostal,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setFormData({
        nome: '',
        descricao: '',
        morada: '',
        cidade: '',
        codPostal: '',
        latitude: '',
        longitude: ''
      });
      setErro('');
      setNovoMarker(null);

      const res = await axios.get('http://localhost:4000/api/studyspots');
      setLocais(res.data);

      setSuccessMessage('Local salvo com sucesso!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setErro('Erro ao salvar local.');
    }
  };

  return (
    <div className="pagina-mapa">
      <div className="mapa-header">
        <h2>Adicionar Novo Local de Estudo</h2>
        <hr className="divider" />
      </div>

      <div className="mapa-wrapper">
        {/* Formulário - ESQUERDA */}
        <div className="form-section">
          <input
            type="text"
            placeholder="Nome do local"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <textarea
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          />
          <input
            type="text"
            placeholder="Morada"
            value={formData.morada}
            onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={formData.codPostal}
            onChange={(e) => setFormData({ ...formData, codPostal: e.target.value })}
          />
          <div className="btn-coordenadas-wrapper">
            <button type="button" className="btn-coordenadas" onClick={geocodificarEndereco}>
              Obter Coordenadas
            </button>
          </div>

          <input type="text" placeholder="Latitude" value={formData.latitude} readOnly />
          <input type="text" placeholder="Longitude" value={formData.longitude} readOnly />

          {erro && <p className="error">{erro}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="botoes-centrados">
            <button className="btn-salvar" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>

        {/* Mapa - DIREITA */}
        <div className="map-section">
          <MapContainer
            center={[38.736946, -9.142685]}
            zoom={13}
            scrollWheelZoom={true}
            className="mapa"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {novoMarker && (
              <>
                <Marker position={novoMarker}>
                  <Popup>Novo local</Popup>
                </Marker>
                <MapaAutoCenter position={novoMarker} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
