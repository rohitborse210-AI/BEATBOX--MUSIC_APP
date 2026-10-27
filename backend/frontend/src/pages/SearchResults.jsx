import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../assets/styles/components/Pages.css';
import SongCard from '../components/SongCard';
import { searchSongs } from '../services/api';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await searchSongs(query);
        setResults(res.data || []);
      } catch (error) {
        console.error('Error searching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>Enter a search term to find songs</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <h2>Found {results.length} results for "{query}"</h2>
      {results.length === 0 ? (
        <div className="empty-state">
          <p>No songs found for "{query}"</p>
        </div>
      ) : (
        <div className="songs-grid">
          {results.map(song => (
            <SongCard key={song._id} song={song} queue={results} />
          ))}
        </div>
      )}
    </div>
  );
}
