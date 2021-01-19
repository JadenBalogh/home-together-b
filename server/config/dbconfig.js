import mysql from 'mysql2';
// This is required to read from the .env.local file
import localenv from 'localenv';

export default mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
