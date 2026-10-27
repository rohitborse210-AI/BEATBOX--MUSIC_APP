import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../services/api';
import '../assets/styles/components/SongCard.css';

const SongCard = ({ song, songs = [], queue = [] }) => {
  const { playSong } = usePlayer();
  const { isAuthenticated, user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Determine if song is in user's favorites
    // This assumes user object has a favorites array or similar
    if (user && user.favorites && song) {
       setIsFavorite(user.favorites.includes(song._id || song.id));
    }
  }, [user, song]);

  const handlePlay = (e) => {
    e.stopPropagation();
    const songList = songs.length > 0 ? songs : queue;
    playSong(song, songList);
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      await toggleFavorite(song._id || song.id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  return (
    <div className="song-card">
      <div className="song-card-image-container">
        <img src={song.coverImage || 'https://via.placeholder.com/150'} alt={song.title} className="song-card-image" />
        <button className="song-card-play-btn" onClick={handlePlay}>
          <FaPlay />
        </button>
      </div>
      
      {isAuthenticated && (
        <div className="song-card-actions">
          <button className={`fav-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavorite}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      )}

      <div className="song-card-info">
        <Link to={`/songs/${song._id || song.id}`} className="song-card-title">
          {song.title}
        </Link>
        <span className="song-card-artist">{song.artist}</span>
      </div>
    </div>
  );
};

export default SongCard;
