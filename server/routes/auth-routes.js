import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authService from '../services/auth.js';
import searchService from '../services/search.js';
import dbutils from '../helpers/dbutils.js';

export default function (app) {
  app.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;

    authService.checkAvailable(username, email).then((available) => {
      if (!available) {
        res.send({ err: 'Credentials unavailable.' });
        return;
      }

      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let password = bcrypt.hashSync(req.body.password);

      let sql = `INSERT INTO Member(firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)`;
      dbutils.query(sql, [firstName, lastName, email, username, password]);
    });
  });
}
