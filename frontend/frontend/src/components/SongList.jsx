import React from 'react';
import { FaPlay, FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../services/api';
import '../assets/styles/components/SongList.css';

const SongList = ({ songs = [], showIndex = true, onRemove, showRemove = false }) => {
  const { playSong } = usePlayer();
  const { isAuthenticated, user } = useAuth();

  const handlePlay = (song) => {
    playSong(song, songs);
  };

  const handleFavorite = async (e, song) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      await toggleFavorite(song._id || song.id);
      // Ideally we would update local state here to reflect change immediately
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    if (typeof seconds === 'string' && seconds.includes(':')) return seconds;
    const num = Number(seconds);
    if (isNaN(num)) return seconds;
    const min = Math.floor(num / 60);
    const sec = Math.floor(num % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!songs.length) {
    return <div className="empty-state">No songs available.</div>;
  }

  return (
    <div className="song-list">
      {songs.map((song, index) => {
        const isFavorite = user?.favorites?.includes(song._id || song.id);
        
        return (
          <div key={song._id || song.id || index} className="song-row" onClick={() => handlePlay(song)}>
            {showIndex && <div className="song-row-index">{index + 1}</div>}
            
            <img src={song.coverImage || 'https://via.placeholder.com/50'} alt={song.title} className="song-row-cover" />
            
            <div className="song-row-info">
              <span className="song-row-title">{song.title}</span>
              <span className="song-row-artist">{song.artist}</span>
            </div>
            
            <div className="song-row-album">{song.album || 'Unknown Album'}</div>
            
            <div className="song-row-duration">{formatDuration(song.duration)}</div>
            
            <div className="song-row-actions">
              <button className="song-row-play-btn" onClick={(e) => { e.stopPropagation(); handlePlay(song); }}>
                <FaPlay />
              </button>
              {isAuthenticated && (
                <button 
                  className={`song-row-fav-btn ${isFavorite ? 'active' : ''}`} 
                  onClick={(e) => handleFavorite(e, song)}
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              )}
              {showRemove && onRemove && (
                <button 
                  className="song-row-remove-btn" 
                  onClick={(e) => { e.stopPropagation(); onRemove(song._id || song.id); }}
                  title="Remove from playlist"
                  style={{ background: 'transparent', border: 'none', color: '#ff6584', cursor: 'pointer', marginLeft: '8px' }}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
