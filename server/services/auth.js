import jwt from 'jsonwebtoken';
import dbutils from '../helpers/dbutils.js';
import authconfig from '../config/authconfig.js';

function checkAvailable(username, email) {
  return new Promise((resolve) => {
    var sql = 'SELECT username FROM Member WHERE username = ?';
    dbutils.query(sql, [username]).then((usernames) => {
      if (usernames.length > 0) resolve(false);

      sql = 'SELECT email FROM Member WHERE email = ?';
      dbutils.query(sql, [email]).then((emails) => {
        if (emails.length > 0) resolve(false);
        resolve(true);
      });
    });
  });
}

function verifyToken(token) {
  jwt.verify(token, authconfig.secret, (decoded) => {
    // TODO: implement token verification
    console.log(decoded.id);
  })
}

export default {
  checkAvailable,
};
