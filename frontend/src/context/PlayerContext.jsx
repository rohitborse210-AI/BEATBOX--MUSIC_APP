import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { addRecentlyPlayed } from '../services/api';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, queueIndex]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl || currentSong.url; // Assuming song object has audioUrl or url
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
  }, [currentSong]);

  const playSong = (song, songList = []) => {
    setCurrentSong(song);
    
    if (songList.length > 0) {
      setQueue(songList);
      const index = songList.findIndex(s => s._id === song._id || s.id === song.id);
      setQueueIndex(index !== -1 ? index : 0);
    } else {
      setQueue([song]);
      setQueueIndex(0);
    }
    
    setIsPlaying(true);
    
    // Fire and forget
    addRecentlyPlayed(song._id || song.id).catch(err => console.error(err));
  };

  const togglePlay = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const nextIndex = (queueIndex + 1) % queue.length;
    setQueueIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (queue.length === 0) return;
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (vol) => {
    const newVol = parseFloat(vol);
    audioRef.current.volume = newVol;
    setVolume(newVol);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong, queue, queueIndex, isPlaying, volume, currentTime, duration,
      playSong, togglePlay, playNext, playPrev, seek, changeVolume
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
