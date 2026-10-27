const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('../controllers/playlistController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getPlaylists)
  .post(createPlaylist);

router.route('/:id')
  .get(getPlaylist)
  .put(updatePlaylist)
  .delete(deletePlaylist);

module.exports = router;
