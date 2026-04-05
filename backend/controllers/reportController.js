import Report from '../models/Report.js';

// 1. Naya Kachra Report Create Karna
export const createReport = async (req, res) => {
  try {
    const { description, category, lat, lng } = req.body;
    
    // Agar photo nahi aayi toh error do
    if (!req.file) {
      return res.status(400).json({ message: "Bhai, photo zaroori hai!" });
    }

    const newReport = new Report({
      description,
      category,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      imageUrl: `/uploads/${req.file.filename}` // Jo photo save hui uska rasta
    });

    await newReport.save();
    res.status(201).json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Saari Reports Fetch Karna (Dashboard pe dikhane ke liye)
export const getReports = async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) ka matlab hai naya report sabse upar aayega
    const reports = await Report.find().sort({ createdAt: -1 }); 
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};