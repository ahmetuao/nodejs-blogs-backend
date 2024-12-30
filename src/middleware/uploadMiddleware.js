const multer = require('multer');
const path = require('path');

// Yükleme klasörünü ve dosya isimlendirme stratejisini tanımla
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Yüklenen dosyaları 'uploads/' klasöründe sakla
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Dosya adını benzersiz yap
  },
});

// Dosya türlerini kontrol et
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/; // Sadece resim dosyalarına izin ver
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimum 2 MB
});

module.exports = upload;
