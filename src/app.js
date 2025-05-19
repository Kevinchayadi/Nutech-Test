import express from 'express';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Dapatkan __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, './public/uploads')));

app.use('/', router);

export default app;