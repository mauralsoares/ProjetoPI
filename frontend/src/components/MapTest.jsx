//http://localhost:5173/mapa-teste
//http://localhost:80/mapa-teste
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapTeste.css';

// Corrigir ícones (Leaflet não lida bem com paths por defeito no Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const MapaTeste = () => {
  const position = [38.736946, -9.142685]; // Localização de Lisboa

  return (
    <div className="mapa-teste" style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contribuidores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Aqui está o Todo-Poderoso Tomás! 💪<br />Em Lisboa.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaTeste;
// Nota: Certifica-te que tens o Leaflet instalado com `npm install leaflet react-leaflet`
// e que o CSS do Leaflet está importado no teu projeto.