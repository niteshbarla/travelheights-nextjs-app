import fs from "fs";
import path from "path";
import multer from "multer";

// Ensure 'public/uploads' directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Fix: Allow multiple files by changing `.single("file")` to `.array("files")`
export default function handler(req, res) {
  if (req.method === "POST") {
    upload.array("files", 10)(req, res, (err) => {
      // ✅ Accept up to 10 files
      if (err) {
        console.error("Upload Error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      // ✅ Return an array of uploaded file URLs
      const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
      res.status(200).json({ urls: fileUrls });
    });
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
}
