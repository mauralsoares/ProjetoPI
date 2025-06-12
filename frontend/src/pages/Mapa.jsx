import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import '../assets/css/mapa.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const Mapa = () => {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/studyspots');
        console.log('📍 Locais recebidos do backend:', res.data);
        setLocais(res.data);
      } catch (err) {
        console.error('Erro ao buscar locais de estudo:', err);
      }
    };

    fetchLocais();
  }, []);

  return (
    <div className="pagina-mapa">
      <div className="mapa-header">
        <h2>Locais de Estudo</h2>
        <hr className="divider" />
      </div>

      <div className="upload-form mapa-wrapper">
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

          {locais.map((local, index) => {
            const coords = local.localizacao?.coordinates;
            if (!coords || coords.length !== 2) {
              console.warn('⚠️ Local ignorado por dados inválidos:', local);
              return null;
            }

            const [lng, lat] = coords;
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>{local.nome || 'Local sem nome'}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
