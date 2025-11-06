import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const {
  PORT = 5000,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN = '1d',
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  RZP_KEY_ID,
  RZP_KEY_SECRET,
  FRONTEND_URL
} = process.env;
