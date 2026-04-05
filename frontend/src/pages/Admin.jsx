import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, Clock, Trash2, ArrowLeft, Loader2, MapPin, MessageSquare } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [reportsRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/reports'),
        fetch('http://localhost:5000/api/reports/stats')
      ]);
      const reportsData = await reportsRes.json();
      const statsData = await statsRes.json();
      
      setReports(reportsData);
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Status Update with Message Feature
  const handleResolve = async (id) => {
    // 📝 Default message jo tumne bola tha
    const defaultMsg = "Aapka dwara kiya gaya report clean ho chuka h";
    const msg = prompt("User ko message bhejein:", defaultMsg);
    
    if (msg === null) return; // Agar cancel kiya toh kuch mat karo

    try {
      const res = await fetch(`http://localhost:5000/api/reports/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'RESOLVED',
          adminMessage: msg // Backend mein message bhej rahe hain
        })
      });
      if (res.ok) {
        alert("✅ Report resolved aur message bhej diya gaya!");
        fetchData();
      }
    } catch (err) {
      alert("Status update nahi ho paya!");
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="min-h-screen bg-gray-50 pb-28">
      {/* 🔵 Admin Header */}
      <div className="bg-blue-600 text-white p-8 rounded-b-[3rem] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/')} className="bg-white/20 p-2 rounded-full"><ArrowLeft size={20}/></button>
          <LayoutDashboard size={28} />
        </div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-blue-100 text-sm mt-1">Manage and resolve waste reports</p>
      </div>

      <div className="p-5 max-w-5xl mx-auto -mt-10 space-y-6">
        
        {/* 📊 Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-blue-500 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
            <h2 className="text-2xl font-black text-gray-800">{stats.total || 0}</h2>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-red-500 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Pending</p>
            <h2 className="text-2xl font-black text-red-600">{stats.pending || 0}</h2>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-green-500 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Cleaned</p>
            <h2 className="text-2xl font-black text-green-600">{stats.resolved || 0}</h2>
          </div>
        </div>

        {/* 📋 Reports List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 ml-2">Recent Submissions</h3>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
          ) : reports.length > 0 ? reports.map((r) => (
            <div key={r._id} className="bg-white p-5 rounded-[2rem] shadow-md border border-gray-100 flex flex-col md:flex-row gap-5 transition-all hover:shadow-lg">
              <img src={`http://localhost:5000${r.imageUrl}`} className="w-full md:w-40 h-40 rounded-2xl object-cover bg-gray-100" alt="waste" />
              
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${r.status === 'PENDING' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {r.status}
                  </span>
                  <p className="text-[10px] text-gray-400 font-bold">{new Date(r.createdAt).toLocaleString()}</p>
                </div>
                
                <h4 className="font-bold text-gray-800 text-lg">{r.description || "No description"}</h4>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <MapPin size={14} className="text-blue-500" /> 
                  <span>Lat: {r.lat ? Number(r.lat).toFixed(2) : 'N/A'}, Lng: {r.lng ? Number(r.lng).toFixed(2) : 'N/A'}</span>
                </div>

                {/* ✅ RESOLVED hone par message dikhao */}
                {r.status === 'RESOLVED' && r.adminMessage && (
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex gap-2 items-start">
                    <MessageSquare size={14} className="text-blue-600 mt-1" />
                    <div>
                      <p className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">Sent Message</p>
                      <p className="text-xs text-blue-800 italic">"{r.adminMessage}"</p>
                    </div>
                  </div>
                )}

                {r.status === 'PENDING' && (
                  <button 
                    onClick={() => handleResolve(r._id)}
                    className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                  >
                    <CheckCircle size={18} /> Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 font-bold">Koi reports nahi mili.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;