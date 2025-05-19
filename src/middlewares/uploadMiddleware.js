import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const first = req.user?.firstName?.replace(/\s+/g, "_") || "user";
    const last = req.user?.lastName?.replace(/\s+/g, "_") || "default";
    const filename = `${first}_${last}${ext}`;
    req.filename = filename; 
    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpeg", ".png"].includes(ext)) {
      return cb(new Error("Hanya JPEG dan PNG yang Diizinkan!"));
    }
    // return 1;
    cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});
