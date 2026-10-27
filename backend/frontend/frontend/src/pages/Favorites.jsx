import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import '../assets/styles/components/Pages.css';
import SongCard from '../components/SongCard';
import { getFavorites } from '../services/api';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getFavorites();
        setFavorites(res.data || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <h2><FaHeart className="text-accent" /> My Favorites</h2>
      
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorite songs yet. Start liking songs!</p>
        </div>
      ) : (
        <div className="songs-grid">
          {favorites.map(song => (
            <SongCard key={song._id} song={song} queue={favorites} />
          ))}
        </div>
      )}
    </div>
  );
}
