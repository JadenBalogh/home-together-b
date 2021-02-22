import con from '../config/dbconfig.js';

// Asynchronous helper function for MySQL queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    con.execute(sql, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export default { query };
