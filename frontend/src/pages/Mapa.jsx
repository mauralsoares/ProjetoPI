import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import '../assets/css/style_final.css';

// Ícone do usuário
const userIcon = L.divIcon({
  html: `<div class="icon-usuario"><span>📍</span></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Ícone dos locais
const localIcon = L.divIcon({
  html: `<div class="icon-local"><span>📘</span></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Componente para animar o mapa até o local clicado
const FlyToLocal = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 17, { duration: 1.5 });
    }
  }, [position]);

  return null;
};

const Mapa = () => {
  const [locais, setLocais] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [localSelecionado, setLocalSelecionado] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosicaoAtual([latitude, longitude]);
      },
      (err) => {
        console.error('Erro ao obter localização:', err);
        setPosicaoAtual([38.736946, -9.142685]);
      }
    );

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

  return (
    <div className="pagina-mapa">
      <div className="mapa-header">
        <h2>Locais de Estudo</h2>
        <hr className="divider" />
      </div>

      <div className="upload-form mapa-wrapper">
        {/* Mapa à esquerda */}
        <div className="map-section">
          {posicaoAtual && (
            <MapContainer
              center={posicaoAtual}
              zoom={13}
              scrollWheelZoom={true}
              className="mapa"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {localSelecionado && <FlyToLocal position={localSelecionado} />}

              <Marker position={posicaoAtual} icon={userIcon}>
                <Popup>Você está aqui</Popup>
              </Marker>

              {locais.map((local, index) => {
                const coords = local.localizacao?.coordinates;
                if (!coords || coords.length !== 2) return null;

                const [lng, lat] = coords;
                return (
                  <Marker key={index} position={[lat, lng]} icon={localIcon}>
                    <Popup>
                      <strong>{local.nome || 'Sem nome'}</strong><br />
                      {local.morada || 'Morada não disponível'}<br />
                      
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </div>

        {/* Lista à direita */}
        <div className="lista-locais-lateral">
          <h3>Locais Registrados</h3>

          <ul className="lista-itens scrollável">
            {locais.map((local, index) => {
              const coords = local.localizacao?.coordinates;
              return (
                <li
                  key={index}
                  className="item-local"
                  onClick={() => {
                    if (coords && coords.length === 2) {
                      const [lng, lat] = coords;
                      setLocalSelecionado([lat, lng]);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{local.nome || 'Sem nome'}</strong><br />
                  <span>{local.morada || 'Morada não disponível'}</span>
                  <hr className="separador" />
                  <span className="descricao-local">{local.descricao || 'Sem descrição'}</span><br />
                  
                </li>
              );
            })}
          </ul>

          <div className="btn-fixado-wrapper">
            <button
              className="btn-salvar"
              onClick={() => window.location.href = '/locaisestudo'}
            >
              ➕ Adicionar Novo Local
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
