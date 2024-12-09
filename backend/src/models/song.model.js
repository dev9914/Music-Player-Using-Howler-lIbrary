import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  songImage: { type: String, required: true },
  monthlyListeners: { type: String, required: true },
  duration: { type: String, required: true },
  album: { type: String, required: true },
},{timestamps: true});

const Song = mongoose.model('Song', SongSchema);

export default Song;