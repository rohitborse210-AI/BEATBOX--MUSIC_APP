# Beat Box – Music Streaming and Management Web Application

A full-stack, responsive music streaming and management web application built with **React.js**, **Node.js**, **Express.js**, and **MongoDB** for B.Tech CSE (Data Science) Semester Project-1.

---

## 🎵 Key Features

1. **Dashboard / Home Page**:
   - Featured, Recently Added, and Popular songs sections.
   - 8 Genre categories with vibrant gradients.
   - Quick navigation to search, categories, and personal library.
2. **Music Search**:
   - Search dynamically across Song Title, Artist, Album, and Genre.
   - Instant playback from search results.
3. **8 Music Categories**:
   - Pop, Rock, Hip-Hop, Classical, Bollywood, Lo-fi, Electronic, Romantic.
   - Filtered view of songs per genre with direct playback.
4. **Persistent Music Player**:
   - Fixed bottom audio player with Play, Pause, Next, Previous, Seek/Progress bar, and Volume control.
   - Displays cover art, title, artist, current timestamp, and total duration.
   - Continues playing seamlessly while browsing any page.
5. **Playlist Management**:
   - Create custom playlists.
   - Add and remove songs to/from playlists.
   - Play entire playlist with sequential playback.
6. **Favorites & Recently Played**:
   - One-click heart icon to favorite/unfavorite songs.
   - Automatic recording of recently played tracks (up to 20 tracks).
7. **User Authentication & Profile**:
   - Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
   - Profile view showing personal stats (favorite count, playlist count).
8. **Admin Dashboard (CRUD Operations)**:
   - Protected admin-only dashboard (`/admin`).
   - Create new songs, view table of all songs, edit existing songs, and delete songs.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React.js 18 with React Hooks
  - React Router DOM v6
  - React Icons (`react-icons/fa`)
  - Axios for REST API communication
  - CSS3 with modern Dark Theme styling and custom variables
- **Backend**:
  - Node.js & Express.js
  - JSON Web Tokens (`jsonwebtoken`) for stateless authentication
  - Password hashing via `bcryptjs`
  - CORS enabled
- **Database**:
  - MongoDB with Mongoose ODM
  - Schemas for User, Song, and Playlist with relational references and text indexing

---

## 📂 Project Structure

```
beat-box/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile
│   │   ├── songController.js     # Songs CRUD, search, genre filter
│   │   ├── playlistController.js # Playlist CRUD & song add/remove
│   │   ├── favoriteController.js # Add/remove/list favorites
│   │   └── recentController.js   # Recently played tracker
│   ├── middleware/
│   │   ├── auth.js               # JWT verification middleware
│   │   └── admin.js              # Admin authorization check
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt pre-save hook
│   │   ├── Song.js               # Song schema with text index
│   │   └── Playlist.js           # Playlist schema referencing User and Songs
│   ├── routes/
│   │   ├── auth.js               # /api/auth routes
│   │   ├── songs.js              # /api/songs routes
│   │   ├── playlists.js          # /api/playlists routes
│   │   ├── favorites.js          # /api/favorites routes
│   │   └── recentlyPlayed.js     # /api/recently-played routes
│   ├── seed.js                   # Database seeder (24 songs + Admin user)
│   ├── server.js                 # Express server entry point
│   ├── .env.example              # Environment variables template
│   ├── .env                      # Local environment configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/styles/
│   │   │   ├── variables.css     # CSS custom variables & dark theme tokens
│   │   │   ├── global.css        # Base layout, scrollbar & reset styles
│   │   │   └── components/       # Scoped styles for every page & component
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Top navigation with logo, search & user menu
│   │   │   ├── Sidebar.jsx       # Side navigation & genre shortcuts
│   │   │   ├── SearchBar.jsx     # Search input triggering search route
│   │   │   ├── SongCard.jsx      # Card with cover, title, play & favorite buttons
│   │   │   ├── SongList.jsx      # Track table view with duration & actions
│   │   │   ├── CategoryCard.jsx  # Genre card with custom gradient
│   │   │   ├── PlaylistCard.jsx  # Playlist tile
│   │   │   ├── MusicPlayer.jsx   # Fixed bottom bar player
│   │   │   ├── AudioControls.jsx # Controls (Prev/Play/Next/Seek/Time)
│   │   │   ├── Footer.jsx        # Project footer
│   │   │   └── ProtectedRoute.jsx# Route guard for authenticated views
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state provider
│   │   │   └── PlayerContext.jsx # Audio playback state & queue provider
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── GenreSongs.jsx
│   │   │   ├── SongDetails.jsx
│   │   │   ├── Playlists.jsx
│   │   │   ├── PlaylistDetails.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── RecentlyPlayed.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios client with auth interceptor
│   │   ├── App.jsx               # Main routing & application layout
│   │   └── main.jsx              # React DOM render entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas URI)

---

### Step 1: Clone or Navigate to Project Directory
```bash
cd beat-box
```

---

### Step 2: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Check `backend/.env` (or copy from `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/beatbox
   JWT_SECRET=beatbox_jwt_super_secret_key_2026
   NODE_ENV=development
   ```
   *(If using MongoDB Atlas, replace `MONGO_URI` with your connection string).*

4. **Seed Sample Music & Admin Account**:
   Run the seed script to populate 24 sample tracks (3 songs per each of the 8 genres) and create an Admin user:
   ```bash
   node seed.js
   ```
   *Admin Credentials:*
   - **Email:** `admin@beatbox.com`
   - **Password:** `admin123`

5. Start the backend server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   *The backend will run on `http://localhost:5000`.*

