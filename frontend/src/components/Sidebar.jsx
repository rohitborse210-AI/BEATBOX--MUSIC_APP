import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaSearch, FaThLarge, FaListUl, FaHeart, FaClock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/components/Sidebar.css';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();

  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Classical', 'Bollywood', 'Lo-fi', 'Electronic', 'Romantic'];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaSearch /> Search
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaThLarge /> Categories
        </NavLink>
        
        {isAuthenticated && (
          <>
            <div className="sidebar-section-title" style={{ marginTop: '16px' }}>Your Library</div>
            <NavLink to="/playlists" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <FaListUl /> Playlists
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <FaHeart /> Favorites
            </NavLink>
            <NavLink to="/recently-played" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <FaClock /> Recently Played
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-nav">
        <div className="sidebar-section-title">Genre Shortcuts</div>
        {genres.map(genre => (
          <Link key={genre} to={`/genre/${genre}`} className="sidebar-link" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
            {genre}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
