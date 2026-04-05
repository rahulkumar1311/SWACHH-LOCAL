import express from 'express';
import multer from 'multer';
import Report from '../models/Report.js';

const router = express.Router();

// 📸 Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// 1. POST: Naya Report Submit karne ke liye
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newReport = new Report({
      description: req.body.description,
      category: req.body.category,
      imageUrl: `/uploads/${req.file.filename}`,
      lat: req.body.lat,
      lng: req.body.lng
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET: Saare reports lene ke liye
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET: Stats nikaalne ke liye
router.get('/stats', async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const pending = await Report.countDocuments({ status: 'PENDING' });
    const resolved = await Report.countDocuments({ status: 'RESOLVED' });
    res.json({ total, pending, resolved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PATCH: Status aur Message update karne ke liye (YAHI MAIN FIX HAI 🛠️)
router.patch('/:id/status', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      { 
        status: req.body.status,
        adminMessage: req.body.adminMessage // 👈 Ye line custom message ko save karti hai
      }, 
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;