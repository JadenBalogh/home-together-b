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

function checkBusinessAvailable(username, email) {
  return new Promise((resolve) => {
    var sql = 'SELECT username FROM Organization WHERE username = ?';
    dbutils.query(sql, [username]).then((usernames) => {
      if (usernames.length > 0) resolve(false);

      sql = 'SELECT organizationEmail FROM Organization WHERE organizationEmail = ?';
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
  });
}

function checkPhoneExists(phoneNumber) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT phoneNumber FROM Member WHERE phoneNumber = ?';
    dbutils
      .query(sql, [phoneNumber])
      .then((result) => {
        resolve(result.length > 0);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

function checkBusinessPhoneExists(phoneNumber) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT phoneNumber FROM Organization WHERE phoneNumber = ?';
    dbutils
      .query(sql, [phoneNumber])
      .then((result) => {
        resolve(result.length > 0);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT email FROM Member WHERE email = ?';
    dbutils
      .query(sql, [email])
      .then((result) => {
        resolve(result.length > 0);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

function checkBusinessEmailExists(email) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT email FROM Organization WHERE email = ?';
    dbutils
      .query(sql, [email])
      .then((result) => {
        resolve(result.length > 0);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

function checkUsernameExists(username) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT username FROM Member WHERE username = ?';
    dbutils
      .query(sql, [username])
      .then((result) => {
        resolve(result.length > 0);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

export default {
  checkAvailable,
  checkBusinessAvailable,
  checkPhoneExists,
  checkBusinessPhoneExists,
  checkEmailExists,
  checkBusinessEmailExists,
  checkUsernameExists,
};
