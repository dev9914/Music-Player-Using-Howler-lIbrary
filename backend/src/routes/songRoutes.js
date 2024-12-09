import { Router } from 'express';
import { uploadSong, getAllSongs } from '../controllers/songController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router()

router.route('/upload').post(upload.single('audio'), uploadSong);

router.route('/getAll').get(getAllSongs) 

export default router;
