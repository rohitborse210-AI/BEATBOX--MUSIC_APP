const User = require('../models/User');

const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { songId } = req.params;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favorites.indexOf(songId);

    if (index === -1) {
      user.favorites.push(songId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('favorites');
    res.json(updatedUser.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};
