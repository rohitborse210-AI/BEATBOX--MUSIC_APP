const express = require('express');
const router = express.Router();
const { toggleFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getFavorites);

router.route('/:songId')
  .post(toggleFavorite);

module.exports = router;
