import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
const PORT = 3000;

//Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.set('view engine', 'ejs');

//Folder Setup
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: 'Public/uploads/',
  filename: (_,file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage});

// Load metadata
export const createMetadata = () => {
  if(!fs.existsSync('metadata.json')) fs.writeFileSync('metadata.json','[]');
  return JSON.parse(fs.readFileSync('metadata.json'));
};
export const saveMetadata = (data) => {
  fs.writeFileSync('metadata.json', JSON.stringify(data, null, 2));
};

app.use('/', (imageRoutes(upload)));
app.listen(PORT, () => console.log(`Server running @ port: ${PORT}`));