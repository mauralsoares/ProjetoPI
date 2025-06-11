import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../assets/css/MapTeste.css' // Mantém o CSS por enquanto

// Corrigir ícones do Leaflet no Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const locais = [
  { pos: [38.737, -9.153], nome: 'Estudo 1' },
  { pos: [38.75, -9.2], nome: 'Estudo 2' },
  { pos: [38.73, -9.17], nome: 'Estudo 3' },
  { pos: [38.72, -9.14], nome: 'Estudo 4' },
];

const Mapa = () => {
  return (
    <div className="pagina-mapa">
  <div className="mapa-header">
    <h2>Locais de Estudo</h2>
    <hr className="divider" />
  </div>


  <div className="upload-form mapa-wrapper">
    <MapContainer
      center={[38.736946, -9.142685]}
      zoom={12}
      scrollWheelZoom={true}
      className="mapa"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contribuidores'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locais.map((local, i) => (
        <Marker key={i} position={local.pos}>
          <Popup>{local.nome}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
</div>

  );
};

export default Mapa;