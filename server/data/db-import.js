import Importer from 'mysql-import';
import localenv from 'localenv'; // This is required to read from the .env.local file

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const importer = new Importer({ host, user, password, database });
importer.onProgress((progress) => {
  var percent = Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100;
  console.log(`Import is ${percent}% complete...`);
});

// Use "node data/db-import.js" from the server folder to run the imports
console.log('Import started. This process is very slow, please wait...')
importer
  .import('./data/locations.sql')
  .then(() => {
    console.log('Import successful!');
  })
  .catch((err) => {
    console.error(err);
  });
