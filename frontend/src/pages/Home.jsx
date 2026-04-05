import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Camera, MapPin, Bell, X, CheckCircle, AlertCircle } from 'lucide-react';
import MapComponent from '../components/MapComponent'; // 🗺️ NAYA IMPORT ADD KIYA

const Home = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const loadData = () => {
    fetch('http://localhost:5000/api/reports')
      .then(res => res.json())
      .then(data => { 
        if(Array.isArray(data)) {
          setAllReports(data); 
          setReports(data.slice(0, 3)); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("Backend offline hai", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData(); 
    
    const interval = setInterval(() => {
      loadData(); 
      console.log("Checking for updates...");
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  const resolvedNotifications = allReports.filter(r => r.status === 'RESOLVED');

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="min-h-screen pb-24 bg-gray-50 w-full relative overflow-x-hidden">
      
      {/* 🔴 Notification Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out ${showNotifications ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">Activity</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Real-time updates</p>
            </div>
            <button onClick={() => setShowNotifications(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {resolvedNotifications.length > 0 ? resolvedNotifications.map(n => (
              <div key={n._id} className="p-4 bg-green-50/50 rounded-[1.5rem] border border-green-100 flex flex-col gap-3 shadow-sm hover:shadow-md transition">
                <div className="flex gap-3">
                  <img src={`http://localhost:5000${n.imageUrl}`} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm" alt="resolved" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <CheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase">Cleaned</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 leading-tight">
                      {n.description || "Aapka report kiya gaya area saaf ho gaya hai!"}
                    </h4>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-xl border border-green-100/50 shadow-inner">
                <p className="text-[11px] text-green-800 italic font-medium leading-relaxed">
                  " {n.adminMessage || "Aapka dwara kiya gaya report clean ho chuka h"} "
                </p>
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">
                    {new Date(n.updatedAt).toLocaleTimeString()}
                  </p>
                  <span className="text-[9px] bg-green-200 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Verified</span>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertCircle size={40} className="text-gray-200 mb-2" />
                <p className="text-sm text-gray-400 font-bold">Koi nayi activity nahi hai.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🟢 Main Header */}
      <div className="bg-green-700 text-white px-6 py-10 md:px-12 md:py-16 rounded-b-[3rem] shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
           <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
             <MapPin size={18} /> <span className="text-sm font-bold">Sector 15, Patna</span>
           </div>
           
           <div className="relative cursor-pointer group" onClick={() => setShowNotifications(true)}>
             <Bell size={28} className="group-hover:rotate-12 transition duration-300" />
             {resolvedNotifications.length > 0 && (
               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-green-700 rounded-full text-[9px] flex items-center justify-center font-black animate-bounce shadow-md">
                 {resolvedNotifications.length}
               </span>
             )}
           </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">Safai Mitra</h1>
          <p className="text-green-100 mt-2 font-medium uppercase tracking-[0.2em] text-xs md:text-sm opacity-90">Hyper-Local Waste Tracker</p>
        </div>
      </div>

      {/* 🟢 Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        <div className="lg:col-span-8 space-y-6">
          <div onClick={() => navigate('/track')} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-center gap-3 mb-6 text-green-700 font-black text-xl">
               <Truck size={26} className="group-hover:translate-x-2 transition" /> Next Garbage Pickup
             </div>
             <div className="flex justify-around items-center py-6 bg-gray-50 rounded-[2.5rem]">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Coming In</p>
                  <h2 className="text-5xl font-black text-green-700 tracking-tighter">12:08</h2>
                </div>
                <div className="w-px h-16 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Est. Arrival</p>
                  <h2 className="text-3xl font-black text-gray-800 tracking-tighter">09:15 AM</h2>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => navigate('/report')} className="bg-green-700 text-white p-7 rounded-[2.5rem] shadow-lg flex items-center justify-center gap-4 hover:bg-green-800 transition active:scale-95 shadow-green-100">
              <Camera size={32} /> <span className="text-lg font-black uppercase tracking-tight">Report Spot</span>
            </button>
            <button onClick={() => navigate('/admin')} className="bg-blue-600 text-white p-7 rounded-[2.5rem] shadow-lg flex items-center justify-center gap-4 hover:bg-blue-700 transition active:scale-95 shadow-blue-100">
              <ListIcon size={32} /> <span className="text-lg font-black uppercase tracking-tight">Admin Panel</span>
            </button>
          </div>

          {/* 🗺️ NAYA MAP SECTION YAHAN ADD HUA HAI */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={24} className="text-green-600" /> Live Waste Map
            </h3>
            {/* Map ko saare reports bhej rahe hain taaki marker dikh sakein */}
            <MapComponent reports={allReports} /> 
          </div>

        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 h-full min-h-[400px]">
            <h3 className="font-black text-2xl text-gray-800 mb-6">Recent Spots</h3>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 font-bold text-gray-300 animate-pulse uppercase text-xs tracking-widest">Loading...</div>
              ) : reports.length > 0 ? (
                reports.map((r, i) => (
                  <div key={i} className="flex gap-4 items-center bg-gray-50 p-4 rounded-[1.5rem] border border-gray-100 hover:border-green-200 transition">
                    <img src={`http://localhost:5000${r.imageUrl}`} className="w-16 h-16 rounded-2xl object-cover bg-gray-200 shadow-sm" alt="spot" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 truncate text-sm">{r.description || "Waste Spot"}</h4>
                      <p className="text-[9px] text-gray-400 font-black uppercase mt-0.5 tracking-tighter">{r.category}</p>
                      
                      {r.status === 'RESOLVED' ? (
                        <div className="flex flex-col gap-1 mt-2">
                           <span className="text-[8px] font-black bg-green-100 text-green-600 px-2 py-0.5 rounded-full w-max uppercase tracking-tighter">Cleaned</span>
                           {r.adminMessage && <p className="text-[9px] text-green-800 font-medium italic truncate max-w-[150px]">"{r.adminMessage}"</p>}
                        </div>
                      ) : (
                        <span className="text-[8px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-2 inline-block uppercase tracking-tighter">Pending</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 font-bold text-sm py-10 italic">No reports yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-300" onClick={() => setShowNotifications(false)}></div>
      )}
    </div>
  );
};

// Help with Icon
const ListIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

export default Home;