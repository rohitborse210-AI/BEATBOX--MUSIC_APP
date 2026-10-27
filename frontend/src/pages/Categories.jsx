import React from 'react';
import '../assets/styles/components/Pages.css';
import CategoryCard from '../components/CategoryCard';

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

export default function Categories() {
  return (
    <div className="page-container">
      <h2>Browse Categories</h2>
      <div className="category-grid">
        {genres.map(genre => (
          <CategoryCard key={genre.name} category={genre} />
        ))}
      </div>
    </div>
  );
}
