import dbutils from '../helpers/dbutils.js';

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

export default {
  checkAvailable,
};
