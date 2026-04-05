import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Navigation, Phone, ArrowLeft, ShieldCheck, User } from 'lucide-react';

const Track = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 25.6100, lng: 85.1410 });
  const [eta, setEta] = useState({ distance: '480', time: '12' });

  useEffect(() => {
    const fetchLiveStatus = async () => {
      try {
        const locRes = await fetch('http://localhost:5000/api/truck/location');
        const locData = await locRes.json();
        setLocation({ lat: locData.lat, lng: locData.lng });
        
        const etaRes = await fetch('http://localhost:5000/api/truck/eta');
        const etaData = await etaRes.json();
        setEta({ distance: etaData.distance, time: etaData.eta });
      } catch (err) { console.error(err); }
    };

    const interval = setInterval(fetchLiveStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="min-h-screen bg-gray-50 pb-24 overflow-x-hidden">
      
      {/* 🟢 Header */}
      <div className="bg-green-700 text-white p-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="bg-white/20 p-2 rounded-full"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold tracking-tight">Live Tracking</h2>
        </div>
        <div className="bg-green-500/30 px-3 py-1 rounded-full flex items-center gap-2 border border-green-400/50">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-100">Live</span>
        </div>
      </div>

      {/* 🗺️ Enhanced Map Area */}
      <div className="relative h-[45vh] w-full bg-[#e5e7eb] overflow-hidden">
        {/* CSS Street Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}></div>

        {/* 🛣️ Simulated Road */}
        <div className="absolute top-1/2 left-0 w-full h-12 bg-gray-300 -translate-y-1/2 border-y-2 border-gray-400 flex items-center">
            <div className="w-full h-[2px] border-t-4 border-dashed border-white opacity-50"></div>
        </div>
        
        {/* 🏠 Your Location (Fixed Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-pulse">
             <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <p className="text-[10px] font-black text-blue-800 mt-2 text-center bg-white px-2 py-0.5 rounded-full shadow-sm border border-blue-100 uppercase">You</p>
        </div>

        {/* 🚛 The Moving Truck */}
        <div 
          className="absolute transition-all duration-3000 ease-linear flex flex-col items-center z-20"
          style={{ 
            left: `${(location.lng - 85.1410) * 15000 + 50}%`, 
            top: `${(location.lat - 25.6100) * 15000 + 50}%` 
          }}
        >
          <div className="bg-green-700 text-white p-3 rounded-2xl shadow-2xl ring-4 ring-green-700/20">
            <Truck size={28} className="animate-bounce" />
          </div>
          <div className="bg-white px-3 py-1 rounded-lg shadow-md mt-2 border border-green-100">
            <p className="text-[10px] font-black text-gray-800 tracking-tighter">BR01GA1234</p>
          </div>
        </div>
      </div>

      {/* 📋 Tracking Info Cards */}
      <div className="p-5 -mt-12 relative z-30 max-w-2xl mx-auto space-y-4">
        
        {/* ETA Stats Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200 flex justify-between items-center border border-white">
          <div className="flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-2xl text-green-700">
                <Navigation size={24} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Arriving in</p>
                <h3 className="text-2xl font-black text-gray-800">{eta.time} <span className="text-sm font-medium text-green-600 uppercase">mins</span></h3>
             </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Distance</p>
             <h3 className="text-xl font-black text-gray-800">{eta.distance} <span className="text-sm font-medium text-gray-400 uppercase">m</span></h3>
          </div>
        </div>

        {/* Driver Contact Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-500 shadow-inner">
               <User size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-gray-800">Ramesh Singh</h4>
                <ShieldCheck size={14} className="text-blue-500 fill-blue-50" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Verified Driver</p>
            </div>
            <a href="tel:9112345678" className="bg-green-600 p-4 rounded-2xl text-white shadow-lg shadow-green-200 active:scale-90 transition">
              <Phone size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;