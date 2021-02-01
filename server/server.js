import path from 'path';
const __dirname = path.resolve();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import searchRoutes from './routes/search-routes.js';
import authRoutes from './routes/auth-routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

searchRoutes(app);
authRoutes(app);
