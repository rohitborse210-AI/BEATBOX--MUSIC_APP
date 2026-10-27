const fs = require('fs');
const path = require('path');
const multer = require('multer');

const audioUploadDir = path.join(__dirname, '../uploads/audio');
const coverUploadDir = path.join(__dirname, '../uploads/covers');

for (const dir of [audioUploadDir, coverUploadDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const createFileName = (prefix, file) => {
  const extension = path.extname(file.originalname || '').toLowerCase();
  const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${prefix}-${safeName}${extension}`;
};

const audioStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, audioUploadDir),
  filename: (_req, file, cb) => cb(null, createFileName('audio', file)),
});

const coverStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, coverUploadDir),
  filename: (_req, file, cb) => cb(null, createFileName('cover', file)),
});

const audioFileFilter = (_req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/aac'];
  const extension = path.extname(file.originalname || '').toLowerCase();

  if (allowedTypes.includes(file.mimetype) || ['.mp3', '.wav', '.m4a', '.aac'].includes(extension)) {
    cb(null, true);
    return;
  }

  cb(new Error('Only MP3, WAV, M4A, and AAC audio files are allowed.'));
};

const coverFileFilter = (_req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const extension = path.extname(file.originalname || '').toLowerCase();

  if (allowedTypes.includes(file.mimetype) || ['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) {
    cb(null, true);
    return;
  }

  cb(new Error('Only JPG, PNG, and WEBP cover images are allowed.'));
};

const audioUpload = multer({
  storage: audioStorage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: audioFileFilter,
});

const coverUpload = multer({
  storage: coverStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: coverFileFilter,
});

const songUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      if (file.fieldname === 'audioFile') return cb(null, audioUploadDir);
      if (file.fieldname === 'coverImageFile') return cb(null, coverUploadDir);
      cb(null, audioUploadDir);
    },
    filename: (_req, file, cb) => cb(null, createFileName(file.fieldname === 'audioFile' ? 'audio' : 'cover', file)),
  }),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.fieldname === 'audioFile') {
      const allowed = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/aac'];
      const extension = path.extname(file.originalname || '').toLowerCase();
      if (allowed.includes(file.mimetype) || ['.mp3', '.wav', '.m4a', '.aac'].includes(extension)) {
        return cb(null, true);
      }
      return cb(new Error('Only MP3, WAV, M4A, and AAC audio files are allowed.'));
    }

    if (file.fieldname === 'coverImageFile') {
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      const extension = path.extname(file.originalname || '').toLowerCase();
      if (allowed.includes(file.mimetype) || ['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) {
        return cb(null, true);
      }
      return cb(new Error('Only JPG, PNG, and WEBP cover images are allowed.'));
    }

    cb(new Error('Unexpected file upload field.'));
  },
});

module.exports = {
  audioUpload,
  coverUpload,
  songUpload,
};
