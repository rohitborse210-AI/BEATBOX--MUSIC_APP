import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Request interceptor: attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Songs
export const getSongs = (params) => API.get('/songs', { params });
export const getSong = (id) => API.get(`/songs/${id}`);
export const searchSongs = (query) => API.get(`/songs/search?q=${query}`);
export const getSongsByGenre = (genre) => API.get(`/songs/genre/${genre}`);
export const createSong = (data) => API.post('/songs', data);
export const uploadSong = (formData) => API.post('/songs/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateSong = (id, data) => API.put(`/songs/${id}`, data);
export const deleteSong = (id) => API.delete(`/songs/${id}`);

// Playlists
export const getPlaylists = () => API.get('/playlists');
export const getPlaylist = (id) => API.get(`/playlists/${id}`);
export const createPlaylist = (data) => API.post('/playlists', data);
export const updatePlaylist = (id, data) => API.put(`/playlists/${id}`, data);
export const deletePlaylist = (id) => API.delete(`/playlists/${id}`);

// Favorites
export const toggleFavorite = (songId) => API.post(`/favorites/${songId}`);
export const getFavorites = () => API.get('/favorites');

// Recently Played
export const addRecentlyPlayed = (songId) => API.post(`/recently-played/${songId}`);
export const getRecentlyPlayed = () => API.get('/recently-played');
