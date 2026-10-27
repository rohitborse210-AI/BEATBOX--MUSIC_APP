const express = require('express');
const router = express.Router();
const { addRecentlyPlayed, getRecentlyPlayed } = require('../controllers/recentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getRecentlyPlayed);

router.route('/:songId')
  .post(addRecentlyPlayed);

module.exports = router;
