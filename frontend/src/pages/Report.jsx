import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const Report = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Mixed Waste');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button dabd gaya!"); // Check if button works

    if (!image) {
      alert("Bhai, photo toh select kar lo!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('lat', '25.6100'); 
    formData.append('lng', '85.1410');

    try {
      console.log("Sending data to backend...");
      const res = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log("Backend Response:", result);

      if (res.ok) {
        alert('🎉 Report Sent Successfully!');
        navigate('/');
      } else {
        alert(`Error: ${result.message || 'Submit nahi hua'}`);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Backend se connection nahi ho paya! Check karo backend terminal.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="min-h-screen bg-gray-50 pb-28">
      {/* 🟢 Custom Header */}
      <div className="bg-green-700 text-white p-6 rounded-b-[2.5rem] shadow-lg flex items-center gap-4">
        <button onClick={() => navigate('/')} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold tracking-tight">Report Waste Spot</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-2xl mx-auto space-y-6 -mt-4">
        
        {/* 📸 Photo Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 italic">
             <Camera size={18} className="text-green-600" /> Click & Upload
           </h3>
           <label className="relative block w-full h-56 border-2 border-dashed border-green-200 rounded-[1.5rem] bg-green-50/50 overflow-hidden cursor-pointer group">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-green-700/50 group-hover:text-green-700 transition">
                  <Upload size={48} strokeWidth={1.5} />
                  <span className="mt-2 font-bold text-sm">Tap to Open Camera</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
           </label>
        </div>

        {/* 📝 Info Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 space-y-4">
          <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">What did you see?</label>
             <textarea 
               className="w-full mt-1 bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition"
               placeholder="Example: Large garbage pile near the park entrance..."
               rows="3"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
             />
          </div>
          
          <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Waste Type</label>
             <div className="flex flex-wrap gap-2 mt-2">
                {['Mixed', 'Plastic', 'Medical', 'Other'].map(cat => (
                  <button 
                    key={cat} type="button" 
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-green-700 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* 🚀 Submit Button */}
        <button 
          disabled={loading}
          className="w-full bg-green-700 text-white py-5 rounded-full font-black text-lg shadow-xl shadow-green-200 hover:bg-green-800 transition active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={24} /> SUBMIT REPORT</>}
        </button>
      </form>
    </div>
  );
};

export default Report;