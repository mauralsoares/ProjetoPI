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

// Componente para mover o mapa até o local clicado
const FlyToLocal = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 17, { duration: 1.5 });
    }
  }, [position]);

  return null;
};

const MeusLocais = () => {
  const [locais, setLocais] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosicaoAtual([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Erro ao obter localização:', err);
        setPosicaoAtual([38.736946, -9.142685]); // fallback para Lisboa
      }
    );

    const fetchMeusLocais = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/studyspots/meuslocais', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setLocais(res.data);
      } catch (err) {
        setErro('Erro ao buscar os seus locais.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeusLocais();
  }, []);

  const apagarLocal = async (id) => {
    if (!window.confirm("Deseja mesmo apagar este local?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/studyspots/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setLocais(locais.filter(local => local._id !== id));
    } catch (err) {
      alert("Erro ao apagar local.");
    }
  };

  return (
    <div className="pagina-mapa">
      <div className="mapa-header">
        <h2>Meus Locais de Estudo</h2>
        <hr className="divider" />
      </div>

      <div className="mapa-wrapper">
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

              <Marker position={posicaoAtual} icon={userIcon}>
                <Popup>Você está aqui</Popup>
              </Marker>

              {localSelecionado && <FlyToLocal position={localSelecionado} />}

              {locais.map((local) => {
                const coords = local.localizacao?.coordinates;
                if (!coords || coords.length !== 2) return null;
                const [lng, lat] = coords;

                return (
                  <Marker key={local._id} position={[lat, lng]} icon={localIcon}>
                    <Popup>
                      <strong>{local.nome || 'Sem nome'}</strong><br />
                      {local.morada || 'Morada não disponível'}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </div>

        {/* Lista à direita */}
        <div className="lista-locais-lateral">
          <h3>Meus Locais</h3>

          {loading ? (
            <p className="descricao-local" style={{ textAlign: 'center' }}>Carregando...</p>
          ) : erro ? (
            <p className="error">{erro}</p>
          ) : locais.length === 0 ? (
            <p className="descricao-local" style={{ textAlign: 'center' }}>Você ainda não adicionou nenhum local.</p>
          ) : (
            <ul className="lista-itens scrollável">
              {locais.map((local) => {
                const coords = local.localizacao?.coordinates;
                return (
                  <li
                    key={local._id}
                    className="item-local"
                    onClick={() => {
                      if (coords && coords.length === 2) {
                        const [lng, lat] = coords;
                        setLocalSelecionado([lat, lng]);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{local.nome}</strong><br />
                    <span>{local.morada}</span><br />
                    <span className="descricao-local">{local.descricao}</span><br />
                    <button className="btn-salvar" onClick={() => apagarLocal(local._id)} style={{ marginTop: '10px' }}>
                      🗑️ Apagar
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

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

export default MeusLocais;
