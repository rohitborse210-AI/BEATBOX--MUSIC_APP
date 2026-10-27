import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';
import '../assets/styles/components/Pages.css';
import SongList from '../components/SongList';
import { getPlaylist, updatePlaylist } from '../services/api';
import { usePlayer } from '../context/PlayerContext';

export default function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playSong } = usePlayer();

  const fetchPlaylist = async () => {
    try {
      const res = await getPlaylist(id);
      setPlaylist(res.data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const handleRemoveSong = async (songId) => {
    try {
      await updatePlaylist(id, { removeSong: songId });
      fetchPlaylist();
    } catch (error) {
      console.error('Error removing song:', error);
    }
  };

  const handlePlayAll = () => {
    if (playlist && playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!playlist) {
    return <div className="empty-state"><p>Playlist not found</p></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/playlists" className="back-link">
          <FaArrowLeft /> Back to Playlists
        </Link>
      </div>
      
      <div className="playlist-details-header">
        <h2>{playlist.name}</h2>
        {playlist.songs && playlist.songs.length > 0 && (
          <button className="btn-play-large" onClick={handlePlayAll}>
            <FaPlay /> Play All
          </button>
        )}
      </div>

      {(!playlist.songs || playlist.songs.length === 0) ? (
        <div className="empty-state">
          <p>No songs in this playlist.</p>
        </div>
      ) : (
        <div className="playlist-songs">
          <SongList 
            songs={playlist.songs} 
            queue={playlist.songs} 
            onRemove={handleRemoveSong} 
            showRemove={true} 
          />
        </div>
      )}
    </div>
  );
}
