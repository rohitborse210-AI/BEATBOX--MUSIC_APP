const express = require('express');
const router = express.Router();
const {
  getSongs,
  searchSongs,
  getSongsByGenre,
  getSong,
  createSong,
  createSongWithUpload,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { songUpload } = require('../config/upload');

router.get('/search', searchSongs);
router.get('/genre/:genre', getSongsByGenre);
router.get('/', getSongs);
router.get('/:id', getSong);
router.post('/upload', protect, admin, songUpload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'coverImageFile', maxCount: 1 },
]), createSongWithUpload);
router.post('/', protect, admin, createSong);
router.put('/:id', protect, admin, updateSong);
router.delete('/:id', protect, admin, deleteSong);

module.exports = router;
