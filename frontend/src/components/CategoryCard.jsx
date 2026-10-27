import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/components/CategoryCard.css';

const PREDEFINED_GRADIENTS = {
  'Pop': 'linear-gradient(135deg, #ff6b6b, #ffa07a)',
  'Rock': 'linear-gradient(135deg, #4a4a4a, #8b0000)',
  'Hip-Hop': 'linear-gradient(135deg, #ffd700, #ff8c00)',
  'Classical': 'linear-gradient(135deg, #2c3e50, #3498db)',
  'Bollywood': 'linear-gradient(135deg, #ff416c, #ff4b2b)',
  'Lo-fi': 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'Electronic': 'linear-gradient(135deg, #00f2fe, #4facfe)',
  'Romantic': 'linear-gradient(135deg, #f093fb, #f5576c)',
};

const CategoryCard = ({ genre, gradient, category }) => {
  const navigate = useNavigate();
  
  const genreName = genre || (category && (typeof category === 'string' ? category : category.name)) || '';
  const bgGradient = gradient || (category && category.gradient) || PREDEFINED_GRADIENTS[genreName] || 'var(--accent-gradient)';

  return (
    <div 
      className="category-card" 
      style={{ background: bgGradient }}
      onClick={() => navigate(`/genre/${encodeURIComponent(genreName)}`)}
    >
      <span className="category-name">{genreName}</span>
    </div>
  );
};

export default CategoryCard;
