import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authconfig from '../config/authconfig.js';
import authService from '../services/auth.js';
import searchService from '../services/search.js';
import dbutils from '../helpers/dbutils.js';
import auth from '../services/auth.js';

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
      dbutils.query(sql, [firstName, lastName, email, username, password]).then(() => res.end());
    });
  });

  app.post('/login', (req, res) => {
    let username = req.body.username;

    let sql = `SELECT id, username, password FROM Member WHERE username = ?`;
    dbutils.query(sql, [username]).then((results) => {
      let user = results[0];
      if (!user) {
        res.send({ err: 'User not found.' });
        return;
      }

      console.log(user);
      console.log(req.body.password);
      console.log(user.password);

      let password = req.body.password;
      if (!bcrypt.compareSync(password, user.password)) {
        res.send({ err: 'Invalid password.' });
        return;
      }

      let token = jwt.sign({ id: user.id }, authconfig.secret, { expiresIn: 86400 });
      res.send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    });
  });
}
