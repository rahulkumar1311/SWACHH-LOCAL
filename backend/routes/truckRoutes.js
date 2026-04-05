import express from 'express';
import { getTruckLocation, getTruckETA } from '../controllers/truckController.js';

const router = express.Router();

// Route 1: Truck ki location lene ke liye (GET /api/truck/location)
router.get('/location', getTruckLocation);

// Route 2: Truck kab tak aayega uska time lene ke liye (GET /api/truck/eta)
router.get('/eta', getTruckETA);

export default router;