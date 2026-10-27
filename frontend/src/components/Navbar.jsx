import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import '../assets/styles/components/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaMusic /> Beat Box
      </Link>
      
      <div className="navbar-search" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <SearchBar />
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <div className="user-menu">
            <button className="user-menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user?.name || 'User'}
            </button>
            {dropdownOpen && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setDropdownOpen(false)}>Admin</Link>
                )}
                <button onClick={() => { logout(); setDropdownOpen(false); }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
      
      <button className="mobile-menu-btn">
        <FaBars />
      </button>
    </nav>
  );
};

export default Navbar;
