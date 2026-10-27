const fs = require('fs');
const path = require('path');
const Song = require('../models/Song');

const getSongs = async (req, res) => {
  try {
    const { featured, recent, popular } = req.query;

    if (featured === 'true') {
      const songs = await Song.find({}).limit(6);
      return res.json(songs);
    }

    if (recent === 'true') {
      const songs = await Song.find({}).sort({ createdAt: -1 }).limit(8);
      return res.json(songs);
    }

    if (popular === 'true') {
      const songs = await Song.find({}).limit(8);
      return res.json(songs);
    }

    const songs = await Song.find({});
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSongs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    let songs = await Song.find({ $text: { $search: q } });

    if (songs.length === 0) {
      const regex = new RegExp(q, 'i');
      songs = await Song.find({
        $or: [
          { title: regex },
          { artist: regex },
          { album: regex }
        ]
      });
    }

    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSongsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const songs = await Song.find({ genre: { $regex: new RegExp(`^${genre}$`, 'i') } });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSongWithUpload = async (req, res) => {
  try {
    const { title, artist, album = '', genre, duration = '0:00' } = req.body;
    const audioFile = req.files?.audioFile?.[0];
    const coverFile = req.files?.coverImageFile?.[0];

    if (!title || !artist || !genre) {
      return res.status(400).json({ message: 'Song title, artist, and genre are required.' });
    }

    if (!audioFile) {
      return res.status(400).json({ message: 'An audio file is required.' });
    }

    const baseUrl = process.env.BASE_URL || '';
    const audioUrl = `${baseUrl}/uploads/audio/${path.basename(audioFile.path)}`.replace(/([^:]\/)\/{2,}/g, '$1/');
    const coverImage = coverFile ? `${baseUrl}/uploads/covers/${path.basename(coverFile.path)}`.replace(/([^:]\/)\/{2,}/g, '$1/') : '';

    const song = await Song.create({
      title: title.trim(),
      artist: artist.trim(),
      album: album.trim(),
      genre,
      duration,
      coverImage,
      audioUrl,
    });

    res.status(201).json(song);
  } catch (error) {
    const uploads = [
      req.files?.audioFile?.[0],
      req.files?.coverImageFile?.[0],
    ].filter(Boolean);

    for (const file of uploads) {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    res.status(400).json({ message: error.message || 'Unable to create song.' });
  }
};

const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSongs,
  searchSongs,
  getSongsByGenre,
  getSong,
  createSong,
  createSongWithUpload,
  updateSong,
  deleteSong,
};
