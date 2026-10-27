import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import AudioControls from './AudioControls';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import '../assets/styles/components/MusicPlayer.css';

const MusicPlayer = () => {
  const { currentSong, currentTime, duration, volume, changeVolume } = usePlayer();

  if (!currentSong) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      <div className="player-progress-container">
        <div className="player-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      <div className="player-song-info">
        <img 
          src={currentSong.coverImage || 'https://via.placeholder.com/50'} 
          alt={currentSong.title} 
          className="player-cover" 
        />
        <div className="player-text">
          <span className="player-title">{currentSong.title}</span>
          <span className="player-artist">{currentSong.artist}</span>
        </div>
      </div>

      <div className="player-controls-container">
        <AudioControls />
      </div>

      <div className="player-volume">
        {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
