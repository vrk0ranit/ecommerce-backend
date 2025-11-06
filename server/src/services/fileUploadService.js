import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const uploadToCloudinary = async (localFilePath, folder = 'ecommerce') => {
  try {
    const res = await cloudinary.uploader.upload(localFilePath, { folder });
    // delete local file if exists
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return res.secure_url;
  } catch (err) {
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
};
