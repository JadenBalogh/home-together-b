import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var input = '' + req.body.data;
  res.send(input.toUpperCase());
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
