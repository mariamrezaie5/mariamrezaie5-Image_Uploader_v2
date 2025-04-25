import express from 'express';
import { createMetadata, saveMetadata } from '../app.js';

const router = express.Router();

//Route to Home page
export default (upload) => {
router.get('/', (req, res) => {
    const image = createMetadata();
    res.render('index', { image });
});
//Route to Uploading Form
router.get('/upload', (req, res) => {
    res.render('upload');
  });
//Route to Gallery Page
router.get('/gallery', (req, res) => {
    const images = createMetadata();
    res.render('gallery', { images });
  });
//Route to Uploading Images
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.send('No Image uploaded.');
  
    const images = createMetadata();
    images.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadDate: new Date().toISOString()
    });
    saveMetadata(images);
  
    res.redirect('/');
  });
  return router;
}
