import path from 'path';
const __dirname = path.resolve();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import searchRoutes from './routes/search-routes.js';
import authRoutes from './routes/auth-routes.js';

import localenv from 'localenv';
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

searchRoutes(app);
authRoutes(app);

app.get('/api/test', (req, res) => {
  console.log(process.env.USER);
  console.log('Running test.');
  res.send('This is a test!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
