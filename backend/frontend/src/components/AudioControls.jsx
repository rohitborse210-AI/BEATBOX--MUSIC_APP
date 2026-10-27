import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import '../assets/styles/components/AudioControls.css';

const AudioControls = () => {
  const { isPlaying, togglePlay, playNext, playPrev, currentTime, duration, seek } = usePlayer();

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSeek = (e) => {
    seek(Number(e.target.value));
  };

  return (
    <div className="audio-controls">
      <div className="controls-buttons">
        <button className="control-btn" onClick={playPrev}>
          <FaStepBackward />
        </button>
        <button className="control-btn play-pause-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control-btn" onClick={playNext}>
          <FaStepForward />
        </button>
      </div>
      
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input 
          type="range" 
          className="time-slider"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioControls;
