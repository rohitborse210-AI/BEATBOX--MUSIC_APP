import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/components/Profile.css';
import { useAuth } from '../context/AuthContext';
import { getFavorites, getPlaylists } from '../services/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ favorites: 0, playlists: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [favRes, plRes] = await Promise.all([
          getFavorites().catch(() => ({ data: [] })),
          getPlaylists().catch(() => ({ data: [] }))
        ]);
        setStats({
          favorites: favRes.data?.length || 0,
          playlists: plRes.data?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!user) {
    return <div className="empty-state"><p>Please login to view profile.</p></div>;
  }

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="page-container profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{firstLetter}</div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="role-badge">{user.role || 'user'}</span>
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-card">
          <h3>Favorites</h3>
          <p className="stat-number">{stats.favorites}</p>
        </div>
        <div className="stat-card">
          <h3>Playlists</h3>
          <p className="stat-number">{stats.playlists}</p>
        </div>
      </div>
      
      <div className="profile-details">
        <p>Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
