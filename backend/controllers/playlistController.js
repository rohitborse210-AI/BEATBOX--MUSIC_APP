const Playlist = require('../models/Playlist');

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({
      name,
      user: req.user._id,
      songs: []
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this playlist' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { name, songs, addSong, removeSong } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }

    if (name) {
      playlist.name = name;
    }

    if (songs) {
      playlist.songs = songs;
    } else if (addSong) {
      if (!playlist.songs.includes(addSong)) {
        playlist.songs.push(addSong);
      }
    } else if (removeSong) {
      playlist.songs = playlist.songs.filter(s => s.toString() !== removeSong.toString());
    }

    await playlist.save();
    
    const updatedPlaylist = await Playlist.findById(playlist._id).populate('songs');
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this playlist' });
    }

    await Playlist.deleteOne({ _id: req.params.id });
    res.json({ message: 'Playlist removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
};
