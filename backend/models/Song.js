const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    default: '',
  },
  genre: {
    type: String,
    required: true,
    enum: ['Pop', 'Rock', 'Hip-Hop', 'Classical', 'Bollywood', 'Lo-fi', 'Electronic', 'Romantic'],
  },
  duration: {
    type: String,
    default: '0:00',
  },
  coverImage: {
    type: String,
    default: '',
  },
  audioUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

songSchema.index({ title: 'text', artist: 'text', album: 'text' });

module.exports = mongoose.model('Song', songSchema);
