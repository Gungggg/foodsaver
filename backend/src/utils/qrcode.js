/**
 * @fileoverview QR code generation utilities.
 */
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads', 'qrcodes');

/**
 * Generate a QR code image from a string and save to disk.
 * @param {string} data - Data to encode in QR code
 * @param {string} filename - Output filename (without extension)
 * @returns {Promise<string>} Relative URL path to the QR code image
 */
async function generateQRCode(data, filename) {
  // Ensure directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const filepath = path.join(UPLOAD_DIR, `${filename}.png`);
  await QRCode.toFile(filepath, data, {
    type: 'png',
    width: 300,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
  });

  return `/uploads/qrcodes/${filename}.png`;
}

/**
 * Generate QR code as a data URL (base64).
 * @param {string} data
 * @returns {Promise<string>}
 */
async function generateQRDataURL(data) {
  return QRCode.toDataURL(data, { width: 300, margin: 2 });
}

module.exports = { generateQRCode, generateQRDataURL };
