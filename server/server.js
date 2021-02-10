import path from 'path';
const __dirname = path.resolve();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import dbutils from './helpers/dbutils.js';
import searchRoutes from './routes/search-routes.js';
import authRoutes from './routes/auth-routes.js';

import localenv from 'localenv';
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  console.log('Production code running...');
  app.use(express.static(path.join(__dirname, 'build')));
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

searchRoutes(app);
authRoutes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  dbutils
    .query('SELECT * FROM Member m JOIN SearchableInfo s ON m.id = s.memberId')
    .then((result) => console.log(result));
}
