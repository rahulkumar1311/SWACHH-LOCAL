import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
  truckNo: { 
    type: String, 
    required: true, 
    unique: true // Ek number ka ek hi truck hoga
  },
  driverName: { 
    type: String, 
    default: "Unknown Driver" 
  },
  currentLocation: {
    lat: { type: Number, default: 25.6100 }, // Patna base location
    lng: { type: Number, default: 85.1410 }
  },
  route: { 
    type: String, 
    default: "Green Colony Sector 15" 
  },
  isActive: { 
    type: Boolean, 
    default: true // Check karne ke liye ki truck duty par hai ya nahi
  }
}, { 
  timestamps: true 
});

const Truck = mongoose.model('Truck', truckSchema);

export default Truck;