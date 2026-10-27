const User = require('../models/User');

const addRecentlyPlayed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { songId } = req.params;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove if already exists
    user.recentlyPlayed = user.recentlyPlayed.filter(
      (item) => item.song.toString() !== songId.toString()
    );

    // Add to front
    user.recentlyPlayed.unshift({ song: songId, playedAt: Date.now() });

    // Keep max 20
    if (user.recentlyPlayed.length > 20) {
      user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);
    }

    await user.save();
    
    res.json(user.recentlyPlayed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentlyPlayed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('recentlyPlayed.song');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Extract just the songs with their playedAt times if needed, or just return the array
    res.json(user.recentlyPlayed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRecentlyPlayed,
  getRecentlyPlayed,
};
