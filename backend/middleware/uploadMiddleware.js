const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Relative to backend/server.js usually, but let's make it robust
    const uploadPath = path.join(__dirname, '../uploads/temp');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `drawing-${uniqueSuffix}${ext}`);
  },
});

// File filter for engineering drawings
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.dxf', '.step', '.stp', '.iges', '.igs'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DXF, STEP, and IGES formats are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadDrawing: upload.single('attachment'), // Use 'attachment' as the field name
};
