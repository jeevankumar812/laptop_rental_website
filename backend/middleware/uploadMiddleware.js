import multer from "multer";
import path from "path";
import fs from "fs";

// Helper to get storage configuration based on a subfolder
const getStorage = (subFolder) => {
  const uploadDir = `uploads/${subFolder}/`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Format: userID-timestamp.extension
      const uniqueSuffix = `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    },
  });
};

// Filter logic
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Format not supported! (Allowed: .png, .jpg, .jpeg, .pdf)"));
  }
};

// Export two separate upload instances
const uploadKYCInfo = multer({
  storage: getStorage("kyc"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const uploadLaptop = multer({
  storage: getStorage("laptop"),
  limits: { fileSize: 10 * 1024 * 1024 }, // Slightly higher limit for high-res laptop shots
  fileFilter,
});

export { uploadKYCInfo, uploadLaptop };
