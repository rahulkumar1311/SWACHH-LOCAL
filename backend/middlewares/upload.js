import multer from 'multer';

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Photo yahan save hogi
  },
  filename: (req, file, cb) => {
    // Har photo ko ek unique naam dene ke liye time use kar rahe hain
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage });

export default upload;