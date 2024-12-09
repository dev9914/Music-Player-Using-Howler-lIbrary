import Song from '../models/song.model.js';

// Upload audio file and save song metadata
export const uploadSong = async (req, res) => {
  try {
    const { title, artist, songImage, monthlyListeners,duration,album} = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const newSong = new Song({
      title,
      artist,
      songImage,
      monthlyListeners,
      duration,
      album,
      filePath: `/uploads/${audioFile.filename}`,  // Store relative file path
    });

    await newSong.save();

    res.status(201).json({ success: true, song: newSong });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
};

// Get all songs from the database
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch songs' });
  }
};
