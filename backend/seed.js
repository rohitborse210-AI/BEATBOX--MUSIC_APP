const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Song = require('./models/Song');
const Playlist = require('./models/Playlist');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const songsData = [
  // Pop
  { title: 'Neon Lights', artist: 'Aria Star', album: 'City Glow', genre: 'Pop', duration: '3:24' },
  { title: 'Summer Breeze', artist: 'Luna Wave', album: 'Sunshine Days', genre: 'Pop', duration: '3:45' },
  { title: 'Dancing Shadows', artist: 'Echo Pulse', album: 'Midnight Pop', genre: 'Pop', duration: '4:02' },
  // Rock
  { title: 'Thunder Road', artist: 'Steel Phoenix', album: 'Highway Anthem', genre: 'Rock', duration: '4:33' },
  { title: 'Broken Chains', artist: 'Volt Riders', album: 'Rebel Heart', genre: 'Rock', duration: '3:58' },
  { title: 'Electric Storm', artist: 'Crimson Fury', album: 'Lightning Strikes', genre: 'Rock', duration: '4:15' },
  // Hip-Hop
  { title: 'Street Poetry', artist: 'MC Blaze', album: 'Urban Verses', genre: 'Hip-Hop', duration: '3:30' },
  { title: 'Gold Standard', artist: 'King Lyric', album: 'Crown Flow', genre: 'Hip-Hop', duration: '3:12' },
  { title: 'Night Hustle', artist: 'Shadow MC', album: 'Grind Mode', genre: 'Hip-Hop', duration: '3:48' },
  // Classical
  { title: 'Moonlit Sonata', artist: 'Clara Strings', album: 'Evening Classics', genre: 'Classical', duration: '5:20' },
  { title: 'Autumn Waltz', artist: 'Vienna Ensemble', album: 'Seasons', genre: 'Classical', duration: '4:45' },
  { title: 'Morning Prelude', artist: 'David Keys', album: 'Dawn Symphony', genre: 'Classical', duration: '6:10' },
  // Bollywood
  { title: 'Dil Ka Raasta', artist: 'Raj Melody', album: 'Ishq FM', genre: 'Bollywood', duration: '4:15' },
  { title: 'Sapnon Ki Duniya', artist: 'Priya Voice', album: 'Dream Land', genre: 'Bollywood', duration: '4:30' },
  { title: 'Rang De', artist: 'Bollywood Beats', album: 'Color Splash', genre: 'Bollywood', duration: '3:55' },
  // Lo-fi
  { title: 'Rainy Window', artist: 'Chill Cafe', album: 'Study Beats', genre: 'Lo-fi', duration: '3:15' },
  { title: 'Late Night Jazz', artist: 'Mellow Tone', album: 'Midnight Lounge', genre: 'Lo-fi', duration: '4:00' },
  { title: 'Coffee Dreams', artist: 'Lo-fi Lucy', album: 'Morning Haze', genre: 'Lo-fi', duration: '3:33' },
  // Electronic
  { title: 'Digital Pulse', artist: 'Neon Circuit', album: 'Cyber Wave', genre: 'Electronic', duration: '4:10' },
  { title: 'Laser Grid', artist: 'Synth Master', album: 'Future Bass', genre: 'Electronic', duration: '3:50' },
  { title: 'Quantum Beat', artist: 'DJ Pixel', album: 'Binary Drops', genre: 'Electronic', duration: '4:25' },
  // Romantic
  { title: 'Whispered Love', artist: 'Rose Petal', album: 'Heart Strings', genre: 'Romantic', duration: '4:05' },
  { title: 'Starlight Serenade', artist: 'Velvet Moon', album: 'Eternal Love', genre: 'Romantic', duration: '3:40' },
  { title: 'Forever Yours', artist: 'Amore', album: 'Love Letters', genre: 'Romantic', duration: '4:20' }
];

const seedData = async () => {
  try {
    await Song.deleteMany();
    await Playlist.deleteMany();
    await User.deleteMany({ email: 'admin@beatbox.com' }); // Or all users if preferred

    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@beatbox.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log(`Admin user created: ${adminUser.email}`);

    const songsToInsert = songsData.map((song, index) => {
      const songIndex = index + 1;
      const audioIndex = ((songIndex - 1) % 16) + 1;
      return {
        ...song,
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${audioIndex}.mp3`,
        coverImage: `https://picsum.photos/seed/${songIndex}/300/300`
      };
    });

    const insertedSongs = await Song.insertMany(songsToInsert);
    console.log(`${insertedSongs.length} songs imported successfully.`);

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
