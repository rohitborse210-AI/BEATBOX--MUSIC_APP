import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Admin.css';
import { useAuth } from '../context/AuthContext';
import { getSongs, uploadSong, deleteSong } from '../services/api';

const initialForm = {
  title: '',
  artist: '',
  album: '',
  genre: 'Pop',
  duration: '',
};

const formatDuration = (seconds) => {
  if (!seconds || Number.isNaN(Number(seconds))) return '0:00';
  const totalSeconds = Math.floor(Number(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAllSongs = async () => {
    setLoading(true);
    try {
      const res = await getSongs();
      setSongs(res.data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllSongs();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return <div className="empty-state"><p>Access Denied</p></div>;
  }

  const handleAudioChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAudioFile(null);
      return;
    }

    if (!file.type.startsWith('audio/')) {
      setErrorMessage('Please choose a valid audio file (.mp3, .wav, .m4a, .aac).');
      setAudioFile(null);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('Audio file must be 25 MB or smaller.');
      setAudioFile(null);
      return;
    }

    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);
    audio.preload = 'metadata';
    audio.src = objectUrl;
    audio.onloadedmetadata = () => {
      setFormData((prev) => ({ ...prev, duration: formatDuration(audio.duration) }));
      URL.revokeObjectURL(objectUrl);
    };

    setAudioFile(file);
    setErrorMessage('');
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCoverFile(null);
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setErrorMessage('Cover image must be JPG, PNG, or WEBP.');
      setCoverFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Cover image must be 5 MB or smaller.');
      setCoverFile(null);
      return;
    }

    setCoverFile(file);
    setErrorMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await deleteSong(id);
        fetchAllSongs();
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.artist.trim() || !formData.genre.trim()) {
      setErrorMessage('Title, artist, and genre are required.');
      return;
    }

    if (!audioFile) {
      setErrorMessage('Please upload an audio file.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('artist', formData.artist);
      payload.append('album', formData.album || '');
      payload.append('genre', formData.genre);
      payload.append('duration', formData.duration || '0:00');
      payload.append('audioFile', audioFile);
      if (coverFile) payload.append('coverImageFile', coverFile);

      await uploadSong(payload);
      setSuccessMessage('Song uploaded successfully and added to the library.');
      setFormData(initialForm);
      setAudioFile(null);
      setCoverFile(null);
      e.target.reset();
      fetchAllSongs();
    } catch (error) {
      console.error('Error uploading song:', error);
      setErrorMessage(error?.response?.data?.message || 'Unable to upload song. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container admin-container">
      <div className="admin-header">
        <h2>Add Song to Beat Box</h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" placeholder="Song title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <input type="text" placeholder="Artist name" value={formData.artist} onChange={(e) => setFormData({ ...formData, artist: e.target.value })} required />
          <input type="text" placeholder="Album name" value={formData.album} onChange={(e) => setFormData({ ...formData, album: e.target.value })} />
          <select value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })}>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Classical">Classical</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Lo-fi">Lo-fi</option>
            <option value="Electronic">Electronic</option>
            <option value="Romantic">Romantic</option>
          </select>
          <label className="upload-field">
            <span>Audio file (.mp3, .wav, .m4a, .aac)</span>
            <input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac" onChange={handleAudioChange} required />
            {audioFile && <small>{audioFile.name}</small>}
          </label>
          <label className="upload-field">
            <span>Cover image (.jpg, .png, .webp)</span>
            <input type="file" accept="image/*,.jpg,.jpeg,.png,.webp" onChange={handleCoverChange} />
            {coverFile && <small>{coverFile.name}</small>}
          </label>
        </div>

        {errorMessage && <div className="admin-alert admin-alert-error">{errorMessage}</div>}
        {successMessage && <div className="admin-alert admin-alert-success">{successMessage}</div>}

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Song'}
        </button>
      </form>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map(song => (
              <tr key={song._id}>
                <td><img src={song.coverImage || 'https://via.placeholder.com/50'} alt={song.title} className="song-row-cover" /></td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album || 'Unknown Album'}</td>
                <td>{song.genre}</td>
                <td>{song.duration || '0:00'}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(song._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
