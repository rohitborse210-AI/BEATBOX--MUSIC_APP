import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import '../assets/styles/components/Pages.css';
import SongList from '../components/SongList';
import { getRecentlyPlayed } from '../services/api';

export default function RecentlyPlayed() {
  const [recentSongs, setRecentSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await getRecentlyPlayed();
        // Assuming response is array of { song: {}, playedAt: ... }
        const songsOnly = (res.data || []).map(item => item.song).filter(Boolean);
        setRecentSongs(songsOnly);
      } catch (error) {
        console.error('Error fetching recently played:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <h2><FaClock /> Recently Played</h2>
      
      {recentSongs.length === 0 ? (
        <div className="empty-state">
          <p>No recently played songs</p>
        </div>
      ) : (
        <div className="list-container">
          <SongList songs={recentSongs} queue={recentSongs} />
        </div>
      )}
    </div>
  );
}
