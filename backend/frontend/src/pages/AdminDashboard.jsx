import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Admin.css';
import { useAuth } from '../context/AuthContext';
import { getSongs, createSong, updateSong, deleteSong } from '../services/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [formData, setFormData] = useState({
    title: '', artist: '', album: '', genre: 'Pop', duration: '', coverImage: '', audioUrl: ''
  });

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

  const handleEdit = (song) => {
    setEditingSong(song);
    setFormData({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      duration: song.duration,
      coverImage: song.coverImage || '',
      audioUrl: song.audioUrl || ''
    });
    setShowForm(true);
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
    try {
      if (editingSong) {
        await updateSong(editingSong._id, formData);
      } else {
        await createSong(formData);
      }
      setShowForm(false);
      setEditingSong(null);
      setFormData({ title: '', artist: '', album: '', genre: 'Pop', duration: '', coverImage: '', audioUrl: '' });
      fetchAllSongs();
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  if (loading && !showForm) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container admin-container">
      <div className="admin-header">
        <h2>Song Management</h2>
        <button className="btn-primary" onClick={() => {
          setEditingSong(null);
          setFormData({ title: '', artist: '', album: '', genre: 'Pop', duration: '', coverImage: '', audioUrl: '' });
          setShowForm(!showForm);
        }}>
          {showForm ? 'Cancel' : 'Add Song'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingSong ? 'Edit Song' : 'Add New Song'}</h3>
          <div className="form-grid">
            <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input type="text" placeholder="Artist" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} required />
            <input type="text" placeholder="Album" value={formData.album} onChange={e => setFormData({...formData, album: e.target.value})} />
            <select value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Classical">Classical</option>
              <option value="Bollywood">Bollywood</option>
              <option value="Lo-fi">Lo-fi</option>
              <option value="Electronic">Electronic</option>
              <option value="Romantic">Romantic</option>
            </select>
            <input type="text" placeholder="Duration (e.g., 3:45)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
            <input type="text" placeholder="Cover Image URL" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
            <input type="text" placeholder="Audio URL" value={formData.audioUrl} onChange={e => setFormData({...formData, audioUrl: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary">Save Song</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map(song => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(song)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(song._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
