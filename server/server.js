import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import searchRoutes from './routes/search-routes.js';
import authRoutes from './routes/auth-routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

searchRoutes(app);
authRoutes(app);
