import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 1. Routes Import Karna
import reportRoutes from './routes/reportRoutes.js';
import truckRoutes from './routes/truckRoutes.js';

// 2. .env file se secret keys (PORT, MONGO_URI) load karna
dotenv.config();

// 3. Database (MongoDB) se connect karna
connectDB();

// 4. Express App (Server) start karna
const app = express();

// 5. Middlewares
app.use(cors()); // Frontend ko backend se securely connect hone deta hai
app.use(express.json()); // Frontend se aane wale JSON data ko read karta hai

// 6. Uploads folder ko Public banana (Very Important for images)
// Isse frontend browser me "http://localhost:5000/uploads/photo.jpg" dikhegi
app.use('/uploads', express.static('uploads'));

// 7. API Routes (Inko humne attach kar diya)
app.use('/api/reports', reportRoutes); // Saare Kachra report wale kaam idhar
app.use('/api/truck', truckRoutes);    // Truck tracking aur ETA wale kaam idhar

// 8. Test Route (Server check karne ke liye)
app.get('/', (req, res) => {
  res.send('🚀 Safai Mitra Backend Engine is Running 100% Successfully!');
});

// 9. Server ko chalu (Listen) karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});