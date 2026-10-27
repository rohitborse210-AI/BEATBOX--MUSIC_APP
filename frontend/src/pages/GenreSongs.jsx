import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/components/Pages.css';
import SongCard from '../components/SongCard';
import { getSongsByGenre } from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function GenreSongs() {
  const { genre } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await getSongsByGenre(genre);
        setSongs(res.data || []);
      } catch (error) {
        console.error('Error fetching genre songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [genre]);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/categories" className="back-link">
          <FaArrowLeft /> Back to Categories
        </Link>
        <h2>{genre} Songs</h2>
      </div>
      
      {songs.length === 0 ? (
        <div className="empty-state">
          <p>No songs found for this genre.</p>
        </div>
      ) : (
        <div className="songs-grid">
          {songs.map(song => (
            <SongCard key={song._id} song={song} queue={songs} />
          ))}
        </div>
      )}
    </div>
  );
}
