/**
 * @fileoverview Multer file upload middleware configuration.
 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024; // 5MB

/**
 * Create a multer storage engine for a specific subdirectory.
 * @param {string} subdir - Subdirectory under uploads/
 * @returns {multer.StorageEngine}
 */
function createStorage(subdir) {
  const uploadPath = path.join(__dirname, '..', '..', 'uploads', subdir);

  // Ensure directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadPath),
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  });
}

/** File filter: images only */
const imageFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, gif, webp) are allowed.'), false);
  }
};

/** File filter: documents (images + PDF) */
const documentFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeCheck = /jpeg|jpg|png|pdf/.test(file.mimetype);

  if (ext && mimeCheck) {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed.'), false);
  }
};

/** Upload middleware for product photos */
const uploadProductPhoto = multer({
  storage: createStorage('products'),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageFilter,
}).single('photo');

/** Upload middleware for merchant logos */
const uploadMerchantLogo = multer({
  storage: createStorage('merchants'),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageFilter,
}).single('logo');

/** Upload middleware for merchant documents */
const uploadDocument = multer({
  storage: createStorage('documents'),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: documentFilter,
}).single('document');

/**
 * Wrapper to handle multer errors gracefully.
 * @param {Function} uploadFn - Multer middleware
 * @returns {import('express').RequestHandler}
 */
const handleUpload = (uploadFn) => {
  return (req, res, next) => {
    uploadFn(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(422).json({
            success: false,
            message: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
          });
        }
        return res.status(422).json({ success: false, message: err.message });
      }
      if (err) {
        return res.status(422).json({ success: false, message: err.message });
      }
      next();
    });
  };
};

module.exports = {
  uploadProductPhoto: handleUpload(uploadProductPhoto),
  uploadMerchantLogo: handleUpload(uploadMerchantLogo),
  uploadDocument: handleUpload(uploadDocument),
};
