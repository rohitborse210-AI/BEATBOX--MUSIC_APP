import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaHeart, FaPlus, FaArrowLeft } from 'react-icons/fa';
import '../assets/styles/components/Pages.css';
import { getSong, getPlaylists, updatePlaylist, toggleFavorite } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';

export default function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { playSong } = usePlayer();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [songRes, playlistsRes] = await Promise.all([
          getSong(id),
          isAuthenticated ? getPlaylists() : Promise.resolve({ data: [] })
        ]);
        setSong(songRes.data);
        if (playlistsRes.data) {
          setPlaylists(playlistsRes.data);
        }
      } catch (error) {
        console.error('Error fetching song details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, isAuthenticated]);

  const handlePlay = () => {
    playSong(song, [song]);
  };

  const handleFavorite = async () => {
    try {
      await toggleFavorite(song._id);
      // Optional: show toast or update local state
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const addToPlaylist = async (playlistId) => {
    try {
      await updatePlaylist(playlistId, { addSong: song._id });
      setShowPlaylists(false);
      // Optional: show success toast
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!song) {
    return <div className="empty-state"><p>Song not found</p></div>;
  }

  return (
    <div className="page-container song-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      
      <div className="song-details-content">
        <img src={song.coverImage || 'default-cover.jpg'} alt={song.title} className="song-details-cover" />
        
        <div className="song-details-info">
          <h1 className="song-title-large">{song.title}</h1>
          <p className="song-artist">Artist: {song.artist}</p>
          <p className="song-album">Album: {song.album}</p>
          <p className="song-genre">Genre: {song.genre}</p>
          <p className="song-duration">Duration: {song.duration}</p>
          
          <div className="song-actions">
            <button className="btn-play-large" onClick={handlePlay}>
              <FaPlay /> Play
            </button>
            <button className="btn-icon" onClick={handleFavorite} title="Add to Favorites">
              <FaHeart />
            </button>
            <div className="playlist-dropdown-container">
              <button className="btn-icon" onClick={() => setShowPlaylists(!showPlaylists)} title="Add to Playlist">
                <FaPlus />
              </button>
              {showPlaylists && playlists.length > 0 && (
                <div className="playlist-dropdown">
                  {playlists.map(pl => (
                    <div key={pl._id} className="dropdown-item" onClick={() => addToPlaylist(pl._id)}>
                      {pl.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
