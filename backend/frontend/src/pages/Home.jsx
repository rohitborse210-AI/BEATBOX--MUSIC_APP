import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Pages.css';
import SongCard from '../components/SongCard';
import CategoryCard from '../components/CategoryCard';
import { getSongs } from '../services/api';

const genres = [
  { name: 'Pop', gradient: 'linear-gradient(to right, #ff6b6b, #ffa07a)' },
  { name: 'Rock', gradient: 'linear-gradient(to right, #4a4a4a, #8b0000)' },
  { name: 'Hip-Hop', gradient: 'linear-gradient(to right, #ffd700, #ff8c00)' },
  { name: 'Classical', gradient: 'linear-gradient(to right, #2c3e50, #3498db)' },
  { name: 'Bollywood', gradient: 'linear-gradient(to right, #ff416c, #ff4b2b)' },
  { name: 'Lo-fi', gradient: 'linear-gradient(to right, #a18cd1, #fbc2eb)' },
  { name: 'Electronic', gradient: 'linear-gradient(to right, #00f2fe, #4facfe)' },
  { name: 'Romantic', gradient: 'linear-gradient(to right, #f093fb, #f5576c)' }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, recentRes, popularRes] = await Promise.all([
          getSongs({ featured: true }),
          getSongs({ recent: true }),
          getSongs({ popular: true })
        ]);
        setFeatured(featuredRes.data || []);
        setRecent(recentRes.data || []);
        setPopular(popularRes.data || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <div className="hero-banner">
        <h1>Welcome to Beat Box</h1>
        <p>Your ultimate music streaming destination.</p>
      </div>

      <section className="home-section">
        <div className="section-header">
          <h2>Featured Songs</h2>
          <Link to="/search">See All</Link>
        </div>
        <div className="songs-row">
          {featured.map(song => <SongCard key={song._id} song={song} queue={featured} />)}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Recently Added</h2>
          <Link to="/search">See All</Link>
        </div>
        <div className="songs-row">
          {recent.map(song => <SongCard key={song._id} song={song} queue={recent} />)}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Popular Songs</h2>
          <Link to="/search">See All</Link>
        </div>
        <div className="songs-row">
          {popular.map(song => <SongCard key={song._id} song={song} queue={popular} />)}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Browse by Genre</h2>
          <Link to="/categories">See All</Link>
        </div>
        <div className="category-grid">
          {genres.map(genre => <CategoryCard key={genre.name} category={genre} />)}
        </div>
      </section>
    </div>
  );
}
