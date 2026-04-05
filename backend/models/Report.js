import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  description: { 
    type: String, 
    default: "No description provided" 
  },
  category: { 
    type: String, 
    default: "Mixed",
    enum: ["Mixed", "Plastic", "Medical", "Other"] 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  lat: { 
    type: Number, 
    required: true 
  },
  lng: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'PENDING', 
    enum: ['PENDING', 'RESOLVED'] 
  },

  // ✅ YE RAHI NAYI FIELD: Admin ka message store karne ke liye
  adminMessage: { 
    type: String, 
    default: "" 
  }

}, { 
  timestamps: true // Ye apne aap createdAt aur updatedAt save kar lega
});

const Report = mongoose.model('Report', reportSchema);

export default Report;