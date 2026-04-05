import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs'; // 📁 Folder check karne ke liye
import path from 'path';
import connectDB from './config/db.js';

// 1. Routes Import
import reportRoutes from './routes/reportRoutes.js';
import truckRoutes from './routes/truckRoutes.js';

// 2. Environment Variables
dotenv.config();

// 3. Database Connection
connectDB();

const app = express();

// 🛠️ FIX: Uploads folder check (Render par folder apne aap ban jayega)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("✅ New 'uploads' folder created!");
}

// 4. Middlewares
// Production mein CORS ko thoda "Smart" banate hain
app.use(cors()); 
app.use(express.json());

// 5. Static Folder (Images ke liye)
app.use('/uploads', express.static('uploads'));

// 6. API Routes
app.use('/api/reports', reportRoutes);
app.use('/api/truck', truckRoutes);

// 7. Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Safai Mitra Backend Engine is Running Live!');
});

// 8. Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});