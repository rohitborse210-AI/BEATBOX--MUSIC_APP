import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Pages.css';
import PlaylistCard from '../components/PlaylistCard';
import { getPlaylists, createPlaylist, deletePlaylist } from '../services/api';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const fetchPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    try {
      await createPlaylist({ name: newPlaylistName });
      setNewPlaylistName('');
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <h2>My Playlists</h2>
      
      <div className="create-playlist-section">
        <form onSubmit={handleCreate} className="create-form">
          <input 
            type="text" 
            placeholder="New playlist name..." 
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button type="submit" className="btn-primary">Create</button>
        </form>
      </div>

      {playlists.length === 0 ? (
        <div className="empty-state">
          <p>No playlists yet. Create one!</p>
        </div>
      ) : (
        <div className="playlists-grid">
          {playlists.map(pl => (
            <div key={pl._id} className="playlist-card-wrapper">
              <PlaylistCard playlist={pl} />
              <button className="btn-delete-small" onClick={() => handleDelete(pl._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
