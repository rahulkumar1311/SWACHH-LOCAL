import 'leaflet/dist/leaflet.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Map, Camera, User } from 'lucide-react';

// 1. Saare Asali Pages Import Karo (Dhyan se dekhna path sahi ho)
import Home from './pages/Home';
import Report from './pages/Report';
import Admin from './pages/Admin';
import Track from './pages/Track'; // 👈 Ye rahi tumhari nayi tracking file

// 🟢 Bottom Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl flex justify-around items-center px-8 py-3 w-[90%] max-w-md pointer-events-auto">
        <button onClick={() => navigate('/')} className={`flex flex-col items-center transition-all ${isActive('/') ? 'text-green-700 scale-110' : 'text-gray-400 hover:text-green-600'}`}>
          <HomeIcon size={24} strokeWidth={isActive('/') ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        
        {/* 🚛 Track Button */}
        <button onClick={() => navigate('/track')} className={`flex flex-col items-center transition-all ${isActive('/track') ? 'text-green-700 scale-110' : 'text-gray-400 hover:text-green-600'}`}>
          <Map size={24} strokeWidth={isActive('/track') ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1">Track</span>
        </button>

        {/* 📸 Report Button */}
        <button onClick={() => navigate('/report')} className={`flex flex-col items-center transition-all ${isActive('/report') ? 'text-green-700 scale-110' : 'text-gray-400 hover:text-green-600'}`}>
          <Camera size={24} strokeWidth={isActive('/report') ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1">Report</span>
        </button>

        {/* 📋 Admin Button */}
        <button onClick={() => navigate('/admin')} className={`flex flex-col items-center transition-all ${isActive('/admin') ? 'text-green-700 scale-110' : 'text-gray-400 hover:text-green-600'}`}>
          <User size={24} strokeWidth={isActive('/admin') ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </button>
      </div>
    </div>
  );
};

// 🟢 Main App Structure
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
        {/* 🚦 Routing System: Yahan lagate hain Route buttons! */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* 👈 YE RAHA TUMHARA TRACK ROUTE */}
          <Route path="/track" element={<Track />} /> 
        </Routes>

        {/* Navigation bar hamesha Routes ke bahar rehti hai taaki har page pe dikhe */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;