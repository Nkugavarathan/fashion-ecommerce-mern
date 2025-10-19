import multer from "multer"
import path from "path"
import fs from "fs"

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Set storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir) // save inside /uploads
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// Optional: file filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = allowedTypes.test(file.mimetype)
  if (extname && mimetype) cb(null, true)
  else cb(new Error("Only images are allowed"))
}

export const upload = multer({ storage, fileFilter })
