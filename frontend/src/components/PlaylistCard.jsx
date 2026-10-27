import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { deletePlaylist } from '../services/api';
import '../assets/styles/components/PlaylistCard.css';

const PlaylistCard = ({ playlist, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        await deletePlaylist(playlist._id || playlist.id);
        if (onDelete) onDelete(playlist._id || playlist.id);
      } catch (error) {
        console.error('Error deleting playlist', error);
      }
    }
  };

  return (
    <div className="playlist-card" onClick={() => navigate(`/playlists/${playlist._id || playlist.id}`)}>
      <div className="playlist-info">
        <h3 className="playlist-name">{playlist.name}</h3>
        <span className="playlist-count">
          {playlist.songs?.length || 0} {playlist.songs?.length === 1 ? 'song' : 'songs'}
        </span>
      </div>
      
      <div className="playlist-actions">
        <button className="playlist-delete-btn" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
