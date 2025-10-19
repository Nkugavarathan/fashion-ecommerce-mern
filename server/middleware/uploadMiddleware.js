import multer from "multer"
import path from "path"
import fs from "fs"

const uploadsDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir)
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`)
  },
})

// accept only images
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/
  const ok =
    allowed.test(path.extname(file.originalname).toLowerCase()) &&
    allowed.test(file.mimetype)
  if (ok) cb(null, true)
  else cb(new Error("Only image files are allowed"))
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})
