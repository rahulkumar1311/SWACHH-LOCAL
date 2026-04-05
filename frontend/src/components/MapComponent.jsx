import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 📍 Default icon fix
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
  // ✅ Tumhara asali backend link images ke liye
  const API_URL = "https://swachh-local.onrender.com";
  
  // Patna ki central location
  const position = [25.6100, 85.1410]; 

  return (
    <div className="h-[400px] w-full rounded-[2rem] overflow-hidden shadow-inner border-4 border-white relative z-0">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((r) => (
          <Marker key={r._id} position={[r.lat || 25.61, r.lng || 85.14]}>
            <Popup>
              <div className="text-center p-1">
                {/* 📸 Image link updated to Render API */}
                <img 
                  src={`${API_URL}${r.imageUrl}`} 
                  alt="spot" 
                  className="w-24 h-20 rounded-lg mb-2 object-cover shadow-sm border border-gray-100" 
                />
                <p className="font-bold text-[11px] text-gray-800 leading-tight mb-1">{r.description || "Waste Spot"}</p>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${r.status === 'PENDING' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
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