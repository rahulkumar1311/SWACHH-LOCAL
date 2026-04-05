import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// 📍 Default icon fix (Leaflet ke icons React mein kabhi-kabhi gayab ho jaate hain)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ reports }) => {
  // Patna ki central location
  const position = [25.6100, 85.1410]; 

  return (
    <div className="h-[400px] w-full rounded-[2rem] overflow-hidden shadow-inner border-4 border-white">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        {/* 🗺️ OpenStreetMap ki free tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Saare kachre ke spots ko map par marker ki tarah dikhao */}
        {reports.map((r) => (
          <Marker key={r._id} position={[r.lat || 25.61, r.lng || 85.14]}>
            <Popup>
              <div className="text-center">
                <img src={`http://localhost:5000${r.imageUrl}`} alt="spot" className="w-20 h-20 rounded-lg mb-2 object-cover" />
                <p className="font-bold text-xs">{r.description}</p>
                <span className={`text-[10px] font-bold ${r.status === 'PENDING' ? 'text-red-500' : 'text-green-500'}`}>
                  {r.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;