---

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user `{ name, email, password }` | No |
| `POST` | `/api/auth/login` | Login user `{ email, password }` | No |
| `GET` | `/api/auth/me` | Fetch currently logged in user profile | Yes (Bearer Token) |

### Songs (`/api/songs`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/songs` | Get all songs (Supports query params: `?featured=true`, `?recent=true`, `?popular=true`) | No |
| `GET` | `/api/songs/search?q=:query` | Search songs by title, artist, or album | No |
| `GET` | `/api/songs/genre/:genre` | Get songs by genre name | No |
| `GET` | `/api/songs/:id` | Get single song details | No |
| `POST` | `/api/songs` | Add new song | Yes (Admin) |
| `PUT` | `/api/songs/:id` | Update existing song | Yes (Admin) |
| `DELETE` | `/api/songs/:id` | Delete song | Yes (Admin) |

### Playlists (`/api/playlists`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/playlists` | Get all playlists belonging to current user | Yes |
| `POST` | `/api/playlists` | Create new playlist `{ name }` | Yes |
| `GET` | `/api/playlists/:id` | Get playlist details with populated songs | Yes |
| `PUT` | `/api/playlists/:id` | Add/remove songs or rename playlist | Yes |
| `DELETE` | `/api/playlists/:id` | Delete playlist | Yes |

### Favorites (`/api/favorites`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/favorites` | Get user's favorited songs | Yes |
| `POST` | `/api/favorites/:songId` | Toggle favorite on a song | Yes |

### Recently Played (`/api/recently-played`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/recently-played` | Get list of recently played tracks (max 20) | Yes |
| `POST` | `/api/recently-played/:songId` | Record track playback | Yes |

---

## 🧪 Testing Instructions

1. **User Authentication**:
   - Register a new account at `/register` or login as Admin (`admin@beatbox.com` / `admin123`).
   - Notice the profile dropdown in the top right.
2. **Music Playback**:
   - Click the **Play** button on any Song Card or Song List row.
   - Verify that the bottom music player opens, shows the song title and artist, and streams audio.
   - Test **Pause**, **Next**, **Previous**, **Volume Slider**, and **Seek Bar**.
3. **Search & Categories**:
   - Enter a query in the top search bar (e.g., "Lights", "Phoenix", or "Neon").
   - Click on **Categories** in the sidebar, choose "Electronic" or "Bollywood", and see filtered tracks.
4. **Playlists**:
   - Log in and navigate to **Playlists** (`/playlists`).
   - Create a playlist named "Study Beats".
   - Open any song details page or playlist page and add songs.
   - Click "Play All" inside the playlist.
5. **Favorites & History**:
   - Click the heart icon on any card to add it to your favorites.
   - View your favorited tracks at `/favorites`.
   - View your playback history at `/recently-played`.
6. **Admin CRUD**:
   - Log in as `admin@beatbox.com`.
   - Click **Admin** in the user dropdown.
   - Use the **Add Song** form to add a new song, or click **Edit** / **Delete** on existing songs.

---

## ⚠️ Common Errors & Troubleshooting

1. **MongoDB Connection Refused (`ECONNREFUSED 127.0.0.1:27017`)**:
   - Make sure your MongoDB service is running:
     ```bash
     # Windows (in PowerShell as Administrator)
     net start MongoDB
     # or start mongod directly:
     mongod
     ```
   - If using MongoDB Atlas, verify your IP address is whitelisted in Network Access.

2. **CORS Error (`Access-Control-Allow-Origin`)**:
   - The backend `server.js` has CORS configured for `http://localhost:5173`. If running on a different port, update the `origin` in `backend/server.js`.

3. **Audio Not Playing / Not Found**:
   - The seed data uses public mp3 streams from SoundHelix. Ensure your machine has internet access to stream the audio and images.

4. **Port Already in Use (`EADDRINUSE: 5000`)**:
   - Change `PORT=5001` in `backend/.env` and update the proxy target in `frontend/vite.config.js`.

---

## 🎓 Academic Submission Notes
- **Course**: B.Tech CSE (Data Science)
- **Subject**: Semester Project-1
- **Architecture**: MERN / MEVN (MongoDB, Express, React, Node)
- **Licensing**: Open for academic evaluation.
